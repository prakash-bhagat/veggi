const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const app = express();
const cors = require('cors');

/* CORS */
app.use(cors({
    origin: '*',
    methods: ['GET', 'PUT', 'DELETE', 'PATCH', 'POST'],
    allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}));
// app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, './upload')));
app.use(express.static(path.join(__dirname, './carousel')));


// Import Routes
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const orderRouter = require('./routes/order');
const employeeRouter = require('./routes/employee');
const adminRouter = require('./routes/admin');
//const usersUpdateRouter = require('./routes/usersUpdate');
// const userNotification = require('./routes/userNotification');


// Define Routes
/**
//  * swagger
 * /api/products:
 *   get:
 *    description: Get All Products
 *
 */

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', orderRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/admin',adminRouter);
// app.use('/api/userNotification',userNotification);
//app.use('/api/usersUpdate', usersUpdateRouter);

module.exports = app;
