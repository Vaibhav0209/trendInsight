import React, { useEffect, useState } from "react";
import Trendingpost from "../pages/Trendingpost";
import axios from "axios";
const Header = () => {
  const [trend, setTrend] = useState();
  async function currentTrend() {
    await axios
      .get("http://localhost:5000/api/trending/fetch")
      .then((res) => {
        setTrend(res?.data);
      })
      .catch((e) => console.log(e));
  }
  return (
    <>
      <div className="px-10">
        <header className="text-gray-600 body-font border-b-2">
          <div className="container mx-auto flex justify-between flex-wrap py-3 flex-col md:flex-row items-center">
            <p className="text-indigo-900 text-xl font-bold first-letter:text-3xl ">
              Barsaati media and tech
            </p>

            <button className="text-black font-medium inline-flex items-center bg-gray-100 border-0 py-2 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
              Vaibhav Devaliya
            </button>
          </div>
        </header>

        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto flex flex-wrap">
            <h2 className="sm:text-3xl text-2xl text-gray-900 font-medium title-font mb-2 md:w-2/5">
              Trending on Twitter
            </h2>
            <div className="md:w-3/5 md:pl-6">
              <p className="leading-relaxed text-base">
                Trending topics on Twitter in early June 2024 include a diverse
                range of subjects reflecting global interests and current
                events.
              </p>
              <div className="flex md:mt-4 mt-6">
                <button
                  onClick={currentTrend}
                  className="inline-flex text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Trend Topics
                </button>
              </div>
            </div>
          </div>
        </section>
        <Trendingpost trend={trend} />
      </div>
    </>
  );
};

export default Header;
