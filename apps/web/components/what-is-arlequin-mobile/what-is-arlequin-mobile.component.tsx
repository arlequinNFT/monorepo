import React from 'react';
import { useInView } from 'react-intersection-observer';

const WhatIsArlequinMobile = () => {
  const {
    ref: refWhatIsArlequinFirstBlock,
    inView: inViewWhatIsArlequinFirstBlock,
  } = useInView({
    threshold: 0.5,
  });
  const {
    ref: refWhatIsArlequinSecondBlock,
    inView: inViewWhatIsArlequinSecondBlock,
  } = useInView({
    threshold: 0.5,
  });
  const {
    ref: refWhatIsArlequinThirdBlock,
    inView: inViewWhatIsArlequinThirdBlock,
  } = useInView({
    threshold: 0.5,
  });
  const {
    ref: refWhatIsArlequinFourthBlock,
    inView: inViewWhatIsArlequinFourthBlock,
  } = useInView({
    threshold: 0.5,
  });
  const {
    ref: refWhatIsArlequinFifthBlock,
    inView: inViewWhatIsArlequinFifthBlock,
  } = useInView({
    threshold: 0.5,
  });

  return (
    <section className="grid gap-y-6 p-6">
      <div
        ref={refWhatIsArlequinFirstBlock}
        className="flex flex-col justify-center p-6 text-center shadow-lg rounded-3xl bg-white"
      >
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

      <div
        ref={refWhatIsArlequinSecondBlock}
        className="flex flex-col justify-center p-6 text-center shadow-lg rounded-3xl bg-white"
      >
        <img
          width="100%"
          height="100%"
          src="/images/paint_to_earn.webp"
          alt="Paint to earn"
        />
        <p className="font-extrabold text-6xl text-primary uppercase">
          Paint the Arlees
        </p>
        <p className="font-bold text-3xl my-4 text-red uppercase">
          Arlequin is the Artists Metaverse
        </p>
        <p className="text-2xl">
          Add your personnal artistic touch by painting on the Arlees using
          Arlequin's Painter.
        </p>
      </div>

      <div
        ref={refWhatIsArlequinThirdBlock}
        className="flex flex-col justify-center p-6 text-center shadow-lg rounded-3xl bg-white"
      >
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

      <div
        ref={refWhatIsArlequinFourthBlock}
        className="flex flex-col justify-center p-6 text-center shadow-lg rounded-3xl bg-white"
      >
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

      <div
        ref={refWhatIsArlequinFifthBlock}
        className="flex flex-col justify-center p-6 text-center shadow-lg rounded-3xl bg-white"
      >
        <img width="100%" height="100%" src="/images/nimo.webp" alt="Nimo" />
        <p className="font-extrabold text-6xl text-primary uppercase">Nimo</p>

        <p className="font-bold text-3xl my-4 text-red uppercase">
          the official Arlequin currency
        </p>
        <p className="text-2xl">
          Buy cosmetics items, poses for your Arlees, backgrounds, painting
          slots and more with Nimo!
        </p>
      </div>
    </section>
  );
};
export default WhatIsArlequinMobile;
