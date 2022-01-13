import React from 'react';
import { useInView } from 'react-intersection-observer';

const WhatIsArlequin = () => {
  const {
    ref: refWhatIsArlequinFirstBlock,
    inView: inViewWhatIsArlequinFirstBlock,
  } = useInView({});
  const {
    ref: refWhatIsArlequinSecondBlock,
    inView: inViewWhatIsArlequinSecondBlock,
  } = useInView({});
  const {
    ref: refWhatIsArlequinThirdBlock,
    inView: inViewWhatIsArlequinThirdBlock,
  } = useInView({});
  const {
    ref: refWhatIsArlequinFourthBlock,
    inView: inViewWhatIsArlequinFourthBlock,
  } = useInView({});

  return (
    // <section className="max-w-7xl grid grid-cols-4 gap-6 mx-auto px-6 pt-40 pb-24 lg:py-20 xl:px-0 text-center">
    //   <p className="col-span-4 text-7xl text-primary-800 font-bold">
    //     What is <span className="font-extrabold text-rainbow">Arlequin</span>?
    //   </p>

    //   <div
    //     ref={refWhatIsArlequinFirstBlock}
    //     className={`${
    //       inViewWhatIsArlequinFirstBlock
    //         ? 'lg:duration-500 lg:transition-all lg:translate-y-0'
    //         : 'lg:translate-y-20'
    //     }  col-span-4 lg:col-span-2 xl:col-span-1 flex flex-col items-center p-4 shadow-md rounded-2xl`}
    //   >
    //     <img
    //       width="80%"
    //       height="80%"
    //       src="/images/artist.webp"
    //       alt="The Artists Metaverse"
    //     />
    //     <p className="font-bold text-xl my-2">The Artists Metaverse</p>
    //     <p className="text-lg text-primary-700">
    //       Arlequin is a fully community driven Metaverse where Artists have the
    //       first role.
    //     </p>
    //   </div>

    //   <div
    //     ref={refWhatIsArlequinSecondBlock}
    //     className={`${
    //       inViewWhatIsArlequinSecondBlock
    //         ? 'lg:duration-500 lg:delay-100 lg:transition-all  lg:translate-y-0'
    //         : 'lg:translate-y-20'
    //     }  col-span-4 lg:col-span-2 xl:col-span-1 flex flex-col items-center p-4 shadow-md rounded-2xl`}
    //   >
    //     <img
    //       width="80%"
    //       height="80%"
    //       src="/images/arlees.webp"
    //       alt="Dozens of cute 3D Arlees species"
    //     />
    //     <p className="font-bold text-xl my-2">Cute 3D Animals</p>
    //     <p className="text-lg text-primary-700">
    //       Begin the collection of these cute 3D Animals NFTs known as Arlees.
    //     </p>
    //   </div>

    //   <div
    //     ref={refWhatIsArlequinThirdBlock}
    //     className={`${
    //       inViewWhatIsArlequinThirdBlock
    //         ? 'lg:duration-500 lg:delay-200 lg:transition-all  lg:translate-y-0'
    //         : 'lg:translate-y-20'
    //     }  col-span-4 lg:col-span-2 xl:col-span-1 flex flex-col items-center p-4 shadow-md rounded-2xl`}
    //   >
    //     <img
    //       width="80%"
    //       height="80%"
    //       src="/images/paint_to_earn.webp"
    //       alt="Paint to earn"
    //     />
    //     <p className="font-bold text-xl my-2">Paint to earn</p>
    //     <p className="text-lg text-primary-700">
    //       Show the world your painting talents, climb the leaderboard, win $NIMO
    //       and NFTs!
    //     </p>
    //   </div>

    //   <div
    //     ref={refWhatIsArlequinFourthBlock}
    //     className={`${
    //       inViewWhatIsArlequinFourthBlock
    //         ? 'lg:duration-500 lg:delay-300 lg:transition-all  lg:translate-y-0'
    //         : 'lg:translate-y-20'
    //     }  col-span-4 lg:col-span-2 xl:col-span-1 flex flex-col items-center p-4 shadow-md rounded-2xl`}
    //   >
    //     <img width="80%" height="80%" src="/images/nimo.webp" alt="" />
    //     <p className="font-bold text-xl my-2">$NIMO</p>
    //     <p className="text-lg  text-primary-700">
    //       Buy cosmetics items and more with $NIMO, the official Arlequin
    //       currency!
    //     </p>
    //   </div>
    // </section>

    <section className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <img
            width="100%"
            height="100%"
            src="/images/artist.webp"
            alt="The Artists Metaverse"
          />
        </div>
        <div className="col-span-1 items-center">
          <p className="font-bold text-xl my-2">The Artists Metaverse</p>
          <p className="text-lg text-primary-700">
            Arlequin is a fully community driven Metaverse where Artists have
            the // first role.
          </p>
        </div>
      </div>
    </section>
  );
};
export default WhatIsArlequin;
