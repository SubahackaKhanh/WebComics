const app = require("./app");
const { port } = require("./config/env");

app.listen(port, () => {
  console.log(`Server chạy tại http://localhost:${port}`);
});
