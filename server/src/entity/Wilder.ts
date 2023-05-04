import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Grade } from "./Grade";

@Entity()
export class Wilder {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public city: string;

  @OneToMany(() => Grade, (grade) => grade.wilder)
  public grades: Grade[];
}

// module.exports = new EntitySchema({
//   name: "Wilder",
//   columns: {
//     id: {
//       primary: true,
//       type: "int",
//       generated: true,
//     },
//     name: {
//       type: "text",
//     },
//     city: {
//       type: "text",
//       nullable: true,
//     },
//   },
// });
