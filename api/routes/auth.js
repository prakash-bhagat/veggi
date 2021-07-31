const express = require('express');
const {check, validationResult, body} = require('express-validator');
const router = express.Router();
const helper = require('../config/helpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const  database  = require('../config/helpers');
const secret = "1SBz93MsqTs7KgwARcB0I0ihpILIjk3w";


// LOGIN ROUTE
router.post('/login',async (req, res) => {

     console.log("body",req.body);
    //  res.json({
    //    // token: token, 
    //     auth: true, 
    //     mobile: 7903776602,
    //     id:101,
    //     name:"Prakash",
    //     address:"something"
    // });

        database.getConnection(function(err, connection) {
			  const myPassword = req.body.password;
            const  myMobile = req.body.mobile;
             loginresult =false;
             passwordmatch =false;
             console.log("req!!!!",req.body)
// //const  token = req.body.token;

           connection.query('select mobile,id,name,address,password from users where mobile=?;',[myMobile], async function (error, results, fields) {
                  console.log(results);
                   if(results.length>0){
                   passwordmatch = await  bcrypt.compare(myPassword,results[0].password) ;
                   console.log("pm",passwordmatch)
                   console.log("hjkhjk",results[0].password)
                   if(passwordmatch === true){
                    res.json({
                        // token: token, 
                         auth: true, 
                         mobile: results[0].mobile,
                         id:results[0].id,
                         name:results[0].name,
                         address:results[0].address
                     });  
                   } else{
                       console.log("err",fields)
                        res.json({ auth: false}) 
                   }   
                }else{
                    console.log("err",error)
                     res.json({ auth: false}) 
                }
                });
                connection.release() 
            
    });
    });
//                  return  bcrypt.compare(myPassword,results[0].password,function(err, result) {
//          //            if (err) { throw (err); }
//                     console.log(result);
//                   if (result) {
                       
// res.json({
//        // token: token, 
//         auth: true, 
//         mobile: results[0].mobile,
//         id:results[0].id,
//         name:results[0].name,
//         address:results[0].address
//     });

//                     }
//                     else {
//                      return   res.json("Invalid credential");
//                     }  
              
//          })     
                // } 
                // else{
                // return	res.json("no user")
                // }
                 

// get token
router.post('/getToken',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err
        mobile= req.body.mobile;
        token=req.body.token;
        console.log(mobile);
        console.log(token);
        connection.query('UPDATE users SET token="'+token+'" WHERE mobile='+mobile+';',
        function(error,result){
            if (result) {
                res.status(200)
            } else {
                console.log(error);
            }
            connection.release();
        })
    })
})

// user check
router.post('/getnumber',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err
        mobile= req.body.mobile;
console.log(req.body)
        connection.query('select count(mobile) as mobile from users WHERE mobile='+mobile+';',
        function(error,result){
console.log(result)
            if (result) {
                res.json(result)
            } else {
                res.json(error);
            }
            connection.release();
        })
    })
})

async function genHash(salt, password) {
  return await new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, function(err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve({
          // salt: salt,
          password: password,
          // hash: hash
        });
      }
    });
  });
}

// REGISTER ROUTE
router.post('/register', async (req, res) => {
const pwd = await bcrypt.hash(req.body.password,10)
    database.getConnection(function(err,connection){
        if(err) throw err
console.log("reg",req.body)



// console.log("pp",pwd);
        const data={
			name: req.body.name,
            mobile: req.body.mobile,
			address: req.body.address,
            society: req.body.society,
            //username: mobile,
            password: pwd,
            role: 555,
        }        
// console.log("data",data)
        /**
         * ROLE 777 = ADMIN
         * ROLE 555 = CUSTOMER
         **/
         connection.query('INSERT INTO users SET ?', data, function (error, results, fields) {
            if (error) {throw error};
            // Neat!
            console.log(results);
            if (results) {
                console.log(results);
                res.status(201).json({message: 'Registration successful.'});
            } else {
               res.status(501).json({message: 'Registration failed.'});
           } 
connection.release();
          })       
    })
});


module.exports = router;
