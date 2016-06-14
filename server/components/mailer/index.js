var nodemailer = require('nodemailer');
var Promise = require('bluebird');
var config =  require('../../config/environment');

var transporter = Promise.promisifyAll(nodemailer.createTransport({
    host: config.mail.host,
    port: 465,
    secure: true,
    auth: {
        user: config.mail.user,
        pass: config.mail.pass
    }
}));


module.exports = {
    send: function(mail){
        return transporter.sendMailAsync(mail);
    }
}

/*
Mail Template
 var mail = {
     from: '"Contato"<contato@bemcombinado.com>', // sender address
     to: 'leleap007@gmail.com', // list of receivers
     subject: 'Hello', // Subject line
     text: 'Hello world',
     html: '<b>Hello World</b>'
 };
 */