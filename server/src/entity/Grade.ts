import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Skill } from "./Skill";
import { Wilder } from "./Wilder";

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public grade: number;

  // @Column()
  // public wilderId: number;

  // @Column()
  // public skillId: number;

  @ManyToOne(() => Skill, (skill) => skill.grades)
  public skill: Skill;

  @ManyToOne(() => Wilder, (wilder) => wilder.grades)
  public wilder: Wilder;
}

// module.exports = new EntitySchema({
//   name: "Grade",
//   columns: {
//     id: {
//       primary: true,
//       type: "int",
//       generated: true,
//     },
//     grade: {
//       type: "int",
//     },
//   },
//   relations: {
//     skill: {
//       target: "Skill",
//       type: "many-to-one",
//       eager: true,
//     },
//     wilder: {
//       target: "Wilder",
//       type: "many-to-one",
//       eager: true,
//     },
//   },
// });
