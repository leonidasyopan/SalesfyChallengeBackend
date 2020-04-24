import * as express from "express";

import routes from "./routes";

const app = express();

const port = 3000;

app.use(express.json());
app.use(routes);

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Salesfy Challenge Backend is listening on ${port}`);
});
