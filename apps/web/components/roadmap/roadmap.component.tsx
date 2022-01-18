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
  const { ref: refRoadmapSixthBlock, inView: inViewRoadmapSixthBlock } =
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

  // bg-[#d9d9ff];
  // bg-[#ffe6ea]
  // bg-red

  return (
    <>
      <section
        ref={refRoadmapSection}
        id="roadmap"
        className={styles['gradient-bg']}
      >
        <img className="w-full" src="/images/cloud_1.svg" alt="cloud_1" />
        <div className="relative grid grid-cols-3 max-w-7xl mx-auto gap-x-4 py-12">
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
              } bg-red relative max-w-3xl p-6 lg:p-12 lg:px-16 mb-8 shadow-2xl rounded-xl`}
            >
              <p className={`font-bold text-4xl text-white mb-4`}>
                <span className=" mr-2 ">1.</span>Official website is launched!
              </p>

              <p className={`text-white text-xl`}>
                Arlequin.gg is out! You can try the{' '}
                <a
                  href="https://painter.arlequin.gg/"
                  className="italic underline font-bold"
                >
                  Painter
                </a>{' '}
                and show the world your beautiful Arlees by generating an avatar
                and brag on Twitter! <br />
                We are working hard on adding more and more cool Arlees,
                enhanching the Painter and
                <span className="font-bold">
                  {' '}
                  preparing for the genesis drop.
                </span>
              </p>
            </div>

            <div
              ref={refRoadmapSecondBlock}
              className={`${
                inViewRoadmapSecondBlock
                  ? 'lg:duration-[1500ms] lg:translate-x-0 lg:opacity-60 lg:transition-all'
                  : 'lg:-translate-x-10 lg:opacity-0 lg:duration-500 lg:transition-all'
              } bg-red relative max-w-3xl p-6 lg:p-12 lg:px-16 mb-8 rounded-xl`}
            >
              <p className={` font-bold text-4xl text-white mb-4`}>
                <span className="text-secondary-300 mr-2">2.</span> First
                genesis drop
              </p>

              <p className={`text-white text-xl`}>
                10k packs, 3 bundles. One pig, one deer, one shiba inu. This is
                our first genesis drop, and the first and last time these Arlees
                species are available in the realm of Arlequin.
              </p>
              <br />
              <p className={`text-white text-xl`}>
                Owning Arlees is important because it is the only way to vote!
                Each Arlee gives you a number of Vote Points to distribute
                during painting contests, which will make you earn Nimo!
              </p>

              <p className="text-white text-right">Est. Date: march 2022</p>
            </div>

            <div
              ref={refRoadmapThirdBlock}
              className={`${
                inViewRoadmapThirdBlock
                  ? 'lg:duration-[1500ms] lg:translate-x-0 lg:opacity-60 lg:transition-all'
                  : 'lg:-translate-x-10 lg:opacity-0 lg:duration-500 lg:transition-all'
              } bg-red relative max-w-3xl p-6 lg:p-12 lg:px-16 mb-8 rounded-xl`}
            >
              <p className={`font-bold text-4xl text-white mb-4`}>
                <span className="text-secondary-300 mr-2">3.</span> Marketplace
              </p>

              <p className={`text-white text-xl`}>
                Do you want to trade some cute Arlees? The marketplace is here!{' '}
                <br />
                Many other NFTs will be tradeable using the Marketplace, like
                cosmetics items for example. These NFTs will be introduced
                throughout the year so please be patient!
              </p>
              <p className="text-white text-right">Est. Date: april 2022</p>
            </div>

            <div
              ref={refRoadmapFourthBlock}
              className={`${
                inViewRoadmapFourthBlock
                  ? 'lg:duration-[1500ms] lg:translate-x-0 lg:opacity-60 lg:transition-all'
                  : 'lg:-translate-x-10 lg:opacity-0 lg:duration-500 lg:transition-all'
              } bg-red relative max-w-3xl p-6 lg:p-12 lg:px-16 mb-8 rounded-xl`}
            >
              <p className={`font-bold text-4xl text-white mb-4`}>
                <span className="text-secondary-300 mr-2">4.</span> Painting
                contests
              </p>

              <p className={`text-white text-xl`}>
                Each month, two painting contests are set up for every artists
                in the world to show off their talents by painting on new Arlees
                species and climb the leaderboard to win NFTs and Nimo!
              </p>
              <br />
              <p className={`text-white text-xl`}>
                The top 5 will get their submissions minted as NFTs and send to
                their collection, the top 15 will get Nimo.
              </p>
              <br />
              <p className={`text-white text-xl`}>
                This is what we call the Paint To Earn. <br />
                And guess what, it is 100% free to play!
              </p>

              <p className="text-white text-right">Est. Date: june 2022</p>
            </div>

            <div
              ref={refRoadmapFifthBlock}
              className={`${
                inViewRoadmapFifthBlock
                  ? 'lg:duration-[1500ms] lg:translate-x-0 lg:opacity-60 lg:transition-all'
                  : 'lg:-translate-x-10 lg:opacity-0 lg:duration-500 lg:transition-all'
              } bg-red relative max-w-3xl p-6 lg:p-12 lg:px-16 mb-8 rounded-xl`}
            >
              <p className={`font-bold text-4xl text-white mb-4`}>
                <span className="text-secondary-300 mr-2">5.</span> The Pool
              </p>

              <p className={`text-white text-xl`}>
                The pool is where the non-winning painting contests entries go.
                At the end of each contest, 30% of all non-winning Arlees
                submissions are send to the pool. <br />
                Anyone can buy (in FUSD) an Arlee from that pool which is a
                random process, meaning that you don't know what species or what
                look your Arlee will be!
              </p>
              <br />
              <p className={`text-white text-xl`}>
                The revenue from each sale will be split between Arlequin
                treasury and the original artist! Meaning that the artist will
                earn money even without reaching the top places!
              </p>

              <p className="text-white text-right">Est. Date: august 2022</p>
            </div>

            <div
              ref={refRoadmapSixthBlock}
              className={`${
                inViewRoadmapSixthBlock
                  ? 'lg:duration-[1500ms] lg:translate-x-0 lg:opacity-60 lg:transition-all'
                  : 'lg:-translate-x-10 lg:opacity-0 lg:duration-500 lg:transition-all'
              } bg-red relative max-w-3xl p-6 lg:p-12 lg:px-16 mb-8 rounded-xl`}
            >
              <p className={`font-bold text-4xl text-white mb-4`}>
                <span className="text-secondary-300 mr-2">6.</span> More
                customization!
              </p>

              <p className={` text-white text-xl`}>
                A lot of way to customize your Arlees will be added like
                cosmetics items, poses, backgrounds... <br />
                These customizations are buyable with Nimo.
              </p>

              <p className="text-white text-right">Est. Date: august 2022</p>
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
