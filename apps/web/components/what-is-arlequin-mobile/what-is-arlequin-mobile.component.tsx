import React from 'react';
import { useInView } from 'react-intersection-observer';

const WhatIsArlequinMobile = () => {
  return (
    <section className="grid gap-y-6 p-6">
      <div className="flex flex-col justify-center p-6 text-center shadow-lg rounded-3xl bg-white">
        <img
          width="100%"
          height="100%"
          src="/images/arlees.webp"
          alt="Cute 3D Arlees"
        />
        <p className="font-extrabold text-6xl text-primary uppercase">
          Collect Arlees NFTs
        </p>
        <p className="font-bold text-3xl my-4 text-red uppercase">
          Cute 3D animals living in Arlequin Metaverse
        </p>
        <p className="text-2xl">
          Dozens species exist, and we are introducing one each week!
        </p>
      </div>

      <div className="flex flex-col justify-center p-6 text-center shadow-lg rounded-3xl bg-white">
        <img
          width="100%"
          height="100%"
          src="/images/paint_the_arlees.webp"
          alt="Customize your arlees"
        />
        <p className="font-extrabold text-6xl text-primary uppercase">
          Customize your arlees
        </p>
        <p className="font-bold text-3xl my-4 text-red uppercase">
          Arlequin is the Artists Metaverse
        </p>
        <p className="text-2xl">
          Add your personnal artistic touch by painting on the Arlees using
          Arlequin's Painter.
        </p>
      </div>

      <div className="flex flex-col justify-center p-6 text-center shadow-lg rounded-3xl bg-white">
        <img
          width="100%"
          height="100%"
          src="/images/paint_to_earn.webp"
          alt="Painting contest"
        />
        <p className="font-extrabold text-6xl text-primary uppercase">
          Paint to earn
        </p>
        <p className="font-bold text-3xl my-4 text-red uppercase">
          A unique way to earn with your art
        </p>
        <p className="text-2xl">
          Participate to our painting contests, climb the leaderboard, win NFTs
          and FUSD! <br />
        </p>
      </div>

      <div className="flex flex-col justify-center p-6 text-center shadow-lg rounded-3xl bg-white">
        <img
          width="100%"
          height="100%"
          src="/images/vote_to_earn.webp"
          alt="Vote to earn"
        />
        <p className="font-extrabold text-6xl text-primary uppercase">
          Vote to earn
        </p>

        <p className="font-bold text-3xl my-4 text-red uppercase">
          Arlequin is fully community driven
        </p>
        <p className="text-2xl">
          If you are an Arlee adopter, you can vote for your preferred Arlees
          entries! <br />
          Each vote makes you earn Nimo!
        </p>
      </div>

      <div className="flex flex-col justify-center p-6 text-center shadow-lg rounded-3xl bg-white">
        <img width="100%" height="100%" src="/images/nimo.webp" alt="Nimo" />
        <p className="font-extrabold text-6xl text-primary uppercase">Nimo</p>

        <p className="font-bold text-3xl my-4 text-red uppercase">
          the official Arlequin currency
        </p>
        <p className="text-2xl">
          Buy cosmetics items, poses for your Arlees, backgrounds, level up your
          Arlees and more with Nimo!
        </p>
      </div>

      <div className="flex flex-col justify-center p-6 text-center shadow-lg rounded-3xl bg-white">
        <img
          width="100%"
          height="100%"
          src="/images/arlees.webp"
          alt="Play for purpose"
        />
        <p className="font-extrabold text-6xl text-primary uppercase">
          Play for purpose
        </p>

        <p className="font-bold text-3xl my-4 text-red uppercase">
          Arlequin is engaged in Animal care
        </p>
        <p className="text-2xl">
          Each time an Arlee is bought from the Pool, 5% of the revenue goes to
          an animal charity according to the Arlee species
        </p>
      </div>
    </section>
  );
};
export default WhatIsArlequinMobile;
