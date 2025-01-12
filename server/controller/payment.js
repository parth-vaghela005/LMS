const express = require('express');
const Stripe = require('stripe');
// const router = express.Router();

const stripe = Stripe('sk_test_51QgJqmFPKYQHi6PnHqQhTjJp1aZMpkMA7WJegLc2wztU9z42SEwlTKz9nhPTOhUsT4yke7YPbGCRO7q97OGzHU8H005Ng1Z0Uz');

// Create a checkout session
const payment =  async (req, res) => {
  const { courseName, price, imageUrl } = req.body;
  // let courseName = "html"
  // let  price = 300
  // let  images = "https://res.cloudinary.com/dqec0poc7/image/upload/v1735743835/qdsnayewpikgpsfqkmwb.png"

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'INR',
            product_data: {
              name: courseName,
              images: [imageUrl],
            },
            unit_amount: price * 100, // Convert price to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url:"http://localhost:5173/",
      cancel_url: "http://localhost:5173/profile",
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  payment,
};
