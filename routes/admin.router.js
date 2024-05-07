const express = require("express");
const router = express.Router();
const { Blog, Contact, User, Category } = require("../models/model")
const multer = require("multer");
const imageUpload = require("../helpers/image-upload");
const upload = multer({ dest: 'uploads/' })
const bcrypt = require("bcrypt")
const fs = require("fs")
const isAdmin = require("../middlewares/isAdmin")


router.get("/", isAdmin, async (req, res) => {
    res.render("admin/home_admin")
})

router.get("/users", async (req, res) => {
    const blogs = await User.findAll();
    res.render("admin/users", {
        bloglar: blogs
    })
})

router.get("/user-add", async (req, res) => {
    res.render("admin/user-add")
})

router.post("/user-add", imageUpload.upload.single("user_img"), async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    try {
        const user = await User.create({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            birth: req.body.birth,
            duty: req.body.duty,
            address: req.body.address,
            password: hashedPassword,
            user_img: req.file.filename,
        })
        res.redirect("/admin/users");
    } catch (err) {
        console.log(err)
    }
})

router.get("/user/:userId", async (req, res) => {
    const id = req.params.userId;
    const user = await User.findByPk(id)
    res.render("admin/user-single", {
        user: user
    })
})



router.get("/user/delete/:userId", async (req, res) => {
    const user = await User.findByPk(req.params.userId)
    res.render("admin/user_delete", {
        user: user
    })
})

router.post("/user/delete/:userId", async (req, res) => {
    const user = await User.findByPk(req.params.userId);
    if (user) {
        user.destroy();
        return res.redirect("/admin/users")
    } else {
        console.log("Işgär tapylmady")
    }
})



module.exports = router;