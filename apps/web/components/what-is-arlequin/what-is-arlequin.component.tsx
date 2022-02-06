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
  const {
    ref: refWhatIsArlequinSixthBlock,
    inView: inViewWhatIsArlequinSixthBlock,
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
            src="/images/paint_the_arlees.webp"
            alt="Customize your arlees"
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
          <p className="font-extrabold text-6xl text-primary uppercase">
            Paint to earn
          </p>
          <p className="font-bold text-3xl my-4 text-red uppercase">
            A unique way to earn with your art
          </p>
          <p className="text-2xl">
            Participate to our painting contests, climb the leaderboard, win
            NFTs and USDC! <br />
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
          <p className="font-extrabold text-6xl text-primary uppercase">Nimo</p>

          <p className="font-bold text-3xl my-4 text-red uppercase">
            the official Arlequin in-game currency
          </p>
          <p className="text-2xl">
            Buy cosmetics items, poses for your Arlees, backgrounds, level up
            your Arlees and more with Nimo!
          </p>
        </div>
      </div>

      <div
        ref={refWhatIsArlequinSixthBlock}
        className="grid grid-cols-2 gap-x-6"
      >
        <div
          className={`${
            inViewWhatIsArlequinSixthBlock
              ? 'lg:duration-[1500ms] lg:translate-x-0 lg:opacity-100 lg:transition-all'
              : 'lg:-translate-x-10 lg:opacity-0 lg:duration-500 lg:transition-all'
          } col-span-1 flex flex-col justify-center`}
        >
          <p className="font-extrabold text-6xl text-primary uppercase">
            Play for purpose
          </p>

          <p className="font-bold text-3xl my-4 text-red uppercase">
            Arlequin is involved in Animal welfare
          </p>
          <p className="text-2xl">
            Each time an Arlee is bought from the Pool, 5% of the revenue goes
            to an animal charity according to the Arlee species
          </p>
        </div>

        <div
          className={`${
            inViewWhatIsArlequinSixthBlock
              ? 'lg:duration-[1500ms] lg:translate-x-0  lg:opacity-100 lg:transition-all'
              : 'lg:translate-x-10 lg:opacity-0 lg:duration-500 lg:transition-all'
          } col-span-1`}
        >
          <img
            width="100%"
            height="100%"
            src="/images/animal_care.webp"
            alt="animal_welfare"
          />
        </div>
      </div>
    </section>
  );
};
export default WhatIsArlequin;
