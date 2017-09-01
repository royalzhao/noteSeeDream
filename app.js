const path = require('path')

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

let _static = path.join('webapp');
app.use(express.static(_static));

const loginRouter = require('./router/loginRouter');
app.use('/', loginRouter);

const checkUserRouter = require('./router/checkUserRouter');
app.use('/', checkUserRouter);

const registerRouter = require('./router/registerRouter');
app.use('/', registerRouter);

const mainRouter = require('./router/mainRouter');
app.use('/', mainRouter);

const diyRouter = require('./router/diyRouter');
app.use('/', diyRouter);

const chartsRouter = require('./router/chartsRouter');
app.use('/', chartsRouter);

const mallRouter = require('./router/mallRouter');
app.use('/', mallRouter);

const insertBuyRouter = require('./router/insertBuyRouter');
app.use('/', insertBuyRouter);





app.listen(80);

console.log('服务器启动，端口：80');
console.log('静态文件位置：' + _static);
