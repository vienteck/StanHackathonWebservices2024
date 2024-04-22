const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Basic GET endpoint which will send a JSON response
app.get("/api/greeting", (req, res) => {
  res.json({ message: "Hello, world!" });
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.rawHeaders);
  console.log('Time: %d', Date.now())
  next()
});

// Define a route for a POST request
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  // Here you can handle the user data, such as saving it to a database
  res.json({ message: "User created successfully", name, email });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
