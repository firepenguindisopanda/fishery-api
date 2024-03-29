const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');
const User = db.user;
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if(err instanceof TokenExpiredError){
        return res.status(401).send({
            message: "Token expired!"
        });
    }
    return res.status(401).send({
        message: "Unauthorized!"
    });
}

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if(!token){
        return res.status(403).send({
            message: "No token Provided!"
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            return catchError(err, res);
        }
        req.userId = decoded.id;
        next();
    });
};

const isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for(let role of roles){
                if(role.name === "admin"){
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};

const isModerator = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for(let role of roles){
                if(role.name === "moderator"){
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Moderator Role!"
            });
        });
    });
}

const isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for(let role of roles){
                if(role.name === "moderator"){
                    next();
                    return;
                }
                if(role.name === "admin"){
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Moderator or Admin Role!"
            });
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin,
};
module.exports = authJwt;