import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Grade } from "./Grade";

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Grade, (grade) => grade.skill)
  public grades: Grade[];
}

/*
module.exports = new EntitySchema({
  name: "Skill",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "text",
      unique: true,
    },
  },
});
*/
