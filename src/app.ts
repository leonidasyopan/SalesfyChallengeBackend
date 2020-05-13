import * as express from "express";
import * as cors from "cors";
import routes from "./routes";

const app = express();

const PORT = process.env.PORT || 3333;
app.set("port", PORT);

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(app.get("port"), () => {
  console.log("Salesfy Challenge Backend is listening on: ", app.get("port"));
});
