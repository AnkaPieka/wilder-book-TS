import styles from "./Skills.module.css";

import { SkillType, OneSkillType, SkillFromDB } from "../../types/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";

function Skills({ skills }: SkillType) {
  const [skillsFromDB, setSkillsFromDB] = useState<SkillFromDB[]>([]);

  // const fetchData = async (): Promise<void> => {
  //   try {
  //     const skillsFromDB = await axios.get("http://localhost:5000/api/skill");

  //     setSkillsFromDB(skillsFromDB.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const handleSubmitSkill = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   try {
  //     await axios.put("http://localhost:5000/api/wilder", {
  //       id,
  //       newData: { skills: [...skills, e.currentTarget.value] },
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className={styles.skills}>
      <h4>Wild Skills</h4>

      {/* <form method="post" onSubmit={handleSubmitSkill}>
        <p>List of available skills</p>
        <select name="list-of-skills">
          <option defaultValue="-" value="initial">
            -
          </option>
          {skillsFromDB.map((skill: SkillFromDB, i) => (
            <option key={i + "_name"} value={skill.name}>
              {skill.name}
            </option>
          ))}
        </select>
        <input className="addWilderButton" type="submit" value="+" />
      </form> */}

      <ul className={styles.skillsList}>
        {skills.map((skill: OneSkillType, i: number) => (
          <li className={styles.skill} key={"skill_" + i}>
            <s className={styles.skillName}>{skill.title}</s>
            <p className={styles.skillGrade}>{skill.votes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Skills;
