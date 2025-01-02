import express from "express";
import PetController from "../controller/PetController";

const router = express.Router();

const petController = new PetController();

// create new pet
router.post("/", (req, res) => {
  petController.criaPet(req, res);
});

// return all pets
router.get("/", (req, res) => {
  petController.listaPets(req, res);
});

// updated pet
router.put("/:id", (req, res) => {
  petController.atualizaPet(req, res);
});

// delete pet
router.delete("/:id", (req, res) => {
  petController.deletaPet(req, res)
})

export default router;
