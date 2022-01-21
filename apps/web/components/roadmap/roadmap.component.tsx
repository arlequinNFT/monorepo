import Link from 'next/link';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import styles from './roadmap.module.scss';

const Roadmap = () => {
  const { ref: refRoadmapSection, inView: inViewRoadmapSection } = useInView(
    {}
  );
  const { ref: refRoadmapFirstBlock, inView: inViewRoadmapFirstBlock } =
    useInView({});
  const { ref: refRoadmapSecondBlock, inView: inViewRoadmapSecondBlock } =
    useInView({});
  const { ref: refRoadmapThirdBlock, inView: inViewRoadmapThirdBlock } =
    useInView({});
  const { ref: refRoadmapFourthBlock, inView: inViewRoadmapFourthBlock } =
    useInView({});
  const { ref: refRoadmapFifthBlock, inView: inViewRoadmapFifthBlock } =
    useInView({});

  useEffect(() => {
    if (inViewRoadmapSection) {
      registerVideo('#roadmap', 'video');
    }
  }, [inViewRoadmapSection]);

  const registerVideo = (bound: any, video: any) => {
    bound = document.querySelector(bound);
    video = document.querySelector(video);
    const scrollVideo = () => {
      if (video?.duration) {
        const distanceFromTop =
          window.scrollY + bound.getBoundingClientRect().top;
        const rawPercentScrolled =
          (window.scrollY - distanceFromTop) /
          (bound.scrollHeight - window.innerHeight);
        const percentScrolled = Math.min(Math.max(rawPercentScrolled, 0), 1);

        video.currentTime = video.duration * percentScrolled;
      }
      requestAnimationFrame(scrollVideo);
    };
    requestAnimationFrame(scrollVideo);
  };

  return (
    <>
      <section
        ref={refRoadmapSection}
        id="roadmap"
        className={styles['gradient-bg']}
      >
        <img className="w-full" src="/images/cloud_1.svg" alt="cloud_1" />
        <div className="relative grid grid-cols-3 max-w-7xl mx-auto gap-x-4 py-12 px-6">
          <p className={`col-span-3 mx-auto mb-12 text-7xl text-red font-bold`}>
            Roadmap
          </p>

          <div className="col-span-3 lg:col-span-2">
            <div
              ref={refRoadmapFirstBlock}
              className={`${
                inViewRoadmapFirstBlock
                  ? 'lg:duration-[1500ms] lg:translate-x-0 lg:opacity-100 lg:transition-all'
                  : 'lg:-translate-x-10 lg:opacity-0 lg:duration-500 lg:transition-all'
              } bg-red outline-white outline outline-[1rem] relative max-w-3xl p-6 lg:p-12 lg:px-16 mb-8 shadow-2xl rounded-3xl`}
            >
              <p className={`font-bold text-4xl text-white mb-4`}>
                <span className="mr-2">1.</span>Official website is launched!
              </p>

              <ul className="list-[circle] text-white text-2xl px-8">
                <li>Arlequin.gg is out</li>
                <li>Artists can use the alpha version Painter</li>
                <li>Whitelisting for the presale begins</li>
                <li>Partenering with Filecoin</li>
              </ul>
              <p className="text-white text-right">Done in January 2022 </p>
            </div>

            <div
              ref={refRoadmapSecondBlock}
              className={`${
                inViewRoadmapSecondBlock
                  ? 'lg:duration-[1500ms] lg:translate-x-0 lg:opacity-100 lg:transition-all'
                  : 'lg:-translate-x-10 lg:opacity-0 lg:duration-500 lg:transition-all'
              } bg-red relative max-w-3xl p-6 lg:p-12 lg:px-16 mb-8 rounded-3xl`}
            >
              <p className={` font-bold text-4xl text-white mb-4`}>
                <span className="text-secondary-300 mr-2">2.</span> First
                genesis drop & Marketplace
              </p>

              <ul className="list-[circle] text-white text-2xl px-8">
                <li>First ever NFTs drop from Arlequin</li>
                <li>3 bundles containings Arlees, Cosmetic items</li>
                <li>
                  Artists can use the Painter to give their Arlees a unique look
                </li>
                <li>Nimo rewards for Arlees adopters</li>
                <li>Trade your Arlees using our native Marketplace</li>
              </ul>

              <p className="text-white text-right">
                Est. Date: march/april 2022
              </p>
            </div>

            <div
              ref={refRoadmapThirdBlock}
              className={`${
                inViewRoadmapThirdBlock
                  ? 'lg:duration-[1500ms] lg:translate-x-0 lg:opacity-100 lg:transition-all'
                  : 'lg:-translate-x-10 lg:opacity-0 lg:duration-500 lg:transition-all'
              } bg-red relative max-w-3xl p-6 lg:p-12 lg:px-16 mb-8 rounded-3xl`}
            >
              <p className={`font-bold text-4xl text-white mb-4`}>
                <span className="text-secondary-300 mr-2">3.</span> Painting
                contests
              </p>

              <ul className="list-[circle] text-white text-2xl px-8">
                <li>First ever Paint To Earn system in the world</li>
                <li>Participate for free to our weekly painting contests</li>
                <li>Climb the leaderboard, win NFTs and FUSD</li>
                <li>Vote for your preferred entries and earn Nimo</li>
              </ul>

              <p className="text-white text-right">Est. Date: june/july 2022</p>
            </div>

            <div
              ref={refRoadmapFourthBlock}
              className={`${
                inViewRoadmapFourthBlock
                  ? 'lg:duration-[1500ms] lg:translate-x-0 lg:opacity-100 lg:transition-all'
                  : 'lg:-translate-x-10 lg:opacity-0 lg:duration-500 lg:transition-all'
              } bg-red relative max-w-3xl p-6 lg:p-12 lg:px-16 mb-8 rounded-3xl`}
            >
              <p className={`font-bold text-4xl text-white mb-4`}>
                <span className="text-secondary-300 mr-2">4.</span> The Pool
              </p>

              <ul className="list-[circle] text-white text-2xl px-8">
                <li>
                  A pool full of Arlees from already finished painting contests
                </li>
                <li>
                  Buy a random Arlee from the pool at a fixed price in FUSD
                </li>
                <li>Original Artist gets 80% of the revenue</li>
              </ul>

              <p className="text-white text-right">
                Est. Date: july/august 2022
              </p>
            </div>

            <div
              ref={refRoadmapFifthBlock}
              className={`${
                inViewRoadmapFifthBlock
                  ? 'lg:duration-[1500ms] lg:translate-x-0 lg:opacity-100 lg:transition-all'
                  : 'lg:-translate-x-10 lg:opacity-0 lg:duration-500 lg:transition-all'
              } bg-red relative max-w-3xl p-6 lg:p-12 lg:px-16 mb-8 rounded-3xl`}
            >
              <p className={`font-bold text-4xl text-white mb-4`}>
                <span className="text-secondary-300 mr-2">5.</span> The Shop
              </p>

              <ul className="list-[circle] text-white text-2xl px-8">
                <li>
                  Introduction of The Shop, allowing you to buy NFTs with Nimo
                </li>
                <li>
                  Buy cosmetic items for your Arlees, backgrounds, 3D poses and
                  much more
                </li>
                <li>
                  The marketplace now accepts trading of every NFTs in the
                  Arlequin Metaverse
                </li>
              </ul>

              <p className="text-white text-right">
                Est. Date: august/october 2022
              </p>
            </div>
          </div>

          {/* <div className="absolute">
            <video
              className={`col-span-1 sticky top-12 hidden lg:flex `}
              height="800"
              width="800"
            >
              <source src="/videos/arlee_painted.mp4" type="video/mp4"></source>
            </video>
          </div> */}
        </div>
      </section>

      <div className="bg-primary-1200 relative">
        <img
          className="w-full absolute -top-[2px]"
          src="/images/curve_2.svg"
          alt="curve_2"
        />
      </div>
    </>
  );
};
export default Roadmap;
