const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes/router');
const cors = require('cors');
const db = require('./config/db'); 
const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));
app.use('/', routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

db.init_db()
    .then(() => {
        app.listen(port, () => {
            console.log(`Connected: Running on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Database initialization failed', error);
    });
