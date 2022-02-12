const express = require('express');
const app = express();
const axios= require('axios')
const port = 3000;
//Loads the handlebars module
const { engine } = require('express-handlebars');

//function to get data from test data from API calls
const getMeetings = async () => {
  var email = "test@intel.com"
  const baseURL = 'http://localhost:3001/api/v1/meeting-scheduler/get-meetings/test@intel.com';
  try {
    const resp = await axios.get(baseURL);
    console.log(resp.data);
    return JSON.stringify(resp.data);
  } catch(err) {
    console.error(err);
  }
}


//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');
//Sets handlebars configurations (we will go through them later on)
app.engine('hbs', engine({
layoutsDir: __dirname + '/views/layouts',
extname: 'hbs',
defaultLayout: 'index'
}));
app.use(express.static('public'))
app.get('/', async (req, res) => {


res.render('main',{meetingsData: await getMeetings()});
});

app.listen(port, () => console.log(`App listening to port ${port}`))
