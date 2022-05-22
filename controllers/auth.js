const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const async = require("hbs/lib/async");
const { promisify } = require('util');
const { reset } = require("nodemon");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).render('login', {
                message: 'Please provide a username and password'
            })
        }

        db.query('SELECT * FROM users WHERE username = ?', [username], async (error, results) => {
            console.log(results);
            if (results.length == 0 || !(await bcrypt.compare(password, results[0].password))) {
                res.status(401).render('login', {
                    message: 'The Username or Password is incorrect'
                })
            } else {
                const id = results[0].id;

                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("The token is: " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000 //For miliseconds
                    ),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/profile");
            }

        })

    } catch (error) {
        console.log(error);
    }
}


exports.register = (req, res) => {
    console.log(req.body)

    const { username, email, password, passwordConfirm } = req.body;

    db.query('SELECT email, username FROM users WHERE email = ? OR username = ? ', [email, username], async (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            let emaillow = results[0].email;
            let userlow = results[0].username;
            if (emaillow.toLowerCase() == email.toLowerCase()) {
                return res.render('register', {
                    message: 'That email is already in use'
                });
            } else if (userlow.toLowerCase() == username.toLowerCase()) {
                return res.render('register', {
                    message: 'That Username is already taken'
                });
            }
        } else if (password !== passwordConfirm) {
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', { username: username, email: email.toLowerCase(), password: hashedPassword }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                                    console.log(results);
                return res.render('register', {
                    message: 'User Registered'
                });                
            }
        })
        /*db.query('SELECT id FROM users WHERE email = ?',[email],(error, results)=> {
            if(error){
                console.log(error);
            } else {
                console.log(results);
            }
        });*/
 

    });
    db.query('INSERT INTO stats SET (SELECT id FROM users WHERE email = ?)',[email], (error, results)=>{
        if(error){
            console.log(error);
        } else {
            console.log(results);
        }
    });

}

exports.isLoggedIn = async (req, res, next) => {
    console.log(req.cookies);
    if (req.cookies.jwt) {
        try {
            //1) verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

            console.log(decoded);

            //2) Check if the user still exists
            db.query('SELECT * FROM users WHERE id = ?',[decoded.id], (error, result)=>{
                console.log(result);

                if(!result){
                    return next();
                }

                req.user = result[0];
                return next();

        });
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
            next();
    }

}

exports.logout = async (req, res) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now()+ 2*1000),
        httpOnly: true
    });

    res.status(200).redirect('/');
}