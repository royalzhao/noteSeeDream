const express = require('express')

const mysql = require('../util/mysql');

// 路由
const router = express.Router()

// 路由把客户端请求的url和处理方法连接起来
router.route('/login').post(function (req, res) {
  console.log(req.body)
  let sql =  `select * from user where account = ? and password = ?`;
  
  param = [req.body.account,req.body.password];
  
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
      if(data.length > 0){
        res.send({message:'ok'})
      }else{
        res.send({message:'error'})
      }
    })
  })
})

module.exports = router
