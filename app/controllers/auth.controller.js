const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    /**
     * Save User to database
     * - first hash the password from the request
     * - then create a new user with the hashed password
     * - then using the array of roles passed in the request, find the roles in the database
     * - then assign the roles to the user Object created.
     * - then save the user to the database
     */
    let hashedpwd = bcrypt.hashSync(req.body.password, 8);
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedpwd
    }).then(user => {
        if(req.body.roles){
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.send({message: "User registered successfully!"});
                });
            });
        }else{
            user.setRoles([1]).then(() => {
                res.send({message: "User registered successfully!"});
            });
        }
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};