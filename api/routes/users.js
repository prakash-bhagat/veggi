const express = require('express');
const router = express.Router();
const database = require('../config/helpers');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET users listing. */
router.get('/', (req, res)=> {
    database.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
      
        // Use the connection
        connection.query('select u.id,CONVERT_TZ(u.date,"+00:00","+05:30") as date,u.name,u.address,u.mobile,s.society_name as society \
        from users u inner join society s on s.id=u.society', function (error, results, fields) {
          if (results) {
            res.json(results);
        } else {
            res.json({message: 'NO USER FOUND'});
        }
        connection.release();
          // Handle error after the release.
          if (error) throw error;
      
          // Don't use the connection here, it has been returned to the pool.
        });
      });
    })

/**
 * ROLE 777 = ADMIN
 * ROLE 555 = CUSTOMER
 */


/* GET ONE USER MATCHING ID */
// router.get('/:userId', (req, res) => {
//     let userId = req.params.userId;
//     database.table('users').filter({id: userId})
//         .withFields([ 'username' , 'mobile','name', 'address', 'id', 'role' ])
//         .get().then(user => {
//         if (user) {
//             res.json({user});
//         } else {
//             res.json({message: `NO USER FOUND WITH ID : ${userId}`});
//         }
//     }).catch(err => res.json(err) );
// });

/* UPDATE USER PASSWORD */
router.post('/updatePassword', async (req, res) => {
  database.getConnection(function(err,connection){
    if(err) throw err;

     userId = req.body.userId;
    console.log("details",req.body)
    
     userPassword = req.body.address;
    console.log("password",userPassword)
    bcrypt.hash(userPassword, saltRounds, function(err, hash) {
      // Store hash in your password DB.
      console.log(hash)
      if(hash){
      connection.query('UPDATE users set password="'+hash+'" where id='+userId+';',function(err,result){
        if(result){
          res.json("success")
        }else{
          console.log(err)
        }
        connection.release();
      })
      
    }else{
      console.log(err)
    }
  });
    // connection.query('select * from users where id='+userId+'',function(error,results){
    //   if(results){
    //     let userPassword = bcrypt.hash(req.body.password, 10);
    //     connection.query('UPDATE users SET password ="'+userPassword+'" WHERE id='+userId+';',
    //     function(err,pass){
    //       if(pass){
    //         console.log(pass);
    //       }else{console.log(err);}
    //     })
    //   }else{
    //     console.log(error);
    //   }
    //   connection.release();
    // })
  }) 
});

router.get('/society',(req,res)=>{
  database.getConnection(function(err,connection){
    if (err) throw err;
    connection.query('select * from society',function(error,results){
      if (results) {
        res.json(results);
      }else{
        res.json('None');
      }
      connection.release();
    })
  })
})

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
      where user_id= '+userId+'  GROUP BY o.id order by o.id desc;', function (error, results, fields) {
        // console.log(results);
        if (results) {
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
router.get('/order/:orderId',(req, res) => {
  try{
      console.log("Inside")
      database.getConnection(function(err, connection) {
          if (err) throw err; // not connected!
          console.log("err:",err)
          // console.log(err);
          let orderId = req.params.orderId;
          // console.log(orderId);
          // Use the connection
          console.log(orderId);
          connection.query('select od.price,od.id as new,od.userNotes,CONVERT_TZ(od.date,"+00:00","+05:30") as date,w.type,p.packet,s.society_name,\
          u.name,p.id as productId,u.mobile as mobile,u.address,o.id,o.user_id,p.title as products,\
          p.description,p.image,od.quantity as quantityOrdered from orders_details  od \
          inner join orders  o on \
          o.id = od.order_id \
          inner join products p on \
          p.id = od.product_id \
          inner join weight w on\
          p.type_id = w.id\
          inner join users u on \
          u.id = o.user_id \
      inner join society s on \
      s.id = u.society \
          where o.id= '+orderId+' ;', function (error, results, fields) {
          //    console.log(results);
            if (results) {
                
              res.json(results); 
              // console.log(res.json);
          } else {
              res.json({message: "No orders found"});
          }
          connection.release();
            // Handle error after the release.
            if (error) throw error;
        
            // Don't use the connection here, it has been returned to the pool.
          });
        });
      } catch(error){
          console.log(error);
      }
      finally{
          // connection.release();
      }
  
  });
// token removed
router.post('/disposetoken',(req,res)=>{
  database.getConnection(function(err,connection){
    if (err) throw err;
    mobile= req.body.mobile;
    console.log("mmmmm",mobile)
    connection.query('update mega_shop.users set token=null where mobile='+mobile+';',function(error,results){
      if (results) {
        res.json("ok");
      }else{
        res.json(error);
      }
      connection.release();
    })
  })
})

module.exports = router;
