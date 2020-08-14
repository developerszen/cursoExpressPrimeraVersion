const User = require('../models').user;
const Token = require('../models').token;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    //arreglar modelo usuario
    authenticate(req, res) {

        const salt = bcrypt.genSaltSync(10)
        console.log(bcrypt.hashSync(req.body.password, salt))
        return User.findOne({
            where: {
                email: req.body.email
            }
        }).then(usuario => {
            if (!usuario) {
                return res.status(400).send({
                    message: 'Usuario/Password Incorrecto'
                });
            }
            
            bcrypt.compare(req.body.password, usuario.password, function (err, response) {
                if (response) {
                    let accessToken = '';
                    var payload = {
                        id: usuario.id,
                        email: usuario.email,
                        first_name: usuario.first_name,
                        last_name: usuario.last_name
                    };
                    if (req.body.remember) {
                        accessToken = jwt.sign({
                            data: payload
                        }, 'key', {
                                expiresIn: '30d',
                                algorithm: 'HS256'
                            });

                    } else {
                        accessToken = jwt.sign({
                            data: payload
                        }, 'key', {
                                expiresIn: '1h',
                                algorithm: 'HS256'
                            });
                    }
                    
                    return res.status(200).send({
                        'access_token': accessToken
                    });

                } else {
                    return res.status(404).send({
                        message: 'Usuario/Password Incorrecto'
                    });
                }
            });
        }).catch(error => {
            return res.status(500).send(error);
        });
    },
    verifyToken(req, res, next) {
        const header = req.headers['authorization'];
        const ipAddress = req.headers['ip'];
        if (typeof header !== 'undefined' || typeof ipAddress !== 'undefined') {
            const bearer = header.split(' ');
            const token = bearer[1];
            jwt.verify(token, 'key', function (err, decoded) {
                if (err) {
                    switch (err.name) {
                        case 'TokenExpiredError':
                            res.sendStatus(401)
                            break;
                        case 'JsonWebTokenError':
                            res.sendStatus(403)
                            break;
                        default:
                            res.sendStatus(403)
                            break;
                    }
                } else {
                    next();
                }
            });
        } else {
            res.sendStatus(403)
        }
    },
}