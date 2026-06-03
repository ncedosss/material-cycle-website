const express = require("express");
const cors = require("cors");
require("dotenv").config();

const contactRoute = require("./routes/request");
const authRoutes = require("./routes/auth");
const testRoutes = require("./routes/test");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contact", contactRoute);
app.use("/api/auth",authRoutes);
app.use("/api/test", testRoutes);

app.use(
  express.static(
    path.join(__dirname, "../material-cycle/dist")
  )
);

app.use((req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../material_cycle/dist/index.html"
    )
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});