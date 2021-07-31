const express = require('express');
const multer = require('multer')
const path = require('path')
const router = express.Router();
const database = require('../config/helpers');
const { extname } = require('path');

var admin = require('firebase-admin');


//storage
const storage = multer.diskStorage({
    destination: './upload/',
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
}).single('chk');
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
//router.use(express.static('./upload'))
//EMPLOYEE ID GET ORDERS
router.post('/getOrders', (req, res) => {
    database.getConnection(function(err,connection){
        if(err) throw err;
        console.log("body",req.body);
         employee_id = req.body.id;
         console.log(employee_id)
        connection.query('select u.name,left(s.society_name,10) as society_name,u.mobile,o.id,o.user_id,left(u.address,10) as address, \
        group_concat(p.title) as products,p.description,sum(p.price) as price, \
        p.image,group_concat(od.quantity) as quantityOrdered from orders_details  od \
            inner join orders  o on \
            o.id = od.order_id \
            inner join products p on \
            p.id = od.product_id \
            inner join users u on \
            u.id = o.user_id \
            inner join society s on s.id=u.society\
            where od.employee_id='+employee_id+' AND final_orderStatus != 1 AND adminStatus=1\
            group by o.id',function(error,results){
                if(results){
                    res.json(results)
                }else{
                    res.json({message:"No orders found"})
                }
                connection.release();
            } )
    })
});
//EMPLOYEE LOGIN
router.post('/emplogin',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
          const  mobile= req.body.mobile;
          const  password= req.body.password;
        //   token = req.body.token;
        console.log("login",req.body)
        connection.query('SELECT * FROM employee WHERE mobile=? AND password=?',[mobile,password],function(error,results){
            console.log(results);
            console.log(error);
            if(results.length > 0){
                res.json(results);
               
        // console.log(mobile);

            }else{
                res.json(error);
            }
            connection.release();
        })
    })
})
router.post('/getToken',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        console.log("token:",req.body);
          mobile= req.body.mobile;
        token = req.body.token;
        connection.query('UPDATE employee SET token="'+token+'" WHERE mobile='+mobile+';',
        function(error,result){
            if (result) {
                res.status(200)
            } else {
                console.log(error);
            }
            connection.release();
        });
    })
})
// Get Single Order
router.get('/order/:orderId',(req, res) => {
    // console.log("res",res);
    // console.log("req",req);
    // console.log(req.params);
    database.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
        console.log("err:",err)
        // console.log(err);
        let orderId = req.params.orderId;
        // console.log(orderId);
        // Use the connection
        connection.query('select od.price,od.id as single,od.order_id as new,u.name,w.type,p.packet,p.id as productId,u.mobile as mobile,u.address,o.id,o.user_id,p.title as products,p.image,od.quantity as quantityOrdered from orders_details  od \
        inner join orders  o on \
        o.id = od.order_id \
        inner join products p on \
        p.id = od.product_id \
        inner join weight w on\
        p.type_id = w.id\
        inner join users u on \
        u.id = o.user_id \
        where od.order_id= '+orderId+' AND adminStatus=1;', function (error, results, fields) {
           console.log("sing",results);
          if (results) {
              
            res.json(results); 
            // console.log("json:",res.json);
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

//ORDER DElIVER
router.post('/deliver',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        // console.log("emp requst time",Date.now());
        // try {
            // console.log("list id=>",req.body[0].id)
            // console.log("list productId=>",req.body[0].productId)
            // console.log("list payment=>",req.body[0].test.payment)
            // console.log("list employee_notes=>",req.body[0].test.employee_notes)
            // console.log("list body",req.body)

                for(var x=0;x<req.body.length;x++){
                    let id = req.body[x].id
                    let productId = req.body[x].productId
                    let payment = req.body[x].test.payment
                    let employee_notes = req.body[x].test.employee_notes
                connection.query('UPDATE orders_details SET deliveryStatus=1,payment="'+payment+'",notes="'+employee_notes+'"\
                 where order_id='+id+' AND product_id='+productId+';',function(error,delivered){
                    // if (delivered) {
						console.log("delivered",delivered)
                    // //   return  res.json(delivered)
                    // } else {
                        console.log("errrrr",error)
                    //     // res.json(error)
                    // }
                    
                })
                // console.log("test",id,productId)
                // console.log(payment,employee_notes);
            }
            
           

                connection.query('call restore_quantity_delivery('+req.body[0].id+');',function(error,finalstatus){
                   console.log("finalstatus",finalstatus)
                    if (finalstatus) {
                        res.json(finalstatus);
                        connection.query('select token from admin where id=1',function(err,token){
                            if(token[0].token != null){
                                console.log("admintoken",token)
                                var registrationToken = token[0].token;
                                console.log("testToken1",token)
                                console.log("Token at 0:",token[0].token)
                        
                                var payload = {
                                    notification: {
                                        title: "Employee",  
                                        body: "Order has been delivered",
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
                            }else{console.log("token error",err)}
                        })
                    } else {
                        res.json(error);
                    }
                    connection.release();
                })
                
            
    // } catch (emp) {
    //  console.log("emp",emp);       
    // }
    // console.log("emp response time",Date.now());
    })
})

router.post('/test',(req,res)=>{
   
    upload(req,res,(err)=>{
        const file = req.file;
        console.log(file);
        // if(err){
        //     res.status(400).json({
        //         msg: err
        //     })
        // }else{
            if(!file){
                res.status(200).json({
                    msg:'Error : No image selected'
                })
            }else{
             
                res.json({
                    msg: 'File Uploaded',
                    file: `http://localhost:5000/${req.file.filename}`,
                });
               // res.json(console.log(file))
                
            }
         //   console.log(req.file);
         //  res.send('check')
           // res.send(image_url=`http://localhost:1000/${req.file.filename}`)
        // }
    })
})

router.post('/notdelivered/return',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
       console.log("re",req.body)
      // console.log("product",req.body.id)
        for(var x=0;x<req.body.length;x++){
                    let id = req.body[x].id
                    let productId = req.body[x].productId
                    //let payment = req.body[x].test.payment
                    let employee_notes = req.body[x].notdelivered.employee_notes
                connection.query('UPDATE orders_details SET notes="'+employee_notes+'"\
                where order_id='+id+' AND product_id='+productId+';',function(error,delivered){
                    // if (delivered) {
                       console.log("delivered",delivered)
                    // //   return  res.json(delivered)
                    // } else {
                        console.log("errrrr",error)
                    //     // res.json(error)
                    // }
                    
                })
                 console.log("test",id,productId)
                 console.log(employee_notes);
            }
            
              connection.query('call restore_quantity_delivery('+req.body[0].id+');',function(error,finalstatus){
                   console.log("finalstatus",finalstatus)
                    if (finalstatus) {
                        res.json(finalstatus);
                        connection.query('select token from admin where id=1',function(err,token){
                            if(token[0].token !=null){
                                console.log("admintoken",token)
                                var registrationToken = token[0].token;
                                console.log("testToken1",token)
                                console.log("Token at 0:",token[0].token)
                        
                                var payload = {
                                    notification: {
                                        title: "Employee",  
                                        body: "Order has been return",
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
                            }else{console.log("token error",err)}
                        })
                    } else {
                        res.json(error);
                    }
                    connection.release();
                })
                
            
    // } catch (emp) {
    //  console.log("emp",emp);       
    // }
    // console.log("emp response time",Date.now());

             
                
    })
})

module.exports=router