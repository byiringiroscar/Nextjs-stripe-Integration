const handler = (req: any, res: any) => {
    if(req.method === 'GET'){
        res.status(200).json({
            publishableKey: process.env.STRIPE_PUBLIC_KEY
        });
    } else{
        res.status(405).end('Method not allowed');
    }

}

export default handler;