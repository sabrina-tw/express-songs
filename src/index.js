const app = require("./app");
const PORT = process.env.PORT || 3002;
require("dotenv").config();
require("./utils/db");

app.listen(PORT, () => {
  console.log(`express app started on port ${PORT}`);
});
