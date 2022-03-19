import React from 'react';

import { ComponentsButton } from '@arlequin/components/button';

const Intro = () => {
  return (
    <div className="flex justify-center items-center">
      <section className="absolute max-w-5xl 3xl:max-w-7xl z-10 p-6">
        <div className="relative py-8 3xl:py-32 backdrop-blur-lg bg-white/10 rounded-3xl text-center lg:rounded-[5rem] shadow-xl">
          <div className="flex justify-center">
            <img
              className="w-[15%] h-[15%] lg:w-[10%] lg:h-[10%] hover:scale-150 transition-all"
              src="/images/models/cacatoes.webp"
              alt="cacatoes"
            />
            <img
              className="w-[15%] h-[15%] lg:w-[10%] lg:h-[10%] hover:scale-150 transition-all"
              src="/images/models/shiba2.webp"
              alt="shiba2"
            />
            <img
              className="w-[15%] h-[15%] lg:w-[10%] lg:h-[10%] hover:scale-150 transition-all"
              src="/images/models/turtle.webp"
              alt="turtle"
            />
            <img
              className="w-[15%] h-[15%] lg:w-[10%] lg:h-[10%] hover:scale-150 transition-all"
              src="/images/models/deer.webp"
              alt="deer"
            />
            <img
              className="w-[15%] h-[15%] lg:w-[10%] lg:h-[10%] hover:scale-150 transition-all"
              src="/images/models/deer2.webp"
              alt="deer2"
            />
          </div>
          <h2 className="font-extrabold text-3xl lg:text-6xl text-rainbow text-center tracking-wide">
            The Artists Metaverse
          </h2>
          <div className="flex justify-center mb-6">
            <img
              className="w-[15%] h-[15%] lg:w-[10%] lg:h-[10%] hover:scale-150 transition-all"
              src="/images/models/turtle2.webp"
              alt="turtle2"
            />
            <img
              className="w-[15%] h-[15%] lg:w-[10%] lg:h-[10%] hover:scale-150 transition-all"
              src="/images/models/pig.webp"
              alt="pig"
            />
            <img
              className="w-[15%] h-[15%] lg:w-[10%] lg:h-[10%] hover:scale-150 transition-all"
              src="/images/models/elephant.webp"
              alt="elephant"
            />
            <img
              className="w-[15%] h-[15%] lg:w-[10%] lg:h-[10%] hover:scale-150 transition-all"
              src="/images/models/cacatoes2.webp"
              alt="cacatoes2"
            />
            <img
              className="w-[15%] h-[15%] lg:w-[10%] lg:h-[10%] hover:scale-150 transition-all"
              src="/images/models/shiba.webp"
              alt="shiba"
            />
          </div>
          {/*
          <ComponentsButton
            rounded
            color="secondary"
            link="https://painter.arlequin.gg/"
          >
            TRY THE PAINTER
          </ComponentsButton> */}
        </div>
      </section>
      <div className="relative h-[40vh] lg:h-[65vh] 3xl:h-[55vh] w-full">
        <img
          className="absolute bottom-0 w-full"
          src="/images/curve_1.svg"
          alt="curve_1"
        />
      </div>
    </div>
  );
};
export default Intro;
