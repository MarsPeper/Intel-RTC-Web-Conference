const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;
const meetings = require('./meetings');
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
app.use(express.static('public'));

var jsonParser = bodyParser.json();

// get meetings by email
// all the meetings with organize.email = req.body.email
app.get('/api/v1/meeting-scheduler/get-meetings/:email', (req, res, next) => {
  console.log("== req.params:", req.params);
  if (req.params && req.params.email) {
    var temp_object = [];

    for (var i = 0; i < meetings.length; i++) {
      if (req.params.email === meetings[i].organizer.email) {
        temp_object.push(meetings[i]);
      }
    }
    res.status(200).json({
      meetings: temp_object
    })
  }
  else {
    res.status(400).send({
      err: "Email in request body required."
    });
    next();
  }
});

app.listen(port, () => console.log(`App listening to port ${port}`));
