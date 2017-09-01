const express = require('express')

const mysql = require('../util/mysql');
var sd = require('silly-datetime');
// 路由
const router = express.Router()

// 路由把客户端请求的url和处理方法连接起来
router.route('/diy').post(function (req, res) {
  let sql =  `select * from diy`;
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
router.route('/diySelect').post(function (req, res) {
  let sql =  `select * from diy where id = ?`;
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
router.route('/updateDiy').post(function (req, res) {
  let sql =  `update diy set img=?,title=?,abstract=?,content=?,putDate=?,author=? where id=?`;
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
router.route('/insertDiy').post(function (req, res) {
  let sql =  `insert into diy(img,title,abstract,content,putDate,author) values (?,?,?,?,?,?)`;
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
router.route('/delDiy').post(function (req, res) {
  let sql =  `delete from diy where id = ?`;
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
router.route('/searchDiy').post(function (req, res) {
  console.log(req.body);
  let sql =  `select * from diy where putDate >= ? and putDate <= ?`;
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
module.exports = router
