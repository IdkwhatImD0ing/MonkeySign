const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.post("/api/send-frame", (req, res) => {
  console.log("Received frame!");
  res.send("OK");
});

app.listen(3000, () => console.log("Server listening on port 3000!"));
