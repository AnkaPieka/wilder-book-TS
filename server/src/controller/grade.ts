import { Request, Response } from "express";
import { Grade } from "../entity/Grade";
import { Skill } from "../entity/Skill";
import { Wilder } from "../entity/Wilder";
import dataSource from "../utils";

export const createGrade = async (req: Request, res: Response): Promise<void> => {
  try {
    const wilderFromDB = await dataSource
      .getRepository(Wilder)
      .findOneBy({ name: req.body.wilder });

    const skillFromDB = await dataSource
      .getRepository(Skill)
      .findOneBy({ name: req.body.skill });

    const reqBodyGradeNum: number = req.body.grade;

    if (wilderFromDB !== null && skillFromDB !== null) {
      const toSave = {
        grade: reqBodyGradeNum,
        skill: skillFromDB,
        wilder: wilderFromDB,
      };

      await dataSource.getRepository(Grade).save(toSave);

      res.status(200).send("Created Grade");
    }
  } catch (error) {
    res.status(500).send({ message: `Error while creating grade` });
  }
};

export const readGrade = async (req: Request, res: Response): Promise<void> => {
  try {
    const gradeFromDB = await dataSource.getRepository(Grade).find();

    res.status(200).send(gradeFromDB);
  } catch (error) {
    res.status(500).send({ message: `Error while updating wilder` });
  }
};
// delete: async (req, res) => {
//   try {
//     await dataSource.getRepository(Grade).delete(req.params.id);

//     res.status(200).send("Grade Deleted");
//   } catch (error) {
//     res.status(500).send({ message: `Error while deleting grade` });
//   }
// },
