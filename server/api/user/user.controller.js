'use strict';

var User = require('./user.model');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var error = require('../../components/errors');
var crypto =  require('crypto');
var mailer = require('../../components/mailer');

function index(req, res) {
    User.findAsync({}, '-salt -password')
        .then((users) =>{
            res.status(200).json(users);
        })
        .catch(error.handleError(res));
}

function create(req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    var user = newUser;
    newUser.saveAsync()
        .then((user) => {
            var token = jwt.sign({ _id: user._id, role: user.role}, config.secrets.session, {
                expiresIn: 60 * 60 * 5
            });

            var mail = {
                from: '"Contato BemCombinado.com"<contato@bemcombinado.com>',
                to: user.email,
                subject: 'Bem Vindo ao BemCombinado.com',
                text: 'Olá ' + user.name + ', \n\n' +
                    'Bem Vindo ao BemCombinado.com é um prazer conhecê-lo.\n\n' +
                    'Nosso sistema está em constante evolução, nossa plataforma irá de maneira segura, rápida e fácil conectar você, ' +
                    'que tem uma necessidade de resolver uma tarefa, com uma outra pessoa que está disposta a resolvê-la pra você.\n\n' +
                    'Além disso, você irá encontrar pessoas que tenham tarefas por fazer, ' +
                    'quanto elas esperam gastar e terá um meio fácil de se comunicar com elas.\n\n' +
                    'Guarde este endereço de e-mail, ele pode ser necessário posteriormente. ' +
                    'Adicione nosso endereço aos seus contatos para certificar-se que nossos e-mails cheguem a sua caixa de entrada.\n\n' +
                    'Se você tiver perguntas ou precisar de ajuda, ' +
                    'entre em contato a qualquer momento por meio deste e-mail ou visite nossa página do facebook (http://fb.me/bemcombinado).\n\n' +
                    'Mais uma vez, seja muito bem vindo e conte conosco.\n\n' +
                    'Atenciosamente,\n' +
                    'Equipe BemCombinado.com'
            };

            mailer.send(mail);

            res.json({ token });
        })
        .catch(error.validationError(res));
}

function me(req, res, next) {
    var userId = req.user._id;

    User.findOneAsync({ _id: userId }, '-salt -password')
        .then(function(user){ // don't ever give out the password or salt
            if (!user) {
                return res.status(401).end();
            }
            return res.json(user);
        })
        .catch(function(err){
            return error.handleError(res);
        });
}

function show(req, res, next) {
    var userId = req.params.id;

    User.findById(userId)
        .then((user) => {
            if(!user){
                return res.status(404).end();
            }
            res.json(user.profile);
        })
        .catch((err) => {
            error.handleError(res);
        });
}

function destroy(req, res) {
    User.findByIdAndRemoveAsync(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch(error.handleError(res));
}

function changePassword(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findByIdAsync(userId)
        .then((user) => {
            if(user.authenticate(oldPass)){
                user.password = newPass;
                return user.saveAsync()
                    .then(() => {
                        res.status(204).end();
                    })
                    .catch(error.validationError(res));
            } else {
                return res.status(403).end();
            }
        });
}

function forgotPassword(req, res, next) {

    User.findOneAsync({
        email: req.body.email
    })
        .then((user) => {
            if (!user) {
                return res.status(404).end();
            }
            var token = crypto.randomBytes(20).toString('hex');
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 1000 * 60 * 60 * 24 * 2; // 2 dias

            var email = user.email;

            return user.saveAsync()
                .then(() => {

                    var mail = {
                        from: '"Contato BemCombinado.com"<contato@bemcombinado.com>',
                        to: email,
                        subject: 'Esqueci minha senha',
                        text: 'Você está recebendo esta mensagem porque você (ou alguém) solicitou a troca de senha no nosso site.\n' +
                              'Por favor, clique no link ou copie para o seu navegador de internet para que possa continuar seu processo: \n\n' +
                              'http://www.bemcombinado.com/reset/' + token + '\n\n' +
                              'Se você não solicitou a troca de senha, ignore este email e sua senha continuará a mesma.'
                    };

                    mailer.send(mail)
                        .then(() => {
                            return res.status(204).end();
                        })
                        .catch(error.handleError(res));
                })
                .catch(error.handleError(res));

        })
        .catch(error.validationError(res));

}

function resetPassword(req, res, next){

    User.findOneAsync({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    })
        .then((user) => {
            if (!user) {
                return res.status(404).end();
            }

            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;


            user.saveAsync()
                .then(()=>{
                    return res.status(204).end();
                })
                .catch(error.handleError(res));
        })
        .catch(error.validationError(res));

}

function update(req, res, next){

    var userId = req.user._id;

    var userUpdated = req.body;

    var user = {};

    User.findOneAsync({_id: userId})
        .then((user) => {
            if (!user) {
                return res.status(404).end();
            }

            if(user.email !== userUpdated.email){
                User.findOneAsync({email: userUpdated.email})
                    .then((userFinded) => {
                        if(userFinded){
                            return res.status(403).end();
                        }else{
                            user.name = userUpdated.name || user.name;
                            user.email = userUpdated.email || user.email;
                            user.phone = userUpdated.phone || undefined;
                            user.isTasker = userUpdated.isTasker;
                            user.skills = userUpdated.skills || undefined;
                            user.bio = userUpdated.bio || undefined;


                            User.updateAsync({_id: userId}, user)
                                .then(() => {
                                    return res.status(204).end();
                                })
                                .catch(error.validationError(res));
                        }
                    })
                    .catch(error.validationError(res));
            }else{



            user.name = userUpdated.name || user.name;
            user.email = userUpdated.email || user.email;
            user.phone = userUpdated.phone || undefined;
            user.isTasker = userUpdated.isTasker;
            user.skills = userUpdated.skills || undefined;
            user.bio = userUpdated.bio || undefined;


            User.updateAsync({_id: userId}, user)
                .then(() => {
                    return res.status(204).end();
                })
                .catch(error.validationError(res));
            }
        })
        .catch(error.validationError(res));


    

}


function authCallback(req, res, next) {
    res.redirect('/');
}

module.exports = {
    index: index,
    create: create,
    show: show,
    destroy: destroy,
    me: me,
    changePassword: changePassword,
    authCallback: authCallback,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
    update: update
};