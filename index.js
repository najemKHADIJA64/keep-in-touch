const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars');
const app = express()
const path = require('path') 
var smtpTransport = require('nodemailer-smtp-transport');

const nodemailer = require('nodemailer');
const port = 4000
app.set('view engine', 'hbs');

//view engine setup
app.engine( 'hbs', hbs( {
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs',
  defaultLayout: 'index',
  partialsDir: __dirname + '/views/partials/'
})); 

// static folder  
app.use('/public', express.static(path.join(__dirname, 'public')))

//body parser midlware
app.use(bodyParser.urlencoded({ extended : false}))
app.use(bodyParser.json());

app.get('/', (req, res) =>
{
   res.render('main', {layout: 'index', listExists: true})
})

app.post('/send',(req, res) =>{
  const output = `
  <p> you have a new contact request</p>
   <h3>  contact Details</h3>
   <ul>
    <li> Name : ${req.body.name}</li>
    <li> Company : ${req.body.company}</li>
    <li> Email : ${req.body.email}</li>
    <li> Name : ${req.body.phone}</li
   </ul>
    <h2>Message</h2>
    <p> ${req.body.message}</p>
  `;



 let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'najemkhadija64@gmail.com',
    pass: 'Najem1999'
  },
  tls:{
      rejectUnauthorized:false
    }
});
 // setup email data with unicode symbols
  let mailOptions = {
      from: 'najemkhadija64@gmail.com', // sender address
      to: 'najemkhadija1999@outlook.com', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: "<h1>Hi there</h1>" // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('main', {msg:'Email has been sent'});

  });

});
app.listen(port, () => {
  console.log(`server started... `)
})
