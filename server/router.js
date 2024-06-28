let router = require("express").Router();
const { storeItems } = require('./utils');

const { STRIPE_PRIVATE_KEY, CLIENT_APP_URL } = require('./env_exports');
const stripe = require('stripe')(STRIPE_PRIVATE_KEY);

module.exports = app => {
  router.get("/test", (req, res) => { res.send('Server is running!'); });
  router.post("/checkout", async (req, res) => {
    try {
      const item = req.body;
      const storeItem = storeItems.get(item.id);
      const lineItems = [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      ];

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${CLIENT_APP_URL}/success`,
        cancel_url: `${CLIENT_APP_URL}/cancel`,
      });

      res.json({ url: session.url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.post("/subscribe", async (req, res) => {
    try {
      const lookup_key = req.body.lookup_key;
      const quantity = req.body.quantity;
      // console.log("lookup_key===>", lookup_key);

      // const allProducts = await stripe.products.list();
      // console.log("Products List===>", allProducts);
      const prices = await stripe.prices.list({
        lookup_keys: [lookup_key],
        expand: ['data.product'],
      });

      // let stripeCustomer = await stripe.customers.list({
      //   email: user.email,
      //   limit: 1,
      // });
      // let stripeCustomers = await stripe.customers.list({
      //   email: "test_payment21@gmail.com",
      //   limit: 1,
      // });
      // stripeCustomers = await stripe.customers.create({
      //   email: "test_payment21@gmail.com",
      //   name: "test_payment21",
      //   description: "test",
      //   payment_method: 'pm_card_visa',
      //   invoice_settings: {
      //     default_payment_method: 'pm_card_visa',
      //   },
      // });
      // console.log("stripeCustomer===>", stripeCustomers);

      // console.log("prices===>", prices);
      const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
        // payment_method_types: ['card'],
        // default_payment_method: 'pm_card_visa',
        line_items: [
          {
            // price_data: {
            //   currency: 'usd',
            //   product_data: {
            //     name: storeItem.name,
            //   },
            //   unit_amount: price,
            // },
            price: prices.data[0].id,
            quantity: quantity,
          },
        ],
        mode: 'subscription',
        success_url: `${CLIENT_APP_URL}/?success=true&session_id={CHECKOUT_SESSION_ID}&email={CHECKOUT_SESSION_CUSTOMER_EMAIL}`,
        // success_url: "",
        cancel_url: `${CLIENT_APP_URL}/?canceled=true`,
      });

      res.json({ url: session.url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.post("/portal", async (req, res) => {
    const { user_email } = req.body;
    try {
      const stripCustomer = await stripe.customers.list({
        email: user_email,
      });
      console.log("stripCustomer===>", stripCustomer);
      // This is the url to which the customer will be redirected when they are done
      // managing their billing with the portal.
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: stripCustomer.data[0].id,
        // line_items: [
        //   {
        //     price: "price_1JQ2m6JZ8dJ7JZ7h5yYz4j3A",
        //     quantity: 1,
        //   },
        // ],
        return_url: CLIENT_APP_URL,
      });
      // console.log("portalSession===>", portalSession);
      res.json({ url: portalSession.url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  // router.get("/chat_history", chatController.getMessageHistory);
  return router;
}