import express from "express";

import dataSource from "../../database/datasource.js";
import { validateUrl, getUrlSlug } from "../../utils/url.js";

const APP_SHORTEN_HOST = process.env.APP_SHORTEN_HOST || "http://localhost";

const router = express.Router();

const DS = await dataSource.initialize();
const linkRepository = DS.getRepository("Link");

router.get("/", (req, res) => {
  res.render("index", { currentDate: new Date().getFullYear() });
});

router.post("/", async (req, res) => {
  if (!validateUrl(req.body.shortenLink)) {
    res.status(400);
    return res.json({ error: "Invalid url" });
  }

  const exisitingLink = await linkRepository.findOneBy({
    userIp: req.ip,
    original: req.body.shortenLink,
  });
  if (!exisitingLink) {
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
    return res.json({ shortenedLink: `${APP_SHORTEN_HOST}/${newLink.slug}` });
  } else {
    res.status(200);
    return res.json({
      shortenedLink: `${APP_SHORTEN_HOST}/${exisitingLink.slug}`,
    });
  }
});

router.get("/:slug", async (req, res) => {
  const slug = req.params.slug;
  const mathchedLink = await linkRepository.findOneBy({ slug: slug });

  if (!mathchedLink) {
    res.status(404);
    return res.json({ error: "No shortened link found" });
  }
  return res.redirect(mathchedLink.original);
});

export default router;
