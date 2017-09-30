import express from 'express';
import path from 'path';

// routes/controllers
import {
  auth,
  api,
  users,
  products,
  transactions,
  search
} from './routes/index.js';

import middleware from './middleware';
import router from './routes/router.jsx';


const app = express();

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: true}));
app.use(middleware.bodyParser.json());

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());
app.use(middleware.compression());
app.use((req, res, next) => {
  if (req.user) {
    req.user.auths = undefined;
    delete req.user.auths;
  }
  next();
});


app.use('/auth', auth);
app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/transactions', transactions);
app.use('/api/search', search);

app.disable('x-powered-by');
app.use('/images', express.static(path.join(__dirname, '../src/assets/images')));
app.use('/scripts', express.static('built'));
app.use('/styles', express.static(path.join(__dirname, 'style')));
app.use('/built', express.static(path.join(__dirname, 'built')));
app.use(express.static(path.join(__dirname, '../')));
app.get('/favicon.ico', (req, res) => res.send(''));

app.use('/*', router);

module.exports = app;
