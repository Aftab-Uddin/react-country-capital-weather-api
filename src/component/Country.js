import { isDisabled } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./country.module.css";
import Weather from "./Weather";

function Country() {
  const [data, setData] = useState({});
  const [inputCountryName, setInputCountryName] = useState("");

  const getCountryInfo = (name) => {
    const apiURL = "https://restcountries.com/v3.1/name/" + name;
    axios
      .get(apiURL)
      .then((res) => {
        console.log("response", res.data[0].capital);
        setData({
          cap: res.data[0].capital,
          lat: res.data[0].latlng,
          flag: res.data[0].flags.png,
          pop: res.data[0].population,
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getCountryInfo();
  }, []);

  const handleChangeInput = (e) => {
    console.log(e.target.value);
    setInputCountryName(e.target.value);
  };

  const handleFind = () => {
    getCountryInfo(inputCountryName);
  };
 

  return (
    <div>
      <input
        className={style.input}
        type="text"
        placeholder="Search Country"
        onChange={handleChangeInput}
      />
      <button className={style.btn} onClick={handleFind} >
        ok
      </button>
      <div className={style.country}>
        {/* {data.map(d=><h2>{d.location.name}</h2>)} */}
        <div>
          <img className={style.img}src={data.flag} alt={""} />
        </div>
        <div>Capital: {data.cap}</div>
        <div>LatLng: {data.lat}</div>
        <div>Population: {data.pop}</div>
        <Weather capital={data.cap}/>
      </div>
    </div>
  );
}

export default Country;
