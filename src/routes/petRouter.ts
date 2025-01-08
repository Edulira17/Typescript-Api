import express from "express";
import PetController from "../controller/PetController";
import PetRepository from "../repositories/PetRepository";
import { AppDataSource } from "../config/dataSource";

const router = express.Router();

const petRepository = new PetRepository(
  AppDataSource.getRepository("PetEntity"),
  AppDataSource.getRepository("AdotanteEntity")
);

const petController = new PetController(petRepository);

// route create new pet
router.post("/", (req, res) => {
  petController.criaPet(req, res);
});

// route return all pets
router.get("/", (req, res) => {
  petController.listaPets(req, res);
});

// route updated pet
router.put("/:id", (req, res) => {
  petController.atualizaPet(req, res);
});

// route delete pet
router.delete("/:id", (req, res) => {
  petController.deletaPet(req, res);
});

router.put("/:pet_id/:adotante_id", (req, res) =>
  petController.adotaPet(req, res)
);

export default router;
