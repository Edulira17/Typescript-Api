import { Request, Response } from "express";

import type TipoPet from "../Types/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";

let listaDePets: TipoPet[] = [];

export default class PetController {
  // creates new pet
  criaPet(req: Request, res: Response) {
    const { id, especie, nome, idade, adotado } = <TipoPet>req.body;

    if (!Object.values(EnumEspecie).includes(especie as EnumEspecie)) {
      return res.status(400).json({ erro: "Especie invalida" });
    }

    const novoPet: TipoPet = { 
      id,
      especie, 
      nome, 
      idade, 
      adotado 
    };

    listaDePets.push(novoPet);

    return res.status(201).json(novoPet);
  }

  // Return all pets
  listaPets(req: Request, res: Response) {
    return res.status(200).json(listaDePets);
  }

  // updates pet
  atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { adotado, especie, idade, nome } = req.body as TipoPet;

    const pet = listaDePets.find((pet) => pet.id === Number(id));

    if (!pet) {
      return res.status(404).json({ erro: "Pet não encontrado" });
    }

    pet.nome = nome;
    pet.idade = idade;
    pet.especie = especie;
    pet.adotado = adotado;
    return res.status(200).json(pet);
  }

  // delete pet
  deletaPet(req: Request, res: Response) {
    const { id } = req.params;
    const pet = listaDePets.find((pet) => pet.id === Number(id));

    if (!pet) {
      return res.status(404).json({ erro: "Pet não encontrado" });
    }

    const index = listaDePets.indexOf(pet);
    listaDePets.splice(index, 1);
    return res.status(200).json({ mensagem: "Pet deletado com sucesso" });
  }
}