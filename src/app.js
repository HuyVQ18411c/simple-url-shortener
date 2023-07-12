import { join, dirname } from "path";
import { fileURLToPath } from "url";

import express from "express";
import hbs from "hbs";

import shortenerRouter from "./api/index.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// App settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "/templates")));
app.set("views", join(__dirname, "/templates"));
app.set("view engine", "hbs");
hbs.registerPartials(join(__dirname, '/templates/base'), function (err) {});

// Routers
app.use("/", shortenerRouter);

const PORT = Number.parseInt(process.env.PORT) || 3005;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
