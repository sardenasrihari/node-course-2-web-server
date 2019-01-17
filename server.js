const express = require('express');
const hbs =require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
 var app = express();

 hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

 app.use(express.static(__dirname + '/public'));
 app.use((req, res, next) => {
   var now = new Date().toString();
   var log =`${now}: ${req.method} ${req.url}`;
   console.log(log);
   fs.appendFile('server.log', log + '\n', (err) => {
     if (err) {
       console.log('Unable to append to server.log');
     }
   });
 next();
 });

 hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear()
 });

 app.get('/', (req, res) => {
   // res.send('<h1>Hello Express</h1>');
   res.send({
     name: 'Srihari',
     likes: ['Biking',
   'Cities']
 });
 });

app.get('/about', (req, res) => {
res.render('about.hbs', {
  pageTitle: 'About page',
  // currentYear: new Date().getFullYear()
});
});

app.get('/home', (req, res) => {
res.render('home.hbs', {
  pageTitle: 'WELCOME USER',
  // currentYear: new Date().getFullYear()
});
});
app.get('/bad', (req, res) => {
  res.send({
    name: 'Error',
    message: 'Unable to process the request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}` );
});
