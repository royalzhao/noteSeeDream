const express = require('express')

const mysql = require('../util/mysql');

var sd = require('silly-datetime');

// 路由
const router = express.Router();

// 路由把客户端请求的url和处理方法连接起来

router.route('/main').post(function (req, res) {
  let sql =  `select * from news`;
 // param = [req.body.account,req.body.password];
  
  mysql.pool.getConnection(function (error, connection) {
    if (error) {
      console.log({message: '连接数据库失败'})
      return
    }
    connection.query({
      sql: sql,
      //values: param
    }, function (error, data) {
      connection.release()
      if (error) {
        console.log({messsage: 'ERROR'})
        return
      }
      res.send(data);
    })
  })
})

router.route('/mainSelect').post(function (req, res) {
  let sql =  `select * from news where id = ?`;
  param = [req.body.id];
  
  mysql.pool.getConnection(function (error, connection) {
    if (error) {
      console.log({message: '连接数据库失败'})
      return
    }
    connection.query({
      sql: sql,
      values: param
    }, function (error, data) {
      connection.release()
      if (error) {
        console.log({messsage: 'ERROR'})
        return
      }
      res.send(data);
    })
  })
})

// 路由把客户端请求的url和处理方法连接起来
router.route('/updateNews').post(function (req, res) {
  let sql =  `update news set img=?,title=?,abstract=?,content=?,putDate=?,author=? where id=?`;
  var time = sd.format(new Date());
  param = [req.body.newsImg,req.body.newsTitle,req.body.newsAbstract,req.body.newsContent,req.body.newsPutDate,req.body.newsAuthor,req.body.id];
  
  mysql.pool.getConnection(function (error, connection) {
    if (error) {
      console.log({message: '连接数据库失败'})
      return
    }
    connection.query({
      sql: sql,
      values: param
    }, function (error, data) {
      connection.release()
      if (error) {
        console.log({messsage: 'ERROR'})
        return
      }else{
        res.json({message:'ok'});
      }
      //console.log(data)
      
    })
  })
})


// 路由把客户端请求的url和处理方法连接起来
router.route('/insertNews').post(function (req, res) {
  console.log(req.body)
  let sql =  `insert into news(img,title,abstract,content,putDate,author) values (?,?,?,?,?,?)`;
  var time = sd.format(new Date());
  param = [req.body.newsImg,req.body.newsTitle,req.body.newsAbstract,req.body.newsContent,time,req.body.newsAuthor];
  
  mysql.pool.getConnection(function (error, connection) {
    if (error) {
      console.log({message: '连接数据库失败'})
      return
    }
    connection.query({
      sql: sql,
      values: param
    }, function (error, data) {
      connection.release()
      if (error) {
        console.log({messsage: 'ERROR'})
        return
      }else{
        res.json({message:'ok'});
      }
      //console.log(data)
      
    })
  })
})

// 路由把客户端请求的url和处理方法连接起来
router.route('/delNews').post(function (req, res) {
  let sql =  `delete from news where id = ?`;
  var time = sd.format(new Date());
  param = [req.body.id];
  mysql.pool.getConnection(function (error, connection) {
    if (error) {
      console.log({message: '连接数据库失败'})
      return
    }
    connection.query({
      sql: sql,
      values: param
    }, function (error, data) {
      connection.release()
      if (error) {
        console.log({messsage: 'ERROR'})
        return
      }else{
        res.json({message:'ok'});
      }
      //console.log(data)
      
    })
  })
})

//路由把客户端请求的url和处理方法连接起来
router.route('/searchMainNews').post(function (req, res) {
  console.log(req.body);
  let sql =  `select * from news where putDate >= ? and putDate <= ? and title like "%"?"%"`;
  param = [req.body.firstTime,req.body.secondTime,req.body.newsTitle];
  mysql.pool.getConnection(function (error, connection) {
    if (error) {
      console.log({message: '连接数据库失败'})
      return
    }
    connection.query({
      sql: sql,
      values: param
    }, function (error, data) {
      connection.release()
      if (error) {
        console.log({messsage: 'ERROR'})
        return
      }else{
        res.send(data);
      }
      console.log(data)
      
    })
  })
})
//路由把客户端请求的url和处理方法连接起来
router.route('/upload').post(function (req, res) {
  console.log(req.body);
  let sql =  `select * from news where putDate >= ? and putDate <= ?`;
  param = [req.body.firstTime,req.body.secondTime];
  mysql.pool.getConnection(function (error, connection) {
    if (error) {
      console.log({message: '连接数据库失败'})
      return
    }
    connection.query({
      sql: sql,
      values: param
    }, function (error, data) {
      connection.release()
      if (error) {
        console.log({messsage: 'ERROR'})
        return
      }else{
        res.send(data);
      }
      console.log(data)
      
    })
  })
})
//路由把客户端请求的url和处理方法连接起来
router.route('/mainfenye').post(function (req, res) {
  console.log(req.body);
  let sql =  `select * from news limit ? , ? `;
  let limit = parseInt(req.body.limit);
  var curr = parseInt(req.body.curr);
  if(curr <= 0){
    curr = 1;
  }
  let offset = (curr-1)*limit;
  
  param = [offset,limit];
  mysql.pool.getConnection(function (error, connection) {
    if (error) {
      console.log({message: '连接数据库失败'})
      return
    }
    connection.query({
      sql: sql,
      values: param
    }, function (error, data) {
      connection.release()
      if (error) {
        console.log({messsage: 'ERROR'})
        return
      }else{
        res.send(data);
      }
     // console.log(data)
      
    })
  })
})
module.exports = router
