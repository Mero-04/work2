const express = require("express");
const router = express.Router();
const { Blog, Contact, User, Category } = require("../models/model")
const multer = require("multer");
const imageUpload = require("../helpers/image-upload");
const upload = multer({ dest: 'uploads/' })
const bcrypt = require("bcrypt")
const fs = require("fs")
const isKadr = require("../middlewares/isKadr")


router.get("/", isKadr, async (req, res) => {
    const categories = await Category.findAll()
    res.render("kadr/home_kadr", {
        categories:categories
    })
})


router.get("/contact",isKadr, async (req, res) => {
    const contacts = await Contact.findAll();
    res.render("kadr/contact", {
        contact: contacts
    })
});


router.get("/users", isKadr, async (req, res) => {
    const blogs = await User.findAll({
        include: { model: Category }
    });
    res.render("kadr/users", {
        bloglar: blogs
    })
})

router.get("/user-add", isKadr, async (req, res) => {
    const categories = await Category.findAll();
    res.render("kadr/user-add", {
        categories: categories
    })
})

router.post("/user-add", isKadr, imageUpload.upload.single("user_img"), async (req, res) => {
    try {
        const user = await User.create({
            name: req.body.name,
            surname: req.body.surname,
            ata_name: req.body.ata_name,
            birth: req.body.birth,
            duty: req.body.duty,
            address: req.body.address,
            tel_nom: req.body.surname,
            user_img: req.file.filename,
            categoryId: req.body.categoryId
        })
        res.redirect("/kadr/users");
    } catch (err) {
        console.log(err)
    }
})

router.get("/user/:userId", async (req, res) => {
    const id = req.params.userId;
    const user = await User.findByPk(id)
    res.render("kadr/user-single", {
        user: user
    })
})

router.post("/user/edit/:userId", imageUpload.upload.single("user_img"), async (req, res) => {

    
    let img = req.body.user_img;
    if (req.file) {
        img = req.file.filename;

        fs.unlink("/uploads/user/" + req.body.img, err => {
            console.log(err);
        })
    }
    const user = await User.findByPk(req.params.userId);
    if (user) {
        user.name = req.body.name,
            user.surname = req.body.surname,
            user.ata_name = req.body.ata_name,
            user.birth = req.body.birth,
            user.duty = req.body.duty,
            user.address = req.body.address,
            user.tel_nom = req.body.surname,
            user.user_img = img,
            user.categoryId = req.body.categoryId

        user.save()

        res.redirect("/kadr/users")
    }
})

router.get("/user/edit/:userId", async (req, res) => {
    const id = req.params.userId;
    const user = await User.findOne({
        where: { id: id }
    })
    const categories = await Category.findAll();
    res.render("kadr/user-edit", {
        user: user,
        categories: categories
    })
})

router.get("/user/delete/:userId", isKadr, async (req, res) => {
    const user = await User.findByPk(req.params.userId)
    res.render("kadr/user_delete", {
        user: user
    })
})

router.post("/user/delete/:userId", isKadr, async (req, res) => {
    const user = await User.findByPk(req.params.userId);
    if (user) {
        user.destroy();
        return res.redirect("/kadr/users")
    } else {
        console.log("Ulanyjy tapylmady")
    }
})



router.get("/categories", isKadr, async (req, res) => {
    const category = await Category.findAll();
    res.render("kadr/category", {
        categories: category
    })
});

router.get("/categories/:categoryId",isKadr, async (req, res) => {
    const users = await User.findAll({
        include: { model: Category },
        where: { categoryId: req.params.categoryId }
    });
    res.render("kadr/users", {
        bloglar: users
    })
});



module.exports = router;