import dbConnect from "./src/libs/db.js"
import { server } from "./src/server.js";

dbConnect()
  .then(() => {
    server.listen(8081, () => {
      console.log("server listening on port 8080");
    });
  })
  .catch((error) => {
    console.error("Error", error);
  });
