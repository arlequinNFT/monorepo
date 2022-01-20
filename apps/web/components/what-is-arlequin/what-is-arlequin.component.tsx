import React from 'react';
import { useInView } from 'react-intersection-observer';

const WhatIsArlequin = () => {
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
    <section className="max-w-6xl mx-auto py-14">
      <div
        ref={refWhatIsArlequinFirstBlock}
        className="grid grid-cols-2 gap-x-6"
      >
        <div
          className={`${
            inViewWhatIsArlequinFirstBlock
              ? 'lg:duration-[1500ms] lg:translate-x-0 lg:opacity-100 lg:transition-all'
              : 'lg:-translate-x-10 lg:opacity-0 lg:duration-500 lg:transition-all'
          } col-span-1`}
        >
          <img
            width="100%"
            height="100%"
            src="/images/arlees.webp"
            alt="Cute 3D Arlees"
          />
        </div>
        <div
          className={`${
            inViewWhatIsArlequinFirstBlock
              ? 'lg:duration-[1500ms] lg:translate-x-0 lg:opacity-100 lg:transition-all'
              : 'lg:translate-x-10 lg:opacity-0 lg:duration-500 lg:transition-all'
          } col-span-1 flex flex-col justify-center`}
        >
          <p className="font-bold text-7xl mb-6 text-primary">Cute 3D Arlees</p>
          <p className="text-2xl">
            Collect cute 3D Animals NFTs known as Arlees. <br />
            Dozens species exist, and we are introducing one each 2 weeks!
          </p>
        </div>
      </div>

      <div
        ref={refWhatIsArlequinSecondBlock}
        className="grid grid-cols-2 gap-x-6"
      >
        <div
          className={`${
            inViewWhatIsArlequinSecondBlock
              ? 'lg:duration-[1500ms] lg:translate-x-0 lg:opacity-100 lg:transition-all'
              : 'lg:-translate-x-10 lg:opacity-0 lg:duration-500 lg:transition-all'
          } col-span-1 flex flex-col justify-center`}
        >
          <p className="font-bold text-7xl mb-6 text-primary">
            Paint the Arlees
          </p>
          <p className="text-2xl">
            What makes Arlequin unique is that you can paint your Arlees
            directly in the browser using Arlequin's Painter.
          </p>
        </div>

        <div
          className={`${
            inViewWhatIsArlequinSecondBlock
              ? 'lg:duration-[1500ms] lg:translate-x-0 lg:opacity-100 lg:transition-all'
              : 'lg:translate-x-10 lg:opacity-0 lg:duration-500 lg:transition-all'
          } col-span-1`}
        >
          <img
            width="100%"
            height="100%"
            src="/images/paint_to_earn.webp"
            alt="Paint to earn"
          />
        </div>
      </div>

      <div
        ref={refWhatIsArlequinThirdBlock}
        className="grid grid-cols-2 gap-x-6"
      >
        <div
          className={`${
            inViewWhatIsArlequinThirdBlock
              ? 'lg:duration-[1500ms] lg:translate-x-0 lg:opacity-100 lg:transition-all'
              : 'lg:-translate-x-10 lg:opacity-0 lg:duration-500 lg:transition-all'
          } col-span-1`}
        >
          <img
            width="100%"
            height="100%"
            src="/images/paint_to_earn.webp"
            alt="Painting contest"
          />
        </div>
        <div
          className={`${
            inViewWhatIsArlequinThirdBlock
              ? 'lg:duration-[1500ms] lg:translate-x-0 lg:opacity-100 lg:transition-all'
              : 'lg:translate-x-10 lg:opacity-0 lg:duration-500 lg:transition-all'
          } col-span-1 flex flex-col justify-center`}
        >
          <p className="font-bold text-7xl mb-6 text-primary">Paint to earn</p>
          <p className="text-2xl">
            Participate to our painting contests, climb the leaderboard, win
            NFTs and FUSD! <br />
            This is what we called the <strong>paint to earn</strong>!
          </p>
        </div>
      </div>

      <div
        ref={refWhatIsArlequinFourthBlock}
        className="grid grid-cols-2 gap-x-6"
      >
        <div
          className={`${
            inViewWhatIsArlequinFourthBlock
              ? 'lg:duration-[1500ms] lg:translate-x-0 lg:opacity-100 lg:transition-all'
              : 'lg:-translate-x-10 lg:opacity-0 lg:duration-500 lg:transition-all'
          } col-span-1 flex flex-col justify-center`}
        >
          <p className="font-bold text-7xl mb-6 text-primary">Vote to earn</p>
          <p className="text-2xl">
            If you are an Arlee owner, you can vote for your preferred Arlees
            entries! <br />
            Each vote makes you earn Nimo!
          </p>
        </div>

        <div
          className={`${
            inViewWhatIsArlequinFourthBlock
              ? 'lg:duration-[1500ms] lg:translate-x-0  lg:opacity-100 lg:transition-all'
              : 'lg:translate-x-10 lg:opacity-0 lg:duration-500 lg:transition-all'
          } col-span-1`}
        >
          <img
            width="100%"
            height="100%"
            src="/images/vote_to_earn.webp"
            alt="Vote to earn"
          />
        </div>
      </div>

      <div
        ref={refWhatIsArlequinFifthBlock}
        className="grid grid-cols-2 gap-x-6"
      >
        <div
          className={`${
            inViewWhatIsArlequinFifthBlock
              ? 'lg:duration-[1500ms] lg:translate-x-0 lg:opacity-100 lg:transition-all'
              : 'lg:-translate-x-10 lg:opacity-0 lg:duration-500 lg:transition-all'
          } col-span-1`}
        >
          <img width="100%" height="100%" src="/images/nimo.webp" alt="Nimo" />
        </div>
        <div
          className={`${
            inViewWhatIsArlequinFifthBlock
              ? 'lg:duration-[1500ms] lg:translate-x-0 lg:opacity-100 lg:transition-all'
              : 'lg:translate-x-10 lg:opacity-0 lg:duration-500 lg:transition-all'
          } col-span-1 flex flex-col justify-center`}
        >
          <p className="font-bold text-7xl mb-6 text-primary">Nimo</p>
          <p className="text-2xl">
            Buy cosmetics items, poses for your Arlees, backgrounds and more
            with Nimo, the official Arlequin currency!
          </p>
        </div>
      </div>
    </section>
  );
};
export default WhatIsArlequin;
