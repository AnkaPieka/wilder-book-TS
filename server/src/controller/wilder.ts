import { Request, Response } from "express";
import { Grade } from "../entity/Grade";
import { Wilder } from "../entity/Wilder";
import dataSource from "../utils";

export const createWilder = async (req: Request, res: Response): Promise<void> => {
  try {
    await dataSource.getRepository(Wilder).save(req.body);

    res.status(200).send("Created Wilder");
  } catch (error) {
    res.status(500).send({ message: `Error while creating wilder` });
  }
};

export const readWilder = async (req: Request, res: Response): Promise<void> => {
  try {
    const grades = await dataSource
      .getRepository(Grade)
      .find({ relations: { skill: true, wilder: true } });

    const wilders = await dataSource.getRepository(Wilder).find();

    const data = wilders.map((wilder) => {
      const wilderGrades = grades.filter((grade) => grade.wilder.id === wilder.id);

      const wilderGradesLean = wilderGrades.map((el) => {
        return { title: el.skill.name, votes: el.grade };
      });

      const result = {
        ...wilder,
        skills: wilderGradesLean,
      };

      return result;
    });

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: `Error while getting wilder` });
  }
};

export const updateWilder = async (req: Request, res: Response): Promise<void> => {
  try {
    await dataSource.getRepository(Wilder).update(req.body.id, req.body.newData);

    res.status(200).send({ message: "Wilder Updated" });
  } catch (error) {
    res.status(500).send({ message: `Error while updating wilder` });
  }
};

export const deleteWilder = async (req: Request, res: Response): Promise<void> => {
  try {
    await dataSource.getRepository(Grade).delete({ wilder: req.body });
    await dataSource.getRepository(Wilder).delete(req.body);

    res.status(200).send({ message: `Deleted successfully` });
  } catch (error) {
    res.status(500).send({ message: `Error while deleting wilder` });
  }
};

// export default Wilder;
