const express = require("express");
const router = express.Router();
const { Blog, Contact, User, Category, Message } = require("../models/model")
const multer = require("multer");
const imageUpload = require("../helpers/image-upload");
const upload = multer({ dest: 'uploads/' })
const bcrypt = require("bcrypt")
const fs = require("fs")
const isKadr = require("../middlewares/isKadr")
const { Op } = require("sequelize")
const moment = require("moment")


router.get("/", async (req, res) => {
    res.render("user/home_user")
})


// router.get("/contact",isKadr, async (req, res) => {
//     const contacts = await Contact.findAll();
//     res.render("kadr/contact", {
//         contact: contacts
//     })
// });


router.get("/users", isKadr, async (req, res) => {
    const blogs = await User.findAll();
    res.render("user/users", {
        bloglar: blogs,
        userId: req.session.userId
    })
})

// router.get("/user-add", isKadr, async (req, res) => {
//     const categories = await Category.findAll();
//     res.render("kadr/user-add", {
//         categories: categories
//     })
// })

// router.post("/user-add", isKadr, imageUpload.upload.single("user_img"), async (req, res) => {
//     try {
//         const user = await User.create({
//             name: req.body.name,
//             surname: req.body.surname,
//             ata_name: req.body.ata_name,
//             birth: req.body.birth,
//             duty: req.body.duty,
//             address: req.body.address,
//             tel_nom: req.body.surname,
//             user_img: req.file.filename,
//             categoryId: req.body.categoryId
//         })
//         res.redirect("/kadr/users");
//     } catch (err) {
//         console.log(err)
//     }
// })

// router.get("/:userId", async (req, res) => {
//     const id = req.params.userId;
//     const user = await User.findByPk(id)
//     res.render("user/user-single", {
//         user: user
//     })
// })

// router.post("/user/edit/:userId", imageUpload.upload.single("user_img"), async (req, res) => {


//     let img = req.body.user_img;
//     if (req.file) {
//         img = req.file.filename;

//         fs.unlink("/uploads/user/" + req.body.img, err => {
//             console.log(err);
//         })
//     }
//     const user = await User.findByPk(req.params.userId);
//     if (user) {
//         user.name = req.body.name,
//             user.surname = req.body.surname,
//             user.ata_name = req.body.ata_name,
//             user.birth = req.body.birth,
//             user.duty = req.body.duty,
//             user.address = req.body.address,
//             user.tel_nom = req.body.surname,
//             user.user_img = img,
//             user.categoryId = req.body.categoryId

//         user.save()

//         res.redirect("/kadr/users")
//     }
// })
router.get("/inbox", isKadr, async (req, res) => {
    const users = await User.findAll({
    });
    const message = await Message.findAll({
        include: { model: User },
    })
    const sender_message = await Message.findAll({
        include: { model: User }
    })
    res.render("user/inbox", {
        ulanyjylar: users,
        userId: req.session.userId,
        sender_messages: sender_message,
        username: req.session.username,
        sender_userId: req.params.userId,
    })
})


router.get("/inbox/:userId", isKadr, async (req, res) => {
    const users = await User.findAll({});
    const message = await Message.findAll({
        include: { model: User },
        where: {
            // [Op.and]: [{ 
            // send_user: req.params.userId,
            // userId: req.session.userId }] 

            [Op.or]: [
                {
                    [Op.and]: [{
                        send_user: req.params.userId,
                        userId: req.session.userId
                    }]
                },
                {
                    [Op.and]: [{
                        send_user: req.session.userId,
                        userId: req.params.userId
                    }]
                }
            ]

        }
    })

    res.render("user/inbox2", {
        ulanyjylar: users,
        userId: req.session.userId,
        sender_userId: req.params.userId,
        username: req.session.username,
        messages: message
    })
})






router.get("/message/:userId", isKadr, async (req, res) => {
    const id = req.params.userId;
    const user = await User.findOne({
        where: { id: id }
    })
    res.render("user/user-message", {
        user: user
    })
})

router.post("/message", isKadr, async (req, res) => {
    const id = req.params.userId;
    const message = await Message.create({
        message: req.body.message,
        userId: req.body.send_user,
        send_user: req.session.userId,
        sender: req.session.username,
        created_at: moment().locale("tk").format('LT')
    })
    res.redirect("/user/inbox")

})


// router.get("/user/delete/:userId", isKadr, async (req, res) => {
//     const user = await User.findByPk(req.params.userId)
//     res.render("kadr/user_delete", {
//         user: user
//     })
// })

// router.post("/user/delete/:userId", isKadr, async (req, res) => {
//     const user = await User.findByPk(req.params.userId);
//     if (user) {
//         user.destroy();
//         return res.redirect("/kadr/users")
//     } else {
//         console.log("Ulanyjy tapylmady")
//     }
// })



// router.get("/categories", isKadr, async (req, res) => {
//     const category = await Category.findAll();
//     res.render("kadr/category", {
//         categories: category
//     })
// });

// router.get("/categories/:categoryId",isKadr, async (req, res) => {
//     const users = await User.findAll({
//         include: { model: Category },
//         where: { categoryId: req.params.categoryId }
//     });
//     res.render("kadr/users", {
//         bloglar: users
//     })
// });



module.exports = router;