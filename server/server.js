const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/connect'); 
const authRoutes = require('./routes/auth'); 
const passwordRoutes = require('./routes/password'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.json());


connectDB();


app.get('/', (req, res) => {
  res.send('🚀 Server connected with Mongoose!');
});


app.use(express.json());
app.use('/api/auth', authRoutes);          
app.use('/api/password', passwordRoutes);  


app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
