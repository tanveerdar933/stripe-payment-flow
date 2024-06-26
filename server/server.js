const express = require('express');
const cors = require("cors");
const app = express();
const { STRIPE_PRIVATE_KEY, PORT, CLIENT_APP_URL } = require('./env_exports');
const stripe = require('stripe')(STRIPE_PRIVATE_KEY);
let corsOptions = {
  origin: "*", //http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(express.json());

const storeItems = new Map([
  [1, { priceInCents: 10000, name: 'Learn React Today' }],
  [2, { priceInCents: 20000, name: 'Learn CSS Today' }],
]);

app.get('/api/test', (req, res) => {
  res.send('Server is running!');
});

app.post('/api/checkout', async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});