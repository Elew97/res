const express = require("express")
const conn = require("../../config/db")
const bcrypt = require("bcrypt")
const router = express.Router()
const jwt = require("jsonwebtoken")
const db = require("../../config/db")

//用户注册
router.post("/register", (req, res) => {
    const name = req.body.name
    const pwd = req.body.password
    const sql = `select * from u_user where name='${name}'`
    conn.query(sql, (error, result, filed) => {
        if (error) {
            res.json({
                code: 1,
                msg: "获取信息失败"
            })
        } else {
            if (result.length > 0) {
                res.json({
                    code: 2,
                    msg: "用户已存在"
                })
            } else {
                //加密密码
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(pwd, salt, function (err, hash) {
                        if (err) throw err
                        const bcryptPassword = hash
                        const sql = `insert into u_user (name,password) values ('${name}','${bcryptPassword}')`
                        conn.query(sql, (error, result, filed) => {
                            if (error) {
                                res.json({
                                    code: 1,
                                    msg: '注册失败',
                                    error: error
                                })
                            } else {
                                res.json({
                                    code: 200,
                                    msg: 'success'
                                })
                            }
                        })
                    });
                });
            }
        }
    })
})
//用户登录
router.post("/login", (req, res) => {
    const {
        name,
        password: pwd
    } = req.body
    const sql = `select * from u_user where name='${name}'`
    conn.query(sql, (error, result, filed) => {
        if (error) {
            res.status(404).json({
                msg: '获取信息失败',
                error: error
            })
        } else {
            if (result.length <= 0) {
                res.status(400).json({
                    msg: "用户名不正确"
                })
            } else {
                bcrypt.compare(pwd, result[0].password).then((isMatch) => {
                    if (isMatch) {
                        const token = jwt.sign({
                            name,
                            pwd
                        }, 'pzy', {
                            expiresIn: 60
                        })
                        res.status(200).json({
                            msg: 'success',
                            token
                        })
                    } else {
                        res.status(400).json({
                            msg: '密码不正确'
                        })
                    }
                })
            }
        }
    })
})
//点餐
router.post("/order", (request, response) => {
    request.body.forEach((item, index) => {
        const sql = `insert into u_order (order_num,food_id,order_price,u_id) values ('${item.food_num}','${item.id}','${item.price}','${item.u_id}')`;
        db.dataControl(sql, (req, res) => {
            if (req.status == false) {
                response.status(400).json({
                    msg: '下单失败',
                })
            } else {
                if (index + 1 == request.body.length) {
                    response.status(200).json({
                        msg: "success",
                    })
                }
            }
        })
    })
})
//查看订单
router.post("/orderDetail", (request, response) => {
    const sql = `select * from u_order a join u_user b on a.u_id=b.u_id join foods c on a.food_id=c.id where b.u_id='${request.body.id}'`
    db.dataControl(sql, (req, res) => {
        if (req.status == false) {
            response.status(400).json({
                msg: 'error',
            })
        } else {
                response.status(200).json({
                    msg: "success",
                    data: req.data
                })
        }
    })
})
//删除订单(先判断该订单是否存在)
router.post("/orderDel", (req, res) => {
    const sql = `select * from u_order where o_id = '${req.body_id}'`
    conn.query(sql, (error, result, field) => {
        if (error) {
            res.status(404).json({
                msg: 'filed'
            })
        } else {
            if (result.length <= 0) {
                res.status(400).json({
                    msg: '订单不存在'
                })
            } else {
                const sql = `delete from u_order where o_id ='${req.body.id}' `
                conn.query(sql, (error, result, filed) => {
                    if (error) {
                        res.status(404).json({
                            msg: '删除失败'
                        })
                    } else {
                        res.status(200).json({
                            msg: "success",
                        })
                    }
                })
            }
        }
    })
})
module.exports = router