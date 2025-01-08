import { Request, Response } from "express";

import type TipoPet from "../types/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";

let listaDePets: TipoPet[] = [];

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}

export default class PetController {
  constructor(private repository: PetRepository) {}

  // creates new pet
  async criaPet(req: Request, res: Response) {
    const { especie, nome, dataDeNascimento, adotado } = <PetEntity>req.body;

    if (!Object.values(EnumEspecie).includes(especie as EnumEspecie)) {
      return res.status(400).json({ erro: "Especie invalida" });
    }

    const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado);
    
    novoPet.id = geraId(), 
    novoPet.adotado = adotado
    novoPet.especie = especie
    novoPet.nome = nome
    novoPet.dataDeNascimento = dataDeNascimento

    await this.repository.criaPet(novoPet);

    return res.status(201).json(novoPet);
  }

  // Return all pets
  async listaPets(req: Request, res: Response) {
    const listaDePets = await this.repository.listaPet();
    return res.status(200).json(listaDePets);
  }

  // updates pet
  async atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaPet(
      Number(id),
      req.body as PetEntity
    );

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }

  // delete pet
  async deletaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.deletaPet(Number(id));

    if (!success) {
      return res.status(404).json({ message });
    }

    return res.sendStatus(204);
  }

  // adota pet
  async adotaPet(req: Request, res: Response){
    const {pet_id, adotante_id} = req.params;

    const {success, message} = await this.repository.adotaPet(Number(pet_id), Number(adotante_id))
  }
}

// Agora, você possui os métodos de atualização (Update) e deletar (Delete) implementados em todas as camadas do seu aplicativo: PetController, PetRouter, InterfacePetRepository e PetRepository. Com isso, o CRUD de Pet está completo e você pode realizar operações de criação, leitura, atualização e exclusão de pets no seu sistema.
