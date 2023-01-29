import express from "express";
import KabumService from "../services/KabumService.js";

const router = express.Router();

router.get("/prices/:query/:pageNumber", KabumService.getPricesByQuery);

export default router;
