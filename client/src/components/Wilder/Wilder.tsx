import axios from "axios";
import React, { useState } from "react";
import profilePic from "../../assets/pic_profile_wilder.png";
import Skills from "../Skills/Skills";
import styles from "./Wilder.module.css";

import { SkillFromDB, WilderType } from "../../types/interfaces";

interface WilderProps extends WilderType {
  setWilders: React.Dispatch<React.SetStateAction<WilderType[]>>;
}

function Wilder({ id, name, city, skills, setWilders }: WilderProps) {
  const [newName, setNewName] = useState<string>(name);
  const [newCity, setNewCity] = useState<string>(city);

  const [modifyWilderName, setModifyWilderName] = useState<boolean>(false);
  const [modifyWilderCity, setModifyWilderCity] = useState<boolean>(false);

  const handleDeleteWilder = async (): Promise<void> => {
    try {
      await axios.delete(`http://localhost:5000/api/wilder`, { data: { id } });
      setWilders((prevWilder) => prevWilder.filter((wilder) => wilder.id !== id));
    } catch (err) {
      console.log("Front error while deleting:", err);
    }
  };

  const handleUpdateWilder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/wilder`, {
        id,
        newData: { name: newName, city: newCity },
      });

      setModifyWilderName(false);
      setModifyWilderCity(false);
    } catch (err) {
      console.log("Front error while updating:", err);
    }
  };

  return (
    <div className={styles.wilderCard} key={id + name}>
      <img src={profilePic} alt="wilder profile pic" />

      <section>
        <div>
          <div>
            {modifyWilderName ? (
              <form method="post" onSubmit={handleUpdateWilder}>
                <label id="name">
                  <input
                    name="name"
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.currentTarget.value)}
                  />
                </label>
                <input
                  className="addWilderButton"
                  type="submit"
                  value="Validate new name"
                />
              </form>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h3 className={styles.name}>{newName}</h3>
                <button onClick={() => setModifyWilderName(true)}>🖊️</button>
              </div>
            )}
          </div>

          <div>
            {modifyWilderCity ? (
              <form method="post" onSubmit={handleUpdateWilder}>
                <label id="city">
                  <input
                    name="city"
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.currentTarget.value)}
                  />
                </label>
                <input
                  className="addWilderButton"
                  type="submit"
                  value="Validate new city"
                />
              </form>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h5 className={styles.description}>{newCity}</h5>
                <button onClick={() => setModifyWilderCity(true)}>🖊️</button>
              </div>
            )}
          </div>
        </div>

        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <div className={styles.skills}>
          <Skills skills={skills} />
        </div>
      </section>

      <button className={styles.deleteWilder} onClick={handleDeleteWilder}>
        Delete wilder
      </button>
    </div>
  );
}

export default Wilder;
