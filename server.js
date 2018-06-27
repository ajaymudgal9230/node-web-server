const express = require('express');
const hbs = require('hbs'); //module of handlebars
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase()
});
app.set('view engine', 'hbs');

//app.use is middleware
app.use(express.static(__dirname+'/public'))
app.use((req, res, next) =>{
    var now = new Date().toDateString();
    var log = `${now} ${req.method} ${req.url}`

    fs.appendFile('server.log', log+'\n', (err) =>{
        if(err){
            console.log('Unable to create logs.')
        }
    });
    next();
});
app.use((req, res, next) =>{
    res.render('maintenance.hbs', {
        welcomeMessage: 'Site is under maintenance.',
        pageTitle: 'Maintenance Page'
    })
})

//app.get are controllers
app.get('/', (req, res)=>{
    res.render('home.hbs', {
        welcomeMessage: 'Welcome to Expree Home Page',
        pageTitle: 'Home Page',
    });
});

app.get('/about', (req, res) =>{
    res.render('about.hbs', {
        welcomeMessage: 'Welcome to about Page',
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req,res) =>{
    res.send({
        errorMessage: 'Something went wrong.'
    })
})

app.listen(port, () =>{
    console.log(`Server is up on port ${port}`);
})