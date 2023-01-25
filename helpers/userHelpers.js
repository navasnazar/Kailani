const bcrypt = require('bcrypt')
const ServiceDB = require('../models/adminModel/serviceSchema')
const objectId=require('mongodb').ObjectId
const UserDB = require('../models/userModel/userSchema')
const jwt = require('jsonwebtoken');


module.exports={
    findServices:((data)=>{
        return new Promise(async(resolve, reject)=>{
            await ServiceDB.find().then((value)=>{
                if(value){
                    resolve(value)
                }else{
                    const text = 'data not fount'
                    resolve(text)
                }
            }).catch((err)=>{
                console.log(err);
            })
        })
    }),
    createUser:(userData)=>{
        let validation = {email:false, mobile:false, done:false}
        return new Promise(async(resolve, reject)=>{
            userData.password = await bcrypt.hash(userData.password,10),
            await UserDB.findOne({email:userData.email}).then((data)=>{
                console.log(data);
                if(data){
                    validation.email=true;
                    console.log('user already exist');
                    resolve(validation)
                }else{
                    let new_user = new UserDB({
                        email: userData.email,
                        password: userData.password,
                        name: userData.nickname,
                        mobile: userData.phone,
                        blockStatus: false,
                    })
                    new_user.save().then((response)=>{
                        validation.done=true
                        resolve(validation)
                    })
                }
            })
        })
    },
    userLogin:(loginData)=>{
        let validation = {
            done: false,
            blockStatus: false,
            notRegister: false,
            passErr: false
            }
        return new Promise(async(resolve, reject)=>{
            await UserDB.findOne({email:loginData.username}).then(async(userDetails)=>{
                console.log(userDetails);
                if(!userDetails){
                    validation.notRegister=true
                    resolve([validation])
                }else{
                    if(userDetails.blockStatus){
                        validation.blockStatus=true
                        resolve([validation])
                    }else{
                       await bcrypt.compare(loginData.password, userDetails.password).then((status)=>{
                            console.log('zzz:',status);
                            if(status){
                                console.log('login success')
                                validation.done=true
                                const token = jwt.sign({user:userDetails.email, userID:userDetails._id},"secret111")
                                console.log('token:',token);
                                resolve([validation,token])
                            }else{
                                console.log('login failed')
                                validation.passErr=true
                                resolve([validation])
                            }
                        })
                    }
                }
            }).catch((err)=>{
                console.log(err);
            })
        })
    },
    userDetails:(userId)=>{
        return new Promise(async(resolve, reject)=>{
            await UserDB.findOne({_id: objectId(userId)}).then((data)=>{
                resolve(data)
            })
        })
    }
}