// server.js
const app = require('./app');

const PORT = 5000; // Port of the backend server.
app.listen(PORT, console.log("Server started on port " + PORT));
