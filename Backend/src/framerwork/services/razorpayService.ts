import Razorpay from "razorpay";

export class RazorpayService {
    private RazorPay: Razorpay
    constructor() {
        this.RazorPay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET
        })

    }
}