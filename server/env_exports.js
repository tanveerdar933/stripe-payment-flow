require('dotenv').config();

module.exports = {
  // STRIPE_PRIVATE_KEY: process.env.STRIPE_PRIVATE_KEY || "sk_test_51OmYrpGQttMZ74vpfx7mZJRiPr5C9vZPyffSgSu6hOYgyoOfsYdLxAmfegWWTF2u8Zwo6pmidYFCw9fW7zdCA0nS00TvKSAtES",
  STRIPE_PRIVATE_KEY: process.env.STRIPE_PRIVATE_KEY || "sk_test_51PWXvSRreMyLHKW7suhs6USqnC2t8K1IQGW0IDxHSijNvDLNeL9hrOEkdL4ADQuHrG6khwSzUTFm6DTqCKoPIgcV00Sohw4t8t",
  STRIPE_ENDPOINT_SECRET: "whsec_f4515a12f452ea400295e90c0a9d9fc19840697cdca3e2d3f3314b28c204b57d",
  CLIENT_APP_URL: process.env.CLIENT_APP_URL || "http://localhost:5173",
  PORT: process.env.PORT || 8000,
  CORS_OPTIONS: {
    origin: "*", //http://localhost:8081"
  }
};