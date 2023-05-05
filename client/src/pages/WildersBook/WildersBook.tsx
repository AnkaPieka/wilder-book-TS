import axios from "axios";
import { useEffect, useState } from "react";
import SkillForm from "../../components/SkillForm/SkillForm";
import Wilder from "../../components/Wilder/Wilder";
import WilderForm from "../../components/WilderForm/WilderForm";
import { SkillFromDB, WilderType } from "../../types/interfaces";

import styles from "./WildersBook.module.css";

function WildersBook() {
  const [wilders, setWilders] = useState<WilderType[]>([]);
  const [skillsFromDB, setSkillsFromDB] = useState<SkillFromDB[]>([]);

  const fetchData = async (): Promise<void> => {
    try {
      const wildersFromDB = await axios.get("http://localhost:5000/api/wilder");
      const skillsFromDB = await axios.get("http://localhost:5000/api/skill");

      setWilders(wildersFromDB.data);
      setSkillsFromDB(skillsFromDB.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id={styles.wilderBookContainer}>
      <WilderForm fetchData={fetchData} />
      <SkillForm wilders={wilders} skills={skillsFromDB} fetchData={fetchData} />

      <section>
        <h2>Wilders</h2>

        <div className={styles.WildersBookCardRow}>
          {wilders.map((wilder) => (
            <Wilder
              key={wilder.id}
              id={wilder.id}
              name={wilder.name}
              city={wilder.city}
              skills={wilder.skills}
              setWilders={setWilders}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default WildersBook;
