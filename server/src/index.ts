import cors from "cors";
import express, { Request, Response } from "express";
import { createGrade, readGrade } from "./controller/grade";
import { createSkill, deleteSkill, readSkill, updateSkill } from "./controller/skill";
import {
  createWilder,
  deleteWilder,
  readWilder,
  updateWilder,
} from "./controller/wilder";

import dataSource from "./utils";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.post("/api/wilder", createWilder);
app.get("/api/wilder", readWilder);
app.put("/api/wilder", updateWilder);
app.delete("/api/wilder", deleteWilder);

app.post("/api/skill", createSkill);
app.get("/api/skill", readSkill);
app.put("/api/skill", updateSkill);
app.delete("/api/skill", deleteSkill);

app.get("/api/grade", readGrade);
app.post("/api/grade", createGrade);
// app.delete("/api/grade/delete/:id", GradeController.delete);

app.use((req, res, next) => res.status(404).send("Sorry, can't find that!"));

const start = async (): Promise<void> => {
  await dataSource.initialize();
  app.listen(5000, () => console.log("Server started on 5000"));
};

void start();
