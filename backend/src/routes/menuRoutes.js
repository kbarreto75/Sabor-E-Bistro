import { Router } from "express";
import {
  getAllItemsController,
  getItemByIdController,
  createItemController,
  updateItemController,
  deleteItemController
} from "../controllers/menuController.js";
import { validateItem } from "../middlewares/validateItem.js";

const router = Router();

/**
 * Rotas RESTful do Cardápio (/api/menu)
 */

// Read (Todos ou com filtro)
router.get("/", getAllItemsController);

// Read (Único por ID)
router.get("/:id", getItemByIdController);

// Create (Com middleware de validação prévia)
router.post("/", validateItem, createItemController);

// Update (Com middleware de validação prévia)
router.put("/:id", validateItem, updateItemController);

// Delete
router.delete("/:id", deleteItemController);

export default router;
