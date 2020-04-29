import * as express from "express";

import * as cors from "cors";

import routes from "./routes";

const app = express();

const port = 3333;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Salesfy Challenge Backend is listening on ${port}`);
});
