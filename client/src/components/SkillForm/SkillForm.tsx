import axios from "axios";
import React, { useState } from "react";
import { SkillFromDB } from "../../types/interfaces";
import styles from "./SkillForm.module.css";

type SkillFormType = {
  skills: SkillFromDB[];
  fetchData: () => Promise<void>;
};

function SkillForm({ skills, fetchData }: SkillFormType) {
  const [skill, setSkill] = useState<string>("");

  const handleSkillChange = (skill: string) => {
    setSkill(skill);
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("front sk:", skill);

    await axios.post("http://localhost:5000/api/skill", { name: skill });
    await fetchData();

    setSkill("");
  };

  return (
    <div className={styles.addWilder}>
      <h3>Add a skill</h3>

      <section>
        <p>List of available skills</p>
        <select name="list-of-skills">
          <option defaultValue="-" value="initial">
            -
          </option>
          {skills.map((skill, i) => (
            <option key={i + "_name"} value={skill.name}>
              {skill.name}
            </option>
          ))}
        </select>
      </section>

      <form method="post" onSubmit={onFormSubmit}>
        <section>
          <label className="wilder-name">
            <input
              type="text"
              value={skill}
              onChange={(e) => handleSkillChange(e.currentTarget.value)}
              placeholder="Add a skill to the list"
            />
          </label>
        </section>

        <input className="addWilderButton" type="submit" value="Add Skill" />
      </form>
    </div>
  );
}

export default SkillForm;
