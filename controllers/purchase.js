const Razorpay=require('razorpay')
console.log("asshole")
const Order = require('../models/orders');
console.log(process.env.RAZORPAY_KEY_ID)
exports.purchaserpremium =async(req,res) =>{
    try{
        var rzp=new Razorpay({
            key_id:process.env.RAZORPAY_KEY_ID,
            key_secret:process.env.RAZORPAY_KEY_SECRET
        })
        const amount=2500
        console.log(process.env.RAZORPAY_KEY_ID);
        console.log(process.env.RAZORPAY_KEY_SECRET);

        rzp.orders.create({amount,currency:"INR"},(err,order)=>{
            if(err){
                console.log("shitty error")
                console.log("Razorpay API error:", err.error);
                throw new Error(JSON.stringify(err))
            }
            req.user.createOrder({orderid:order.id,status:'PENDING'}).then(()=>{
                return res.status(201).json({order,key_id:rzp.key_id})
            }
            ).catch(err=>{
                console.log("dirty error")
                throw new Error(err)

            })
        })
    }catch(err){
        console.log(err)
        res.status(403).json({message:'Something went wrong',error:err})
    }
}

exports.updatetransactionstatus = async (req, res) => {
    try {
        const { payment_id, order_id } = req.body;
        const order = await Order.findOne({ where: { orderid: order_id } });

        const promise1 = order.update({ paymentid: payment_id, status: 'SUCCESSFUL' });
        const promise2 = req.user.update({ ispremiumuser: true });

        Promise.all([promise1, promise2])
            .then(() => {
                return res.status(202).json({ success: true, message: "Transaction Successful" });
            })
            .catch((err) => {
                console.error(err);
                // Update the order status to 'FAILED'
                Order.findOne({ where: { orderid: order_id } })
                    .then(() => {
                         order.update({ paymentid: payment_id, status: 'FAILED' });
                    })
                    .catch((error) => {
                        console.error("Error updating order status to 'FAILED':", error);
                    });

                throw new Error(err);
            });
    } catch (err) {
        console.log(err);
        res.status(403).json({ success: false, message: "Something went wrong" });
    }
};