import 'dotenv/config';
import express from 'express';
import connectDB from './config/database.js'; 
import ProductRoute from './routes/ProductRoute.js';
import AuthRoute from './routes/AuthRoutes.js';
import CartRoute from './routes/CartRoute.js';

const app = express();
connectDB();

// Middleware
app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.json({ message: 'Hello!' }); // Corrected syntax for the JSON response
});



//cart route
const cart_route=require("./routes/CartRoute.js");
app.use('/api',cart_route);



// Routes
app.use([ProductRoute, AuthRoute]);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
