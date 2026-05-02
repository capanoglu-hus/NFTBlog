require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser');
const { default: MongoStore } = require('connect-mongo');

// Eğer yukarıdaki hala hata veriyorsa şunu dene:
// const { default: MongoStore } = require('connect-mongo');


const connectDb = require('./server/config/db.js');
const {isActiveRoute} = require('./server/helpers/routeHelpers.js')
const session = require('express-session');

const app = express();
const PORT =  5000 || process.env.PORT;

connectDb();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'))
app.use(session({
    secret: 'keyboard cat' , 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://husniyecapanoglu_db_user:ZJcun862fsYW0xee@cluster0.gqgzlw4.mongodb.net/?appName=Cluster0', // .env dosyasından çekmek en iyisidir
        collectionName: 'sessions', // Oturumların saklanacağı koleksiyon adı
        ttl: 14 * 24 * 60 * 60, // 14 gün
        autoRemove: 'native' // Süresi dolan oturumları otomatik siler
    }),
    cookie: {
        secure: false, // Localde false, production'da (HTTPS) true olmalı
        httpOnly: true, // XSS saldırılarına karşı güvenlik sağlar
        maxAge: 1000 * 60 * 60 * 24 // 1 gün
    }
}));
app.use(express.static('public'));

app.use(expressLayout);
app.set('layout' , './layouts/main');
app.set('view engine' , 'ejs');

app.use('/', require('./server/routes/main.js'));
app.use('/', require('./server/routes/admin.js'));

app.listen(PORT , () => {
    console.log(`App listening on port ${PORT}`)
})