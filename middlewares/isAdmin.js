module.exports = function (req,res,next){
    if(req.session.role != "ADMIN"){
        res.redirect("/auth/login")
    }
    next()
}