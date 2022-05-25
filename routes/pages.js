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

router.get('/profile', authController.isLoggedIn, (req,res)=>{

    if(req.user){
    res.render('profile', {
        user: req.user
    });        
    } else {
        res.redirect('/login');
    }

});

router.get('/game', authController.isLoggedIn, (req,res)=>{
    if(req.user){
        res.render('game',{
            user:req.user
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/leaderboard', authController.isLoggedIn, (req,res)=>{
    if(req.user){
        res.render('leaderboard',{
            user:req.user
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/profile', authController.userStats, (req,res)=>{

    if(req.userstats){
    res.render('profile', {
        stats: req.userstats
    });        
    } else {
        res.redirect('/login');
    }

});

router.get('/game', authController.userStats, (req,res)=>{
    if(req.userstats){
        res.render('game',{
            stats:req.userstats
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/leaderboard', authController.userStats, (req,res)=>{
    if(req.userstats){
        res.render('leaderboard',{
            stats:req.userstats
        });
    } else {
        res.redirect('/login');
    }
});




module.exports = router;