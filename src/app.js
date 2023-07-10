import { join, dirname } from "path";
import { fileURLToPath } from "url";

import express from "express";

import dataSource from "./database/datasource.js";
import { validateUrl, getUrlSlug } from "./utils/url.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// App settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "/templates")));
app.set("views", join(__dirname, "/templates"));
app.set("view engine", "hbs");

const DS = await dataSource.initialize();
const linkRepository = DS.getRepository("Link");

const PORT = Number.parseInt(process.env.PORT) || 3005;

app.get("/", (req, res) => {
  res.render("index", { currentDate: new Date().getFullYear() });
});

app.get("/:slug", async (req, res) => {
  const slug = req.params.slug;
  const mathchedLink = await linkRepository.findOneBy({slug: slug});

  if(!mathchedLink){
    res.status(404);
    return res.json({error: "No shortened link found"});
  }
  return res.redirect(mathchedLink.original);
});

app.post("/shorten", async (req, res) => {
  if (!validateUrl(req.body.shortenLink)) {
    res.status(400);
    return res.json({ error: "Invalid url" });
  }

  const exisitingLink = await linkRepository.findOneBy({userIp: req.ip, original: req.body.shortenLink});
  if (!exisitingLink){
    const newLink = {
      original: req.body.shortenLink,
      slug:
        req.body.slug ||
        getUrlSlug({
          keys: [req.ip, req.body.shortenLink, new Date().getTime().toString()],
        }),
      userIp: req.ip,
      expiredAt: req.body.expiredAt || null,
    };

    try {
      await linkRepository.save(newLink);
    } catch {
      res.status(500);
      return res.json({ error: "Failed to shorten link" });
    }
    res.status(201);
    return res.json({ shortenedLink: `${req.get('host')}/${newLink.slug}` });
  }
  else {
    res.status(200);
    return res.json({ shortenedLink: `${req.get('host')}/${exisitingLink.slug}` });
  }
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
