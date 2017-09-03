const path = require('path')

const express = require('express');
const bodyParser = require('body-parser');

const multer  = require('multer');
const fs = require('fs'); 

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

let _static = path.join('webapp');
app.use(express.static(_static));

var createFolder = function(folder){     
    try{         
        fs.accessSync(folder);      
    }catch(e){         
        fs.mkdirSync(folder);     
    }   
};  
var uploadFolder = './webapp/upload/';  
createFolder(uploadFolder);  
// 通过 filename 属性定制 
var storage = multer.diskStorage({     
    destination: function (req, file, cb) {         
        cb(null, uploadFolder);    
        // 保存的路径，备注：需要自己创建     
    },     
    filename: function (req, file, cb) {         
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943         
        cb(null, file.fieldname + '-' + Date.now()+'.jpg');       
    } 
});  
// 通过 storage 选项来对 上传行为 进行定制化 
var upload = multer({ storage: storage })  
// 单图上传 
app.post('/upload', upload.single('img'), function(req, res, next){
   // console.log(req.body)     
    var file = req.file;     
   // var name=file.filename; 
    res.send({name:file.filename})
    console.log('文件类型：%s', file.mimetype);     
    console.log('原始文件名：%s', file.originalname);     
    console.log('文件大小：%s', file.size);     
    console.log('文件保存路径：%s', file.path);
    console.log('文件名称：%s', file.filename);
});  


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





app.listen(8080);

console.log('服务器启动，端口：80');
console.log('静态文件位置：' + _static);
