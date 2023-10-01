import app, { init } from "@/index";
import { config } from "dotenv";
config();

const port = process.env.PORT || 8000;

init().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
  });
});
