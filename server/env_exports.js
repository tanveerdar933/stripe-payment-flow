require('dotenv').config();

module.exports = {
    STRIPE_PRIVATE_KEY: process.env.STRIPE_PRIVATE_KEY || "sk_test_51OmYrpGQttMZ74vpfx7mZJRiPr5C9vZPyffSgSu6hOYgyoOfsYdLxAmfegWWTF2u8Zwo6pmidYFCw9fW7zdCA0nS00TvKSAtES",
    CLIENT_APP_URL: process.env.CLIENT_APP_URL || "http://localhost:5173",
    PORT: process.env.PORT || 8000,
};