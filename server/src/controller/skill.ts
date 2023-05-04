import { Request, Response } from "express";
import { Skill } from "../entity/Skill";
import dataSource from "../utils";

export const createSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("req b", req.body);
    await dataSource.getRepository(Skill).save(req.body);

    res.status(200).send("Created Skill");
  } catch (error) {
    res.status(500).send({ message: `Error while creating Skill` });
  }
};

export const readSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const skillsList = await dataSource.getRepository(Skill).find();

    res.status(200).send(skillsList);
  } catch (error) {
    res.status(500).send({ message: `Error while getting Skill` });
  }
};

export const updateSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    await dataSource.getRepository(Skill).update(req.body.id, req.body.newData);

    res.status(200).send("Skill Updated");
  } catch (error) {
    res.status(500).send({ message: `Error while updating Skill` });
  }
};

export const deleteSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    await dataSource.getRepository(Skill).delete(req.body);

    res.status(200).send("Skill Deleted");
  } catch (error) {
    res.status(500).send({ message: `Error while deleting Skill` });
  }
};
