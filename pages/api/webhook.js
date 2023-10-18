import { Stripe } from "@stripe/stripe-js";
import { buffer } from "micro";

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};

const webhookHandler = async(req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    if(res.method === 'POST'){
        const buf = await buffer(req)
        const sig = req.headers['stripe-signature']
        const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET

        let event;
        try {
            if(!sig || !webhookSecret) return;
            event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
        }
        catch(err){
            console.log(`Webhook error: ${err.message}`)
            return res.status(400).send(`Webhook error: ${err.message}`)
        }

        console.log('event', event)
        res.status(200).send();
    }
}

export default webhookHandler;