import React from "react";
import "./Home.css";
import Cities from "./Cities";
import Landing from "./Landing";
import WhyChooseUs from './WhyChooseUs';

function Home() {
  return (
    <>
      <Landing />
      <Cities />
      <WhyChooseUs />
    </>
  );
}

export default Home;
