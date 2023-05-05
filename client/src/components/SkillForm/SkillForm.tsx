import axios from "axios";
import React, { useState } from "react";
import { SkillFromDB, WilderType } from "../../types/interfaces";
import styles from "./SkillForm.module.css";

type SkillFormType = {
  wilders: WilderType[];
  skills: SkillFromDB[];
  fetchData: () => Promise<void>;
};

function SkillForm({ wilders, skills, fetchData }: SkillFormType) {
  //input to add new skill
  const [newSkill, setNewSkill] = useState<string>("");

  const handleNewSkillChange = (skill: string) => {
    setNewSkill(skill);
  };

  const onAddSkillToListFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/skill", { name: newSkill });
    await fetchData();

    setNewSkill("");
  };

  //grade
  const [grade, setGrade] = useState<number>(0);

  //add a skill to a wilder
  const [wilderName, setWilderName] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<string>("");

  const onAddSkillToWilderFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/grade", {
        wilder: wilderName,
        skill: selectedSkill,
        grade: grade,
      });

      setWilderName("");
      setSelectedSkill("");
      setGrade(0);

      await fetchData();
    } catch (err) {
      console.log("Error when adding skill", err);
    }
  };

  const handleWilderAddSkill = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWilderName(e.target.value);
  };

  const handleSelectedSkillChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSkill(e.target.value);
  };

  return (
    <div className={styles.addSkill}>
      <h3>Add a skill</h3>

      <article id={styles.modifySkillsList}>
        <section>
          <h4>Select a skill</h4>
          <select name="list-of-skills" onChange={(e) => handleSelectedSkillChange(e)}>
            <option defaultValue={newSkill} value="initial">
              -
            </option>
            {skills.map((skill, i) => (
              <option key={i + "_name"} value={skill.name}>
                {skill.name}
              </option>
            ))}
          </select>
        </section>

        <div>
          <h4>New skill</h4>
          <form method="post" onSubmit={onAddSkillToListFormSubmit}>
            <section>
              <label className="wilder-name">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => handleNewSkillChange(e.currentTarget.value)}
                  placeholder="Add a skill to the list"
                />
              </label>
            </section>

            <input className="addWilderButton" type="submit" value="Add" />
          </form>
        </div>
      </article>

      <article>
        <section>
          <h4>Add skill to a Wilder</h4>
          <select name="list-of-skills" onChange={(e) => handleWilderAddSkill(e)}>
            <option defaultValue="-" value="">
              -
            </option>
            {wilders.map((wilder, i) => (
              <option key={i + "_name"} value={wilder.name}>
                {wilder.name}
              </option>
            ))}
          </select>

          <h5>Grade {wilderName ? wilderName : "the wilder"}'s skill from 0 to 10</h5>
          <input
            name="grade"
            type="number"
            value={grade}
            min="0"
            max="10"
            onChange={(e) => setGrade(Number(e.target.value))}
          />

          <form method="post" onSubmit={onAddSkillToWilderFormSubmit}>
            <input
              className="addWilderButton"
              type="submit"
              value={`Add ${selectedSkill ? selectedSkill : "a skill"} to ${
                wilderName ? wilderName : "a wilder"
              }`}
            />
          </form>
        </section>
      </article>
    </div>
  );
}

export default SkillForm;
