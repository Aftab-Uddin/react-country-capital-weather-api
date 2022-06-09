import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./weather.module.css";
import Country from "./Country";

function Weather(props) {
  const [data, setData] = useState({});
  const [inputCity, setInputCity] = useState("");

  const getWeatherDetails = (city) => {
    const apiURL =
      "http://api.weatherstack.com/current?access_key=dc1197ca44e9e945ab9e63f6d5898cb0&query=" +
      city;
    axios
      .get(apiURL)
      .then((res) => {
        // console.log("response", res);
        setData({
          name: res.data.location.name,
          wind_speed: res.data.current.wind_speed,
          icon: res.data.current.weather_icons,
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getWeatherDetails("");
  }, []);

  // const handleChangeInput = (e)=>{
  //     console.log(e.target.value)
  //     setInputCity(e.target.value)
  // }

  const handleFind = () => {
    getWeatherDetails(props.capital);
  };
  return (
    <div>
      {/* <input
        className={style.input}
        type="text"
        placeholder="Search City"
        onChange={handleChangeInput}
      /> */}
      <button className={style.btn} onClick={handleFind}>
        Capital Weather
      </button>
      <div className={style.weather}>
        {/* {data.map(d=><h2>{d.location.name}</h2>)} */}
        <div> {data.name}</div>
        <div>{data.wind_speed}</div>
        <div>
          <img src={data.icon} alt={""} />
        </div>
      </div>
    </div>
  );
}

export default Weather;
