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

              <p className={`text-white text-2xl`}>
                Arlequin.gg is out! You can try the{' '}
                <a
                  href="https://painter.arlequin.gg/"
                  className="italic underline font-bold"
                >
                  Painter
                </a>{' '}
                and show the world your beautiful Arlees! <br />
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
                  ? 'lg:duration-[1500ms] lg:translate-x-0 lg:opacity-100 lg:transition-all'
                  : 'lg:-translate-x-10 lg:opacity-0 lg:duration-500 lg:transition-all'
              } bg-red relative max-w-3xl p-6 lg:p-12 lg:px-16 mb-8 rounded-3xl`}
            >
              <p className={` font-bold text-4xl text-white mb-4`}>
                <span className="text-secondary-300 mr-2">2.</span> First
                genesis drop
              </p>

              <p className={`text-white text-2xl`}>
                10k packs, 3 bundles. One pig, one deer, one shiba inu. <br />{' '}
                This is our first genesis drop, and the first and last time
                these Arlees species are available in the realm of Arlequin.
              </p>
              <br />
              <p className={`text-white text-2xl font-bold`}>
                Owning Arlees offers you the possibility to vote during painting
                contests which also make you earn Nimo!
              </p>

              <p className="text-white text-right">Est. Date: march 2022</p>
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
                <span className="text-secondary-300 mr-2">3.</span> Marketplace
              </p>

              <p className={`text-white text-2xl`}>
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
                  ? 'lg:duration-[1500ms] lg:translate-x-0 lg:opacity-100 lg:transition-all'
                  : 'lg:-translate-x-10 lg:opacity-0 lg:duration-500 lg:transition-all'
              } bg-red relative max-w-3xl p-6 lg:p-12 lg:px-16 mb-8 rounded-3xl`}
            >
              <p className={`font-bold text-4xl text-white mb-4`}>
                <span className="text-secondary-300 mr-2">4.</span> Painting
                contests
              </p>

              <p className={`text-white text-2xl`}>
                Each week, a new painting contest is set up for anyone in the
                world to show off their talents by painting on a new Arlee
                species and climb the leaderboard to win NFTs and FUSD!
              </p>
              <br />
              <p className={`text-white text-2xl font-bold`}>
                The winner gets his or her submission minted as NFTs and send to
                his or her collection! The top 5 also win FUSD!
              </p>
              <br />
              <p className={`text-white text-2xl`}>
                This is what we call the Paint To Earn. <br />
                And guess what, it is 100% free to play!
              </p>

              <p className="text-white text-right">Est. Date: june 2022</p>
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
                <span className="text-secondary-300 mr-2">5.</span> The Pool
              </p>

              <p className={`text-white text-2xl`}>
                At the end of each contest, the top 30% Arlees entries are send
                to the pool. <br />
                Anyone can buy (in FUSD) an Arlee from that pool which is a
                random process, meaning that you don't know what species, what
                look or what rank the Arlee will be!
              </p>
              <br />
              <p className={`text-white text-2xl font-bold`}>
                80% of the revenue are send to the original artist! That's
                right: you can earn money even without reaching the top 5, and
                all that for free!
              </p>

              <p className="text-white text-right">Est. Date: august 2022</p>
            </div>

            <div
              ref={refRoadmapSixthBlock}
              className={`${
                inViewRoadmapSixthBlock
                  ? 'lg:duration-[1500ms] lg:translate-x-0 lg:opacity-100 lg:transition-all'
                  : 'lg:-translate-x-10 lg:opacity-0 lg:duration-500 lg:transition-all'
              } bg-red relative max-w-3xl p-6 lg:p-12 lg:px-16 mb-8 rounded-3xl`}
            >
              <p className={`font-bold text-4xl text-white mb-4`}>
                <span className="text-secondary-300 mr-2">6.</span> More
                customization!
              </p>

              <p className={` text-white text-2xl`}>
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
