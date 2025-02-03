import express from "express";
import { validate } from "../middlewares/validation.middleware.js";
import { chefSchema } from "../validation/chef.validation.js";
import { ChefController } from "../controllers/chef.controller.js";

const router = express.Router();

router.post("/", validate(chefSchema), ChefController.createChef);
router.get("/", ChefController.getAllChefs);
router.get("/:id", ChefController.getChefById);

export default router;
