const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const db = require('./config/DB');


module.exports = require('knex')({
  debug: true,
  asyncStackTraces: false,
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '@Nazachi15',
    database : 'test',
  }
});


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ extended: false }));


app.use('/insert', require('./controllers/Insert'));
app.use('/update', require('./controllers/Update'));
app.use('/delete', require('./controllers/Delete'));
app.use('/select', require('./controllers/Select'));



const PORT = process.env.PORT || 1111;
app.listen(PORT, () => {
  console.log(`Dashboard running on port ${PORT}...`)
})