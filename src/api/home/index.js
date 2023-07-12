import express from "express";

const router = express.Router();

// If slug match with our endpoint paths, ignore it
const INVALID_SLUGS = ["shortener"];

router.get("/", (req, res) => {
  return res.redirect("/shortener");
});

router.get("/:slug", (req, res) => {
  const slug = req.params.slug;
  if (INVALID_SLUGS.includes(slug)) {
    return res.redirect("/shortener");
  }
  return res.redirect(`/shortener/${slug}`);
});

export default router;
