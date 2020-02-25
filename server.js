require('dotenv').config();

const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;

const app = express();

// CORS enabled
// Access-Control-Allow-Origin: *
app.use(cors());

// bodyParser now integrated in express
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use('/platform', require('./routes/platform'))

app.use('/', (req, res) => {
    res.send("Hello world!")
})

app.listen(port, () => console.log(`Now listening on port ${port}...`))