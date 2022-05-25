const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/',authController.isLoggedIn ,(req,res)=> {
    res.render('index', {
        user: req.user
    });
});

router.get('/register',(req,res)=> {
    res.render('register');
});

router.get('/login',(req,res)=>{
    res.render('login');
});

router.get('/profile', authController.isLoggedIn, authController.userStats, (req,res)=>{

    if(req.user){
    res.render('profile', {
        user: req.user,
        stats: req.userstats
    });        
    } else {
        res.redirect('/login');
    }

});

router.get('/game', authController.isLoggedIn, authController.userStats, (req,res)=>{
    if(req.user){
        res.render('game',{
            user:req.user,
            stats:req.userstats
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/leaderboard', authController.isLoggedIn, authController.AlluserStats, (req,res)=>{
    if(req.user){
        res.render('leaderboard',{
            user:req.user,
            allstats:req.alluserstats
        });
    } else {
        res.redirect('/login');
    }
});


module.exports = router;