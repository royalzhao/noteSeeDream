const express = require('express')

const mysql = require('../util/mysql');

// 路由
const router = express.Router()

// 路由把客户端请求的url和处理方法连接起来
router.route('/checkUser').post(function (req, res) {
  console.log(req.body)
  let sql =  `select account from user where account = ?`;
  param = [req.body.account];
  
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
        console.log({messsage: 'sql语句执行出错误'})
        return
      }
      console.log(data.length)
      if(data.length != 0){
        res.send({message:'error'});
      }else{
        res.send({message:'ok'});
      }
    })
  })
})

module.exports = router
