var mailer = require('../components/mailer');

var mail = {
    from: '"Contato"<contato@bemcombinado.com>', // sender address
    to: 'fernandohcfarias@gmail.com', // list of receivers
    subject: 'Hello', // Subject line
    text: 'Hello world',
    html: '<b>Hello World</b>'
};

mailer.send(mail)
.then(function () {
    console.log("enviado com sucesso");
})
.catch(function (err) {
    console.error(err);
});