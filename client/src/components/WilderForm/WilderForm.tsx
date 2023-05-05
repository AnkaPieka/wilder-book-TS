import axios from "axios";
import React, { useState } from "react";
// import { useForm } from "react-hook-form";
import styles from "./WilderForm.module.css";
import { WilderType } from "../../types/interfaces";

type fetchDataType = {
  fetchData: () => Promise<void>;
};

function WilderForm({ fetchData }: fetchDataType) {
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm<{ name: string; city: string }>();
  const [name, setName] = useState<WilderType["name"]>("");
  const [city, setCity] = useState<WilderType["city"]>("");

  const handleNameChange = (name: string) => {
    setName(name);
  };

  const handleCityChange = (city: string) => {
    setCity(city);
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/wilder", { name, city });
    await fetchData();

    setName("");
    setCity("");
  };

  return (
    <div className={styles.addWilder}>
      <h3>Add a wilder</h3>

      <form method="post" onSubmit={onFormSubmit}>
        <section>
          <label className="wilder-name">
            <p>Name</p>
            <input
              id="wilder-name"
              name="wilder-name"
              type="text"
              value={name ? name : ""}
              onChange={(e) => handleNameChange(e.currentTarget.value)}
              placeholder="Jane Doe"
            />
          </label>
        </section>

        <section>
          <label className="wilder-city">
            <p>City</p>
            <input
              type="text"
              value={city ? city : ""}
              onChange={(e) => handleCityChange(e.currentTarget.value)}
              placeholder="New York"
            />
          </label>
        </section>

        <input className="addWilderButton" type="submit" value="Add wilder" />
      </form>
    </div>
  );
}

export default WilderForm;
