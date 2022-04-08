import React from 'react';
import ScratchMe from 'react-scratch-me';

const Intro = () => {
  return (
    <>
      <div className="grid place-content-center h-full">
        <div className="relative">
          <div className="absolute animate-float left-[-18rem] top-0">
            <ScratchMe
              width={350}
              height={350}
              foregroundImageSrc={'/images/elephant_tea_white.webp'}
              backgroundImageSrc={'/images/elephant_tea_colored.webp'}
              strokeWidth={20}
              onProgress={(percent) => console.log(`${percent}% cleared`)}
              onCompleted={() => console.log(`Scratch Card Completed!`)}
              completedAt={30}
            />
          </div>
          <img
            width={540}
            src="https://cdn.axieinfinity.com/landing-page/_next/static/images/banner-941f68fe82413ac57390b1d4b6ca51ef.png"
            alt=""
          />
          <p className="absolute cursor-pointer text-xl left-[9.5rem] bottom-8 text-white font-bold">
            Painter
          </p>
          <p className="absolute cursor-pointer text-xl right-[8rem] bottom-8 text-white font-bold">
            Whitepaper
          </p>
        </div>
      </div>
    </>
  );
};
export default Intro;
