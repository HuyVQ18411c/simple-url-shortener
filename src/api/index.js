import express from "express";

import shortenerRouter from "./shortener/index.js";
import homeRouter from "./home/index.js";

const router = express.Router();

router.use('/shortener', shortenerRouter);
router.use('/', homeRouter);

export default router;
