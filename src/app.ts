import * as express from "express";
import * as cors from "cors";
import routes from "./routes";

const app = express();

const PORT = process.env.PORT || 3333;
app.set("port", PORT);
// Cors is reponsible for giving access to interface clients
// so they can use this API
app.use(cors());
app.use(express.json());
app.use(routes);

// Here we're using port 3333 and shouting a visual message to the console.
app.listen(app.get("port"), () => {
  console.log("Salesfy Challenge Backend is listening on: ", app.get("port"));
});
