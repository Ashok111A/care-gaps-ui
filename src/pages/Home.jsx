import { useEffect, useState } from "react";

const Home = () => {


  useEffect(() => {
    console.log("Test Effect")
  }, []);

  return (
<div>
  Home Page
</div>
  );
};

export default Home;
