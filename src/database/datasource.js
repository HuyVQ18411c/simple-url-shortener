import { join, dirname } from "path";
import { fileURLToPath } from 'url';

import { DataSource } from "typeorm";
import { Link } from "./models/link.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: "url_shortener",
  entities: [Link],
  migrations: [join(__dirname, "/migrations/**/*.js")],
});
// dataSource.initialize();

export default dataSource;
