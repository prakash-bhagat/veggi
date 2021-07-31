const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { extname } = require('path');
const database = require('../config/helpers');
const bcrypt = require('bcrypt');
var admin = require('firebase-admin');
var serviceAccount = {
    "type": "service_account",
"project_id": "homease-5858",
"private_key_id": "4c056432a4cc80a865689341d7b7eed227816f13",
"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC4jcHeca7pT+gd\naTi+VDDpror4wwcUl48l+YAtG/by207OswsR5NWDX0gTqPjPayDqo1oYBocZlcu5\n1OeHY1TdDku4oeA8c0H4GCaoYrRA+P4lL7dxgQQdukKa+jB+3ClOuw3UvNQdUc0a\njYSnudj2gvW1HuCpwYV4/6oATRxlSua3xJpldfDf0EJdcJafYVq81o0yK1V1+z5q\nGzXNIoA103iLTDEz7IvYYFbEbyGi0Zrcwyb2smTzMs9L3Fs6+9okWuVpoYtzBRkj\n2/Go8CFrW1IRkdWue9H6RTay67PwPJLAIyp0EhbWutTwZnqSzEN+g3B1Kx1Cx2Br\ndv6QbSpzAgMBAAECggEAGPcoNjC3wh0Kn8vnnquh8EKpzwwG7ayw8yikw7VoOyMa\nrpB+211S2tItXGd7vQdXbRZK7jwX04i1hf58kY6I4Nx5ttDDFjpbPrX5qMatbqqg\nKqShUqvqxCC5uOBGZirfNaTNMq2Wnh6+OazSOKRF6tb9aRJzvtMMfLlNJHxJ7pOv\npGiYl78ntG9BkxZw6K78PUsqXVqycPKWnZOtQGmiagR3tm2aQgvhvuTkVuJyJrw/\nfqIKMMy9vQ2bPENun8e6Vh9b+Yz4lizCD8Eo81X6ksop01BImQXOGoWXS6CkABPI\nzO/CWNfKoqNFAWqwIQKUZpAFRbbOtZfScV4zGYqW3QKBgQDzDmn/TjmbFUF0AOCv\nE9sTgQWcIYmnDnn+ax40IgV1i9W/siHuKE212mQjQBpskUTw4+EeBKP0djfnHbf2\noBoTUE6V5a4EVxTnxiP4TN9TGsgfINPn77x3Mx/QkTdYwpn7F6VIWeJe2cHjuJqO\nee57Y6okou6mm5vUnwr38gOjDQKBgQDCYccmjUYGP/CYJsQGlUXx3kLAc6GOpqfi\nXGTG/WYaVtxOUDng4I/00t6NpTKtCSn1jvqzO1h578RANmGkZn2ho+9fwsIS3Vqj\nJspGh+MRqQPpvY5bqshU1Z8smrnAlZv7vGZmGxs/Cw1eLRP3bNxMEGIwAcOExrdZ\nHZ37c4ajfwKBgChJmFpALh49nLbMunFquiJ2fWaOzJFLPf9k5AHCLeN5BTocHbGr\nLo5ZH8YUBw092w6Oxy7BmCeaPNPrQiX4Dbpr0krYYkrH4Gg2mJm8rDvLMaavO1Cz\nlSqw57Ibj+//eaR8G+JtO697Kr9DRyMcpOIA+B/QffxRyLeqkRfeHqo1AoGAe1l4\n+ynjKcwhbSwMcPEA9b9JNL8r4k43cxmWif/7bvN30epvEBjwwTefKtuOEOgjzEPz\nKxGZz6crLmRUCfNP/eb93BLG/Rmijq3q5l8M5QQQC5/SWrFBdzQoUjHNdjx6Q4EG\nqfzBiXwF+6E3bmeSVGKBLF2yKOvBJbf5rLte0RkCgYA0bWrzWxT9JqqPVVdipKan\nvd3JH60PF8Yf6mPP5GSlvYe02HdaqLwCOs8TjFhhnnKv/5rMGEPvi1EHZLibfG9l\nMlaqTuJt0iwGj8G/ooTmuMVl3WrDCZ9ysOHzmR96WXUB7dGmLe3TPUo6wCesTWUV\ncktXjthtzwkuNSTg969yiQ==\n-----END PRIVATE KEY-----\n",
"client_email": "firebase-adminsdk-uxopr@homease-5858.iam.gserviceaccount.com",
"client_id": "105080402687307657613",
"auth_uri": "https://accounts.google.com/o/oauth2/auth",
"token_uri": "https://oauth2.googleapis.com/token",
"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-uxopr%40homease-5858.iam.gserviceaccount.com"
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://homease-5858.firebaseio.com'
});

//storage
const storage = multer.diskStorage({
    destination: './carousel/',
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + 
        path.extname(file.originalname));
    }
})
//upload
const upload = multer({
    storage: storage,
    limits:{fileSize:10000000},
    //data type
    fileFilter: function(req,file,cb){
        checkFileType(file,cb);
    }
}).single('image');
//check file type
function checkFileType(file,cb){
    //allow ext
    const filetypes = /jpeg|jpg|png|gif/;
    //check ext
    const ext = filetypes.test(path.extname(file.originalname)
    .toLowerCase());
    //check mime 
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true)
    }else{
        cb('Error: Images Only')
    }
}

// update admin token for admin notification
router.post('/adminToken',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        console.log("adminToken",req.body.fcm)
        admintkn = req.body.fcm
        connection.query('UPDATE admin SET token=? where id=1',[admintkn],function(error,results){
            if(results){
                res.json(results);
                console.log(results);
            }else{
                res.json(error);
            }
            connection.release();
        })
    })
    
});

// ADD EMPLOYEE
router.post("/addemployee",(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        const name = req.body.name;
        const mobile = req.body.mobile;
        const address = req.body.address;
       // const password = bcrypt.hash(req.body.password, 10);
        const password = req.body.password; 
       connection.query('INSERT into employee SET name=?,mobile=?,address=?,password=?',[name,mobile,address,password],
        function(error,results){
            console.log(error);
            if(results){
                res.json(results);
            }
            else{
                res.json("Not created")
            }
            connection.release();
        })
    })
});
//REMOVE EMPLOYEE
router.post("/delemployee",(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        const mobile = req.body.mobile;
        connection.query('DELETE FROM employee WHERE mobile=?',mobile,function(error,deleted){
            if(deleted){
                res.json('successfully deleted');
            }else{
                res.json(error);
            }
            connection.release();
        })
    })
});
//EMPLOYEE LIST
router.get("/employeelist",(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        connection.query('SELECT *,CONVERT_TZ(date,"+00:00","+05:30") as date FROM employee',function(error,results){
            if(results){
                res.json(results);
            }else{
                res.json(error);
            }
            connection.release();
        })
    })
})
//EMPLOYEE ORDER
router.get('/employeeOrder',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        connection.query('SELECT u.name,u.address,u.mobile,od.payment,od.notes,od.order_id FROM orders_details od\
        inner join orders  o on \
        o.id = od.order_id \
        inner join products p on \
        p.id = od.product_id \
        inner join users u on \
        u.id = o.user_id \
        where final_orderStatus=1 group by od.order_id order by od.order_id desc',function(error,results){
            if(results){
                res.json(results)
            }else{
                res.json(error)
            }
            connection.release();
        })
    })
})
// delivery status get
router.get('/deliveryStatus',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        connection.query('select u.name,u.mobile,o.id,o.user_id,u.address,(s.society_name) as society , \
            p.image,(od.final_orderStatus) as orderStatus\
           from orders_details  od \
                inner join orders  o on \
                o.id = od.order_id \
                inner join products p on \
                p.id = od.product_id \
                inner join users u on \
                u.id = o.user_id \
				inner join society s on \
            s.id=u.society \
                where  od.employee_id!=0 \
                group by o.id order by o.id desc',function(error,results){
                    if (results) {
                        res.json(results);
                    }else{
                        res.json({message:'No Orders Found'})
                    }
                    connection.release();
                })
    })
})
//USERS SECTION user delete
router.post("/delusers",(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        const mobile = req.body.mobile;
        connection.query('DELETE FROM users WHERE mobile=?',mobile,function(error,deleted){
            if(deleted){
                res.json('successfully deleted');
            }else{
                res.json(error);
            }
            connection.release();
        })
    })
});

//USERS ORDERS
router.get('/userOrders', (req, res) => {
    try {
            
    database.getConnection(function(err,connection){
        if(err) throw err;
        // console.log("get orders reqest",Date.now())
     
        connection.query('select o.id,CONVERT_TZ(od.date,"+00:00","+05:30") as date,o.user_id,u.name,u.address,(p.title) as title,p.packet,\
        p.description,(p.price) as price,p.image,s.society_name,\
        (od.quantity) as quantityOrdered from orders_details as od\
            inner join orders as o on \
            o.id = od.order_id \
            inner join products as p on \
            p.id = od.product_id \
            inner join users as u on \
            u.id = o.user_id \
			inner join society s on \
			s.id = u.society\
			where employee_id =0 AND is_admin_edited=0 GROUP BY o.id order by o.id DESC',function(error,results){
                // console.log(error)
                if(results){
                    res.json(results)
                }else{
                    // res.json({message:"No orders found"})
                }
                connection.release();
            } )

            
       
        // console.log("get order response",Date.now())
    })
} catch (error) {
          console.log(error);  
}finally{
    // database.release();
}
});
// Get bill details on print page in admin panel
router.get('/adminBill', (req, res) => {
    try {
            
    database.getConnection(function(err,connection){
        if(err) throw err;
        // console.log("get orders reqest",Date.now())
     
        connection.query('select o.id,CONVERT_TZ(od.date,"+00:00","+05:30") as date,o.user_id,u.name,u.address,(p.title) as title,p.packet,\
        p.description,(p.price) as price,p.image,s.society_name,\
        (od.quantity) as quantityOrdered from orders_details as od\
            inner join orders as o on \
            o.id = od.order_id \
            inner join products as p on \
            p.id = od.product_id \
            inner join users as u on \
            u.id = o.user_id \
			inner join society s on \
			s.id = u.society\
			where adminStatus=1 and is_admin_edited=1 and employee_id =0 GROUP BY o.id order by o.id DESC',function(error,results){
                // console.log(error)
                if(results){
                    res.json(results)
                }else{
                    // res.json({message:"No orders found"})
                }
                // connection.release();
                // prev
            } )

            
       
        // console.log("get order response",Date.now())
        connection.release();
    })
} catch (error) {
          console.log(error);  
}finally{
	console.log("hsjf")
     // database.destroy();
}
});

//Delete Orders
router.post("/delOrders",(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        const order_id = req.body.id;
        connection.query('call restore_quantity('+order_id+')',function(error,deleted){
            if(deleted){
                res.json('successfully removed');
            }else{
                res.json(error);
            }
            connection.release();
        })
    })
});
//ASIGN ORDERS TO EMPLOYEE
router.post('/assignOrders',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        // var sql='UPDATE products SET employee_id=? where id=?';
        console.log("body",req.body);
            employee_id = req.body.employee_id;
            order_id = req.body.order_id;
        
        connection.query('UPDATE orders_details SET employee_id='+employee_id+' WHERE order_id='+order_id+';',function(error,results){
            console.log("assign",results);
            console.log("error",error);
            if(results){
                res.json({message:'Order Assigned'});
                connection.query('SELECT token FROM employee where id='+employee_id+';',function(error,token){
                    if(token[0].token != null){
                        //notification
                        // admin.initializeApp({
                        //     credential: admin.credential.cert(serviceAccount),
                        //     databaseURL: 'https://homease-5858.firebaseio.com'
                        // });

                       var registrationToken = token[0].token;
                        console.log("testToken1",token)
                        console.log("Token at 0:",token[0].token)
                
                        var payload = {
                            notification: {
                                // title: "Order",  
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
                        // }
                                    // end log
                               
                    }else{
                        console.log("error",error)
                    }
                });
            }else{
                res.json({message:'Order Not Assigned'});
            }
            // prev
        })
        connection.release();
    })
})
// Get order details for assigning order
router.get('/employeAssignOrders',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        connection.query('select * from orders_details where is_admin_edited=1 group by order_id',function(error,result){
            if(result){
                res.json(result)
            }else{
                console.log(error);
            }
connection.release();
        })
    })
})
//INVENTORY SECTION
router.post('/updateInventory',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;

        const id=req.body.id;
        const quantity=req.body.quantity;
        const price=req.body.price;
        console.log(req.body);
        connection.query('UPDATE products SET quantity=?,price=? WHERE id=?',[quantity,price,id],function(error,results){
            if(results){
                res.json(results);
                console.log(results);
            }else{
                res.json(error);
            }
            connection.release();
        })
    })
})
//Offer price
router.post('/updateOffer',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
console.log(req.body);
        const id=req.body.id;
        // const quantity=req.body.quantity;
        const offerPrice=req.body.offerPrice;
        const price =req.body.price;
        console.log(req.body);
        connection.query('UPDATE products SET offerPrice=?,price=? WHERE id=?',[price,offerPrice,id],function(error,results){
            if(results){
                res.json(results);
                console.log(results);
            }else{
                res.json(error);
            }
            connection.release();
        })
    })
})

//count daily orders
router.get('/dailyorder',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        connection.query('SELECT count(distinct order_id) as date FROM mega_shop.orders_details where date(CONVERT_TZ(date,"+00:00","+05:30"))= curdate();',
        function(error,results){
            if(results){
                res.json(results);
            }else{
                res.json(error);
            }
            connection.release();
        })
    })
})
// count total users
router.get('/totalusers',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        connection.query('SELECT COUNT(id) as id FROM users',function(error,results){
            if(results){
                res.json(results);
            }else{
                res.json(error);
            }
            connection.release();
        })
    })
});
// count total employess
router.get('/totalemployee',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        connection.query('SELECT COUNT(id) as id FROM employee',function(error,results){
            if(results){
                res.json(results);
            }else{
                res.json(error);
            }
            connection.release();
        })
    })
});

// get society details
router.get('/society',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        connection.query('select society_name,id from society',function(error,results){
            if (results) {
                res.json(results);
            }else{
                res.json('No Society Selected');
            }
            connection.release();
        })
    })
})

// society analytics data
router.post('/analytics',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        society= req.body.society;
        console.log(society);
        connection.query('select u.name,u.address,\
        (p.title) as products,count(p.title) as count\
         from mega_shop.orders_details  od \
            inner join mega_shop.orders  o on \
            o.id = od.order_id \
            inner join mega_shop.products p on \
            p.id = od.product_id \
            inner join mega_shop.users u on \
            u.id = o.user_id\
			inner join society s on \
            s.id=u.society \
            where u.society=? and adminStatus=1\
            group by p.title \
            order by count(p.title) desc',[society],function(error,results){
                if(results){
                    res.json(results);
                }else{
                    res.json('Not Found');
                }
                connection.release();
            })
    })
})

// Admin update order i.e accept order
router.post('/adminUpdate',(req,res)=>{
    try {
    database.getConnection(function(err,connection){
      if(err) throw err;
    //   var t0 = performance.now()
    //    doSomething() 
    console.time("time")
      console.log("admin request",Date.now())
    //   try catch starts

      console.log(req.body)
      console.log("l",req.body.length);
      for(var x=0;x<req.body.length;x++)
      {
        let id = req.body[x].id
        let primaryId = req.body[x].new
        connection.query('update orders_details set adminStatus=1 \
        where order_id=? AND id=?;',[id,primaryId]
        ,function(error,results){
          console.log(results); 
          console.log(error); 
          if (results) {
                // res.json(results)
          }
        //   connection.release();
        });
      }
            let id = req.body[0].id
             connection.query('call restore_quantity('+id+')',function(error,restore){
                 console.log("stored procedure",error)
                 if (restore) {
                     res.json("ok");
                       //for sending notification to user
            connection.query('select u.token from orders_details od \
            inner join orders  o on \
            o.id = od.order_id \
            inner join users u on \
            u.id = o.user_id \
            where od.order_id='+id+';',function(error,token){
                if(token[0].token != null){
                    // res.json(token)
                    // send notification log
                    
// sendUserNotification(token) {

    // if (!this.firebaseService) {
        // admin.initializeApp({
        //     credential: admin.credential.cert(serviceAccount),
        //     databaseURL: 'https://homease-5858.firebaseio.com'
        // });
        // this.firebaseService = true;
    // }
    // let testtoken='efhzNZI_Rs-Lu3mRfCHD6L:APA91bGzgsR3Sb4XAKEjaYB0AZQKM3lvbwN9iDTA5DVx_HDh1yCsImLN-OGBMma0XaCNIn5vQvFyGl0R8oTyZR8j3YeWJq7RCx1FLTpqhunV0REFCRaEf9dxyXIOB-gJL0jsNJsY5E43'
        var registrationToken = token[0].token;
        // console.log("testToken1",token)
        // console.log("Token at 0:",token[0].token)

        var payload = {
            notification: {
                title: " ",  
                body: "Your order has been accepted",
                sound: "default",
                // foreground: true,
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
        // }
                    // end log
                    
                }else{console.log("token else",error)}
                 
            })
                 }else{
                     res.json(error);
                }
                connection.release();
             });
          
            
console.log("admin response",Date(Date.now()))
console.timeEnd("time")
  })
} catch (test) {
    console.log("test",test);       
 }
 finally{
    //  connection.release();
 }
})
// Get bill details for order update
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
        connection.query('select od.price,od.id as new,od.userNotes,od.date,w.type,p.packet,s.society_name,\
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
        where o.id= '+orderId+' AND adminStatus!=1;', function (error, results, fields) {
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

//Bill during order assign this bill goes to customer
router.get('/print/:orderId',(req, res) => {
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
            connection.query('select od.price,od.id as new,CONVERT_TZ(od.date,"+00:00","+05:30") as date,\
            w.type,p.packet,s.society_name,u.name,p.id as productId,u.mobile as mobile,u.address,o.id,\
            o.user_id,p.title as products,p.description,p.image,od.quantity as quantityOrdered from orders_details  od \
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
            where o.id= '+orderId+' AND adminStatus=1;', function (error, results, fields) {
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

//After employee Deliver get all orders
router.get('/finalOrders', (req, res) => {
    try {
            
    database.getConnection(function(err,connection){
        if(err) throw err;
        // console.log("get orders reqest",Date.now())
     
        connection.query('select o.id,CONVERT_TZ(od.order_delivery_time,"+00:00","+05:30") as orderDeliverTime,o.user_id,u.name,u.address,(p.title) as title,p.packet,\
        p.description,(p.price) as price,p.image,s.society_name,\
        (od.quantity) as quantityOrdered from orders_details as od\
            inner join orders as o on \
            o.id = od.order_id \
            inner join products as p on \
            p.id = od.product_id \
            inner join users as u on \
            u.id = o.user_id \
			inner join society s on \
			s.id = u.society\
			where final_orderStatus=1 AND deliveryStatus=1 GROUP BY o.id order by o.id DESC',function(error,results){
                // console.log(error)
                if(results){
                    res.json(results)
                }else{
                    // res.json({message:"No orders found"})
                }
                connection.release();
            } )

            
       
        // console.log("get order response",Date.now())
    })
} catch (error) {
          console.log(error);  
}finally{
    // database.release();
}
});	
//Final bill After employee Deliver get all orders
router.get('/finalInvoice/:orderId',(req, res) => {
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
            connection.query('select od.price as price,od.id as new,CONVERT_TZ(od.date,"+00:00","+05:30") as date,\
            w.type,p.packet,s.society_name,u.name,p.id as productId,u.mobile as mobile,u.address,o.id,\
            o.user_id,p.title as products,p.description,p.image,od.quantity as quantityOrdered from orders_details  od \
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
            where o.id= '+orderId+' AND final_orderStatus=1 AND deliveryStatus=1;', function (error, results, fields) {
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
// send offer noification to user
router.post('/offerNotification',(req,res)=>{
    database.getConnection(function(error,connection){
        if(error) throw error;
        body=req.body.body;
        title=req.body.title;
        image=req.body.imageName
        connection.query('select token from users where token !="null"',function(err,token){
            if (token) {
                res.json("ok");
                for (let x = 0; x < token.length; x++) {
                    console.log("token",token[x].token)
                    // token.forEach(element=>{
                        // console.log("1",element.token)
                        // sendUserNotification
        
        //  var registrationToken = token[x].token;
            // token send start

            
            var payload = {
                notification: {
                    title: req.body.title,  
                    body: req.body.body,
                    sound: "default",
                    image: req.body.imageName,
                },
            };
            console.log("payload",payload)
            var options = {
                priority: "high",
                timeToLive: 60 * 60 * 24
            };
             admin.messaging().sendToDevice(token[x].token, payload, options)
                .then(function (response) {
                    console.log("Successfully sent message:", response);
                    console.log("test",response.results.error)
                })
                .catch(function (error) {
                    console.log("Error sending message:", error);
                });
                
        
                       // token logic
                }

            } else {
                console.log(err)
            }
connection.release();
        })
    })
})

// Offer notification page data
router.get('/imageName',(req,res)=>{
    database.getConnection(function(err,connection){
      if (err) throw err;
      connection.query('select * from offer',function(error,results){
        if (results) {
          res.json(results);
        }else{
          res.json('None');
        }
        connection.release();
      })
    })
  })
// society update data
  router.post('/updatesociety',(req,res)=>{
      database.getConnection(function(err,connection){
          if(err) throw err;
          id= req.body.society_id;
          society= req.body.society;
          console.log(req.body)
          connection.query('update society set society_name="'+society+'"where id="'+id+'";',function(error,result){
            if(result){
                res.json("ok")
            }  
            connection.release();
          })
      })
  });
// new society insert
  router.post('/newsociety',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        // id= req.body.society_id;
        society= req.body.society;
        connection.query('insert into society set society_name="'+society+'";',function(error,result){
          if(result){
              res.json("ok")
          }  
          connection.release();
        })
    })
});
// carousel insert
router.post('/carousel', (req,res)=>{ 
    console.log("body",req.file);
    //console.log("File",req.file);
    upload(req,res,(err)=>{
        if(err){
            res.json({msg: err}
            )
        }
        else{        
            if(req.file == undefined){
                res.json({
                    msg:'Error : No image selected'
                })
            }
            else{
             database.getConnection(function(err,connection){
                 if(err) throw err;
                // console.log("title",title);
                imageName = req.body.name;
                 console.log("req.file.filename",req.file.filename);
                 connection.query('insert into carousel set image=?, imageName=?',
                 [req.file.filename,imageName],function(error,image_name){
                     console.log("image_name==",image_name);
                     console.log(error);
                     if(image_name)
                     {
                         res.json({
                             msg: image_name,
                            //  file: `http://localhost:5000/${req.file.filename}`,
                         });
                         console.log("res",res)
                     }else{
                         res.json({msg:'File not uploaded'})
                     }
                     connection.release();
                 });
             })
                
               // res.json(console.log(file))
                
            }
         //   console.log(req.file);
         //  res.send('check')
           // res.send(image_url=`http://localhost:1000/${req.file.filename}`)
        }
    })
     // res.send('check')
});
// carousel data display 
router.get('/getCarousel',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        connection.query('select * from carousel',function(error,result){
            if(result){
                res.json(result);
            }else{
                console.log(error)
            }
connection.release();
        })
    })
})
// carousel delete
router.post('/delCarousel',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        id=req.body.id;
        connection.query('DELETE FROM carousel WHERE id=?',id,function(error,result){
            if(result){
                res.json(result);
            }else{
                console.log(error)
            }
connection.release();
        })
    })
})

router.post('/delOffer',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        id=req.body.id;
        connection.query('DELETE FROM offer WHERE id=?',id,function(error,result){
            if(result){
                res.json(result);
            }else{
                console.log(error)
            }
connection.release();
        })
    })
})
// In Stock update
router.post('/inStock',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        let id = req.body.id;
        connection.query('update products set stock_flag=0 where id=?',id,function(error,result){
            if(result){
                res.json("success")
            }else{
                console.log(error)
            }
            connection.release();
        })
    })
});
// Out of Stock update
router.post('/outOfStock',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        let id = req.body.id;
        connection.query('update products set stock_flag=1 where id=?',id,function(error,result){
            if(result){
                res.json("success")
            }else{
                console.log(error)
            }
            connection.release();
        })
    })
})

module.exports = router