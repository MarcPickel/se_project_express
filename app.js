const express = require("express");
const app = express();

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log("Server running on http://localhost:3001");
});
