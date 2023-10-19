const express = require("express");
const app = express();
const port = 3000;
// const db = require('./db');

app.use(express.json());

// Include your route files
const authRoutes = require("./blog/routes/authRoute");
const postRoutes = require("./blog/routes/postRoute");
const commentRoutes = require("./blog/routes/commentRoute");

// Use the route files
app.use(authRoutes);
app.use(postRoutes);
app.use(commentRoutes);

// Sync the database
// db.sync()
//   .then(() => {
//     console.log('Database is connected and synchronized');
//   })
//   .catch((error) => {
//     console.error('Database synchronization error:', error);
//   });

// Import your relationship definitions
require('./relationships');

app.listen(port, () => console.log(`Server is running on port ${port}`));