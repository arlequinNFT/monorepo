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
        <p className="font-bold text-2xl my-2 text-primary">Cute 3D Arlees</p>
        <p className="text-xl">Collect cute 3D Animals NFTs known as Arlees.</p>
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
        <p className="font-bold text-2xl mb-6 text-primary">Paint the Arlees</p>
        <p className="text-xl">
          What makes Arlequin unique is that you can paint your Arlees directly
          in the browser.
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
        <p className="font-bold text-2xl mb-6 text-primary">Paint to earn</p>
        <p className="text-xl">
          Participate to our painting contests, climb the leaderboard, win NFTs
          and Nimo!
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
        <p className="font-bold text-2xl mb-6 text-primary">Vote to earn</p>
        <p className="text-xl">
          If you are an Arlee owner, you can vote for your preferred Arlees
          entries and earn Nimo!
        </p>
      </div>

      <div
        ref={refWhatIsArlequinFifthBlock}
        className="flex flex-col justify-center p-6 text-center shadow-lg rounded-3xl bg-white"
      >
        <img width="100%" height="100%" src="/images/nimo.webp" alt="Nimo" />
        <p className="font-bold text-2xl mb-6 text-primary">Nimo</p>
        <p className="text-xl">
          Buy cosmetics items, poses for your Arlees, backgrounds and more with
          Nimo, the official Arlequin currency!
        </p>
      </div>
    </section>
  );
};
export default WhatIsArlequinMobile;
