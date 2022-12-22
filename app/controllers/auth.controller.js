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
exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if(!user){
            return res.status(404).send({message: "User not found!"});
        }
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid){
            return res.status(401).send({accessToken: null, message: "Invalid Password!"});
        }
        let token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400 //24 hours
        });
        let authorities = [];
        user.getRoles().then(roles => {
            for(let i = 0; i < roles.length; i++){
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        });
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};