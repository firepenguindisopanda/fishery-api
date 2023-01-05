const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const RefreshToken = db.refreshToken;
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
    /**
     * firstname, lastname, username, email, password are required
     * check if these fields are empty.
     * if empty, return an error message
     * if not empty, continue
     */
    if(!req.body.firstname || !req.body.lastname || !req.body.username || !req.body.email || !req.body.password){
        return res.status(400).send({message: "Please fill all required fields!"});
    }


    User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        homeaddress: req.body.homeaddress ? req.body.homeaddress : 'N/A',
        phone: req.body.phone ? req.body.phone : 'N/A',
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
    }).then(async (user) => {
        if(!user){
            return res.status(404).send({message: "User not found!"});
        }
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid){
            return res.status(401).send({accessToken: null, message: "Invalid Password!"});
        }
        const token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: config.jwtExpiration
        });
        const refreshToken = await RefreshToken.createToken(user);
        let authorities = [];
        user.getRoles().then(roles => {
            for(const element of roles){
                authorities.push("ROLE_" + element.name.toUpperCase());
            }
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token,
                refreshToken: refreshToken,
            });
        });
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};

exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;
    if(requestToken == null){
        return res.status(403).send({
            message: "Refresh Token required!"
        })
    }
    try{
        const refreshToken = await RefreshToken.findOne({
            where: {
                token: requestToken
            }
        })
        if(!refreshToken){
            return res.status(403).send({
                message: "Refresh Token not found!"
            });
        }
        if(RefreshToken.verifyExpiration(refreshToken)){
            RefreshToken.destroy({
                where: {
                    id: refreshToken.id
                }
            });
            return res.status(403).send({
                message: "Refresh Token expired!"
            });
        }
        const user = await RefreshToken.getUser();
        const newToken = jwt.sign({id: user.id}, config.secret, {
            expiresIn: config.jwtExpiration
        });

        return res.status(200).send({
            accessToken: newToken,
            refreshToken: requestToken.token,
        });
    }catch(err){
        return res.status(500).send({
            message: err.message
        });
    }
};