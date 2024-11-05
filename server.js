const express = require("express");
const app = express();
const port = 3500;
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use('/api/users', require("./routes/userRoutes.js"));
app.use('/api/places', require("./routes/placeRoutes.js"));

app.all("*", (req, res) => {
    res.status(404).json({ "message": "Not found" });
})

app.listen(port, () => console.log(`Server running on port ${port}`))