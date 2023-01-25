const userHelpers = require('../helpers/userHelpers')
const jwt = require('jsonwebtoken');

module.exports={
    getAvailableServices:((req, res)=>{
        console.log(req.body);
        const data = req.body
        userHelpers.findServices(data).then((response)=>{
            if(response==='data not fount'){
                res.json({status:'Err'})
            }else{
                res.json({status:'done', data:response})
            }
        }).catch((err)=>{
            console.log(err);
        })
    }),
    signup:((req, res)=>{
        console.log(req.body);
        userData = req.body;
        userHelpers.createUser(userData).then((response)=>{
            console.log(response);
            if(response.email==true){
                res.json({status:'err', data:'***User already registered, Please login'})
            }
            if(response.done==true){
                res.json({status:'done', data:'signup successful'})
            }
        }).catch((err)=>{
            console.log(err);
        })
    }),
    login:((req, res)=>{
        console.log(req.body);
        loginData = req.body
        userHelpers.userLogin(loginData).then((response)=>{
            console.log(response);
            let [validation, token]= response
            if(validation.done){
                res.json({status:'done', user:token})
            }
            if(validation.blockStatus){
                res.json({status:'err', data:'***Blocked by Admin'})
            }
            if(validation.notRegister){
                res.json({status:'err', data:'***User not registered'})
            }
            if(validation.passErr){
                res.json({status:'err', data:'***Password not match'})
            }
        }).catch((err)=>{
            console.log(err);
        })
    }),
    getUserDetails:((req, res)=>{
        const userId = req.params.id
        userHelpers.userDetails(userId).then((response)=>{
            res.json({status:'done', data:response})
        }).catch((err)=>{
            console.log(err);
        })
    })
}