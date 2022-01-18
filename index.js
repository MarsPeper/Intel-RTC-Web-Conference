const express = require('express');
const app = express();
const port = 3000;
//Loads the handlebars module
const { engine } = require('express-handlebars');
//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');
//Sets handlebars configurations (we will go through them later on)
app.engine('hbs', engine({
layoutsDir: __dirname + '/views/layouts',
extname: 'hbs',
defaultLayout: 'index'
}));
app.use(express.static('public'))
app.get('/', (req, res) => {


res.render('main');
});

app.listen(port, () => console.log(`App listening to port ${port}`))
