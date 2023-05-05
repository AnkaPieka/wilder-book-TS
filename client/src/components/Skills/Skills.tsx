import styles from "./Skills.module.css";

import { OneSkillType, SkillType } from "../../types/interfaces";

function Skills({ skills }: SkillType) {
  return (
    <div className={styles.skills}>
      <h4>Wild Skills</h4>

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
