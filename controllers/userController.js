const userHelpers = require('../helpers/userHelpers')
const jwt = require('jsonwebtoken');

module.exports={
    getAvailableServices:((req, res)=>{
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
        userData = req.body;
        userHelpers.createUser(userData).then((response)=>{
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
        loginData = req.body
        userHelpers.userLogin(loginData).then((response)=>{
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
    }),
    addtoCart:((req, res)=>{
        let userDetails = req.body.user
        let serviceId = req.body.id
        let bookingDetails = req.body.bookingDetails
        userHelpers.AddToCart(userDetails, serviceId, bookingDetails).then((response)=>{
            res.json({status:'done'})
        })
    }),
    removetoCart:((req, res)=>{
        let userDetails = req.body.user
        let serviceId = req.body.id
        let bookingDetails = req.body.bookingDetails
        userHelpers.RemoveToCart(userDetails, serviceId, bookingDetails).then((response)=>{
            res.json({status:'done'})
        })
    }),
    userCart:((req, res)=>{
        let userID = req.body.userID
        userHelpers.getUserCarts(userID).then((response)=>{
            if(response){
                let services = response.services
                let allData = response
                res.json({status:'done', data:allData, services:services})
            }else{
                res.json({status:'err', data:'**user cart is empty'})
            }
        })
    }),
    cartQtyDec:((req, res)=>{
        let serviceID = req.body.data
        let userID = req.body.user.userID
        userHelpers.userCartQtyDec(serviceID, userID).then((response)=>{
            res.json({status:'done'})
        })
    }),
    cartQtyInc:((req, res)=>{
        let serviceID = req.body.data
        let userID = req.body.user.userID
        userHelpers.userCartQtyInc(serviceID, userID).then((response)=>{
            res.json({status:'done'})
        })
    }),
    dateConfirm:((req, res)=>{
        let userId = req.body.user.userID
        let bookingDetails = req.body.bookingDetails
        userHelpers.dateConfirmation(userId, bookingDetails).then((response)=>{
            if(response.done){
                console.log('date fix done');
                res.json({status:'done'})
            }
            if(response.err){
                res.json({status:'err'})
            }
        })
    }),
    userForm:((req, res)=>{
        let formData = req.body.data
        let user = req.body.user
        userHelpers.userFromData(user, formData).then((response)=>{
            res.json({status:'done'})
        })
    }),
    getUserForm:((req, res)=>{
        let userID = req.body.userID
        userHelpers.getUserFromData(userID).then((response)=>{
            res.json({status:'done', data:response})
        })
    }),
    bookingConfirm:((req, res)=>{
        let user = req.body.user
        let bookingDetails = req.body.cartData
        let FinalAmount = req.body.finalAmount
        console.log(req.body);
        userHelpers.getUserFromData(user.userID).then((form)=>{
            if(form){
                userHelpers.bookingSubmit(user, bookingDetails, FinalAmount, form).then((response)=>{
                    let bookingID = response._id
                    userHelpers.removeCart(user).then((response)=>{
                        res.json({status:'done', data:bookingID})
                    })
                })
            }else{
                res.json({status:'err', data:'***Please fill your form'})
            }
        })
    }),
    getInvoice:((req, res)=>{
        console.log(req.body);
        let bookingID = req.body.invoiceID
        if(!bookingID){
            res.json({status:'err'})
        }
        userHelpers.getBookingData(bookingID).then((data)=>{
            res.json({status:'done', data:data})
        })
    }),
    getUserServices:((req, res)=>{
        const userId = req.params.id
        userHelpers.getServices(userId).then((response)=>{
            if(response){
                res.json({status:'done', data:response})
            }else{
                res.json({status:'err'})
            }
        })
    }),
    getUserCart:((req, res)=>{
        const userId = req.params.id
        userHelpers.getCart(userId).then((response)=>{
            if(response){
                res.json({status:'done', data:response})
            }else{
                res.json({status:'err'})
            }
        })
    }),
    getInvoiceDetails:((req, res)=>{
        const id = req.params.id
        console.log(id);
        userHelpers.getBookingData(id).then((data)=>{
            res.json({status:'done', data:data})
        })
    })
}