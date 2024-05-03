import React from "react";

import { AnimationType } from "./helpers/AnimationType";

export const HeroSection = () => {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <div className="col-span-7 place-self-center text-center sm:text-left">
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6D8F7] via-[#1ABC9C] to-[#3b3f47]">
              Hola, Soy{" "}
            </span>
            <br />
            <AnimationType />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
            {/* Description */}
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione,
            sequi.
          </p>

          <div className="">
            <button className="px-6 py-3 w-full sm:w-fit rounded-full mr-4 bg-white hover:bg-slate-200 text-black">
              Contactame
            </button>
            <button className="px-1 py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-[#C6D8F7] via-[#1ABC9C] to-[#3b3f47] hover:bg-slate-800 text-white mt-3">
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2 ">
                Descargar CV
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
