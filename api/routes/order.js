const express = require('express');
const router = express.Router();
const database = require('../config/helpers');
const crypto = require('crypto');
var admin = require('firebase-admin');
var singleNote=[];
// const webpush = require('web-push');

// const PUBLIC_VAPID='BL_viucwQ9PpuavYjTNdOHN-gN98H_qfveuY7KUjyqFq1hjtR0-es1Dz9gTgvbl0dP6-mXI3AnDT67kLczwSkbY',
// const PRIVATE_VAPID='QhX4c4JNA3zgU0-wcoqro37Ibuu3WHXOK5XextTs4NA'

// GET ALL ORDERS
router.get('/', (req, res) => {
    database.getConnection(function(err,connection){
        if(err) throw err;
        connection.query('select o.id,p.id as productId,o.user_id,GROUP_CONCAT(p.title) as title,p.packet,p.description,SUM(p.price) as price,p.image,GROUP_CONCAT(od.quantity) as quantityOrdered from orders_details  od \
            inner join orders  o on \
            o.id = od.order_id \
            inner join products p on \
            p.id = od.product_id \
            inner join users u on \
            u.id = o.user_id  GROUP BY o.id',function(error,results){
                if(results.length > 0){
                    res.json(results)
                }else{
                    res.json({message:"No orders found"})
                }
                connection.release();
            } )
    })
});

// Get Single Order
router.post('/user',(req, res) => {
    let userId = req.body.userId;
   // console.log(userId);
    database.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
      
        // Use the connection
        connection.query('select o.id,o.user_id,(p.title) as products,\
        p.description,p.image,(od.quantity) as quantityOrdered from orders_details  od \
        inner join orders  o on \
        o.id = od.order_id \
        inner join products p on \
        p.id = od.product_id \
        inner join users u on \
        u.id = o.user_id \
        where user_id= '+userId+' GROUP BY o.id order by o.id desc;', function (error, results, fields) {
          // console.log(results);
          if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: "No orders found"});
        }
        connection.release();
          // Handle error after the release.
          if (error) throw error;
      
          // Don't use the connection here, it has been returned to the pool.
        });
      });

});

// Place New Order
router.post('/new',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        let {userId,products,notes} = req.body;
        console.log("ttt",req.body)
        connection.query('INSERT INTO orders SET user_id=?',[userId],function(err,newOrderId){
            // new order insert into order table with id response.
            if(newOrderId){
                console.log("new:",newOrderId.insertId)
                // for each to insert products details into order details
                products.forEach(async(p,index) => {
                    console.log("inside products",p)
                    connection.query('SELECT id,quantity FROM products WHERE id=?',[p.id],function(err1,data){
                        if(data){
                            console.log("data from database",data)
                            let inCart = parseInt(p.incart);
                            // minus of stock
                            if(data[0].quantity > 0)
                            {
                                data[0].quantity = data[0].quantity - inCart;
                                if(data[0].quantity < 0)
                                {
                                    data[0].quantity = 0;
                                }
                            }else{
                                data[0].quantity = 0;
                            }
                            // minus of stock end
                            connection.query('Insert into orders_details SET order_id=?,product_id=?,quantity=?,userNotes=?,price=?',[newOrderId.insertId,p.id,p.incart,notes[index],p.price],function(err,newId){
                                console.log("orders_details",newId)
                                if(newId){
                                    connection.query('UPDATE products SET quantity=? where id=?',[data[0].quantity,p.id],function(err,successNum){
                                        console.log("update products",successNum)
                                        if(successNum){
                                            //  res.json({success: true});
                                        //   return  res.json({
                                        //         message: `Order successfully placed with order id:${newOrderId.insertId}`,
                                        //         success: true,
                                        //         order_id: newOrderId.insertId,
                                        //         products: products
                                        //     });
                                        }else{
                                            console.log(err)
                                        }
                                    })
                                }else{
                                    console.log(err)
                                //    return res.json("Order Failed")
                                }
                            })
                        }else{
                            console.log(err1);
                        }
                    })
                }); //END of for each to insert products details into order details
                    res.json({                 message: `Order successfully placed with order id:${newOrderId.insertId}`,
                                                success: true,
                                                order_id: newOrderId.insertId,
                                                products: products
                                            });
            }else{
                console.log(err)
            //   return  res.json("Order Failed")
            }
            //  connection.release();
        })
 //admin notification
 connection.query('select token from admin where id=1',function(err,token){
 if(token[0].token != null){
     var registrationToken = token[0].token;

     var payload = {
         notification: {
             title: "User",  
             body: "New order arrived",
             sound: "default",
         },
     };
     var options = {
         priority: "high",
         timeToLive: 60 * 60 * 24
     };
     return admin.messaging().sendToDevice(registrationToken, payload, options)
         .then(function (response) {
             console.log("Successfully sent message:", response);
         })
         .catch(function (error) {
             console.log("Error sending message:", error);
         });
 }else{
     console.log("token error",err);
}
connection.release()
})
        // end
       
    }) //database
})

// Payment Gateway
router.post('/payment', (req, res) => {
    setTimeout(() => {
        res.status(200).json({success: true});
    }, 3000)
});






module.exports = router;
