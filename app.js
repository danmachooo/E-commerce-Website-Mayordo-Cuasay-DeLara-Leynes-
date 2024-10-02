const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
// const audioRoutes = require('./routes/audioRoute');
// const albumRoutes = require('./routes/albumRoute');
// const playlistRoutes = require('./routes/playlistRoute');
const db = require('./config/db'); 
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// app.use('/', audioRoutes);
// app.use('/albums', albumRoutes);
// app.use('/playlists', playlistRoutes);


// router.get('/', mcdl.index);
// router.get('/shop', mcdl.shop);
// router.get('/aboutUs', mcdl.aboutUs);
// router.get('/services', mcdl.services);
// router.get('/blog', mcdl.blog);
// router.get('/contactUs', mcdl.contactUs);

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