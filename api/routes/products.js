const express = require('express');
const multer = require('multer')
const path = require('path')
const router = express.Router();
const database = require('../config/helpers');
const { extname } = require('path');
const { json } = require('express');
//const { title } = require('process');

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

/* GET ALL PRODUCTS */
router.get('/', function (req, res) {       // Sending Page Query Parameter is mandatory http://localhost:3636/api/products?page=1
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 2;   // set limit of items per page
    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit;     // 0, 10, 20, 30
        endValue = page * limit;                  // 10, 20, 30, 40
    } else {
        startValue = 0;
        endValue = 10;
    }
        database.getConnection(function(err, connection) {
            if (err) throw err; // not connected!
          
            // Use the connection
            connection.query('select c.title as category, w.type as weight,p.stock_flag, \
            p.title as name, p.price,p.offerPrice, p.quantity, p.description, p.image, p.id,p.packet from products \
             p inner join categories c on \
             c.id = p.cat_id inner join weight w on \
             w.id = p.type_id order by p.id desc;', function (error, results, fields) {
              if (results.length > 0) {
                res.status(200).json({
                    count: results.length,
                    products: results
                });
            } else {
                res.json({message: "No products found"});
            }      
            connection.release();
              // Handle error after the release.
              if (error) throw error;
          
              // Don't use the connection here, it has been returned to the pool.
            });
          });
        });

/* GET FRUITS PRODUCTS */
router.get('/fruits', function (req, res) {       // Sending Page Query Parameter is mandatory http://localhost:3636/api/products?page=1
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 2;   // set limit of items per page
    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit;     // 0, 10, 20, 30
        endValue = page * limit;                  // 10, 20, 30, 40
    } else {
        startValue = 0;
        endValue = 10;
    }
        database.getConnection(function(err, connection) {
            if (err) throw err; // not connected!
          
            // Use the connection
            connection.query('select c.title as category, w.type as weight, p.stock_flag,\
            p.title as name,p.offerPrice, p.price, p.quantity, p.description, p.image, p.id,p.packet from products \
             p inner join categories c on \
             c.id = p.cat_id inner join weight w on \
             w.id = p.type_id \
             where c.title="fruits"', function (error, results, fields) {
              if (results.length > 0) {
                res.status(200).json({
                    count: results.length,
                    products: results
                });
            } else {
                res.json({message: "No products found"});
            }     
            connection.release(); 
              // Handle error after the release.
              if (error) throw error;
          
              // Don't use the connection here, it has been returned to the pool.
            });
          });
        });

/* GET VEGETABLES PRODUCTS */
router.get('/vegetables', function (req, res) {       // Sending Page Query Parameter is mandatory http://localhost:3636/api/products?page=1
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 2;   // set limit of items per page
    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit;     // 0, 10, 20, 30
        endValue = page * limit;                  // 10, 20, 30, 40
    } else {
        startValue = 0;
        endValue = 10;
    }
        database.getConnection(function(err, connection) {
            if (err) throw err; // not connected!
          
            // Use the connection
            connection.query('select c.title as category, w.type as weight, p.stock_flag,\
            p.title as name,p.offerPrice, p.price, p.quantity, p.description, p.image, p.id,p.packet from products \
             p inner join categories c on \
             c.id = p.cat_id inner join weight w on \
             w.id = p.type_id \
             where c.title="vegetables"', function (error, results, fields) {
              if (results.length > 0) {
                res.status(200).json({
                    count: results.length,
                    products: results
                });
            } else {
                res.json({message: "No products found"});
            }     
            connection.release(); 
              // Handle error after the release.
              if (error) throw error;
          
              // Don't use the connection here, it has been returned to the pool.
            });
          });
        });

        router.get('/dairy', function (req, res) {       // Sending Page Query Parameter is mandatory http://localhost:3636/api/products?page=1
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 2;   // set limit of items per page
    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit;     // 0, 10, 20, 30
        endValue = page * limit;                  // 10, 20, 30, 40
    } else {
        startValue = 0;
        endValue = 10;
    }
        database.getConnection(function(err, connection) {
            if (err) throw err; // not connected!
          
            // Use the connection
            connection.query('select c.title as category, w.type as weight, p.stock_flag,\
            p.title as name,p.offerPrice, p.price, p.quantity, p.description, p.image, p.id,p.packet from products \
             p inner join categories c on \
             c.id = p.cat_id inner join weight w on \
             w.id = p.type_id \
             where c.title="dairy"', function (error, results, fields) {
              if (results.length > 0) {
                res.status(200).json({
                    count: results.length,
                    products: results
                });
            } else {
                res.json({message: "No products found"});
            }     
            connection.release(); 
              // Handle error after the release.
              if (error) throw error;
          
              // Don't use the connection here, it has been returned to the pool.
            });
          });
        });

/* GET ONE PRODUCT*/
router.get('/:id', (req, res) => {
    let productId = req.params.id;
    console.log(productId);
    database.query('SELECT c.title as category,p.title as name,p.price,p.quantity,p.description,p.image,p.id,p.images \
    FROM products p  inner join categories c on c.id = p.cat_id WHERE p.id=?',[productId], async function(err,prod){
        console.log(prod);
       // return res.json(results)
        if (prod) {
        //  return res.send(results)
           res.status(200).json(prod);
        } else {
            res.json({message: `No product found with id ${productId}`});
        }
        connection.release();
    })
});

router.get('/cat/category',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        connection.query('select c.title as category,c.id from categories c',function(eror,results){
           // console.log(results);
            if(results){
                res.json(results)
            }
            connection.release();
        })
    })
})
router.get('/cat/weight',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        connection.query('select w.type,w.id from weight w',function(eror,results){
           // console.log(results);
            if(results){
                res.json(results)
            }
            connection.release();
        })
    })
})
/* ADD PRODUCT*/
router.post('/addfruit', (req,res)=>{ 
    console.log("body",req.body);
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
                // const image =req.file;
                // console.log("image",image);
                 const title = req.body.title;
                 const price = req.body.price;
                 const packet = req.body.packet;
                 const quantity = req.body.quantity;
                 const type_id = req.body.type_id
                // console.log("title",title);
                 console.log("req.file.filename",req.file.filename);
                 connection.query('insert into products set cat_id=1, image=?, title=? ,price=?, packet=?, quantity=?,type_id=?',
                 [req.file.filename,title,price,packet,quantity,type_id],function(error,image_name){
                     console.log("image_name==",image_name);
                     console.log(error);
                     if(image_name)
                     {
                         res.json({
                             msg: image_name,
                             file: `http://localhost:5000/${req.file.filename}`,
                         });
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

router.post('/addvegetable', (req,res)=>{ 
    console.log("body",req.body);
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
                // const image =req.file;
                // console.log("image",image);
                 const title = req.body.title;
                 const price = req.body.price;
                 const packet = req.body.packet;
                 const quantity = req.body.quantity;
                 const type_id = req.body.type_id
                // console.log("title",title);
                 console.log("req.file.filename",req.file.filename);
                 connection.query('insert into products set cat_id=2, image=?, title=? ,price=?, packet=?, quantity=?,type_id=?',
                 [req.file.filename,title,price,packet,quantity,type_id],function(error,image_name){
                     console.log("image_name==",image_name);
                     console.log(error);
                     if(image_name)
                     {
                         res.json({
                             msg: image_name,
                             file: `http://localhost:5000/${req.file.filename}`,
                         });
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
router.post('/adddairy', (req,res)=>{ 
    console.log("body",req.body);
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
                // const image =req.file;
                // console.log("image",image);
                 const title = req.body.title;
                 const price = req.body.price;
                 const packet = req.body.packet;
                 const quantity = req.body.quantity;
                 const type_id = req.body.type_id
                // console.log("title",title);
                 console.log("req.file.filename",req.file.filename);
                 connection.query('insert into products set cat_id=3, image=?, title=? ,price=?, packet=?, quantity=?,type_id=?',
                 [req.file.filename,title,price,packet,quantity,type_id],function(error,image_name){
                     console.log("image_name==",image_name);
                     console.log(error);
                     if(image_name)
                     {
                         res.json({
                             msg: image_name,
                             file: `http://localhost:5000/${req.file.filename}`,
                         });
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

//DELETE FRUITS
router.post('/delfruit',(req,res)=>{
    database.getConnection(function(err,connection){
        if(err) throw err;
        const id = req.body.id;
        connection.query('DELETE FROM products WHERE id=?',id,function(error,deleted){
            if(deleted){
                res.json(deleted);
            }else{
                res.json(error);
            }
            connection.release();
        })
    })
})

router.post('/updateAddress', async (req, res) => {
//     let userId = req.body.userId;
//     let userAddress = req.body.address;     // Get the User ID from the parameter
// console.log(userAddress)
  // Search User in Database if any
  database.getConnection(function(err,connection){
      if(err) throw err;
      let userId = req.body.userId;
      console.log(userId);
    let userAddress = req.body.address;     
console.log(userAddress)
      connection.query('select * from users where id='+userId+'',function(error,results){
          if(results){
              console.log("TEST:",results);
              connection.query('UPDATE users SET address ="'+userAddress+'" WHERE id='+userId+';',
              function(error,update){
                  if(update){
                    res.json('Address Updated Successfully')
                  }
                  else{
                      console.log(error);
                      res.json('Address Not Updated Successfully')
                  }
                  
              })
          }else{console.log(error);}
          connection.release();
      })
  })
    // let user = await database.table('users').filter({id: userId}).get();
   
    // if (user) {
       
    //     console.log(userAddress)
    //     // Replace the user's information with the form data ( keep the data as is if no info is modified )
    //     database.table('users').filter({id: userId}).update({
    //         address: userAddress !==undefined ? userAddress : user.address
    //     }).then(result => res.json('Address updated successfully')).catch(err => res.json(err));
    // }
});

router.post('/offer', (req,res)=>{ 
    console.log("body",req.body);
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
                 console.log("req.file.filename",`http://localhost:5000/${req.file.filename}`);
                 connection.query('insert into offer set image=?',
                 [`http://ec2-65-0-91-147.ap-south-1.compute.amazonaws.com/${req.file.filename}`],function(error,image_name){
                     console.log("image_name==",image_name);
                     console.log(error);
                     if(image_name)
                     {
                         res.json({
                             msg: image_name,
                             file: `http://localhost:5000/${req.file.filename}`,
                         });
                     }else{
                         res.json({msg:'File not uploaded'})
                     }
                     connection.release();
                 });
             })
                
            }
        }
    })
     // res.send('check')
});

module.exports = router;
