import * as express from "express";
import * as cors from "cors";
import routes from "./routes";

const app = express();

const port = 3333;

// Cors is reponsible for giving access to interface clients
// so they can use this API
app.use(cors());
app.use(express.json());
app.use(routes);

// Here we're using port 3333 and shouting a visual message to the console.
app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Salesfy Challenge Backend is listening on ${port}`);
});
