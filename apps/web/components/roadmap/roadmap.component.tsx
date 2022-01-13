import Link from 'next/link';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const Roadmap = () => {
  const { ref: refRoadmapSection, inView: inViewRoadmapSection } = useInView(
    {}
  );
  const { ref: refRoadmapFirstTitle, inView: inViewRoadmapFirstTitle } =
    useInView({});
  const { ref: refRoadmapFirstText, inView: inViewRoadmapFirstText } =
    useInView({});
  const { ref: refRoadmapSecondTitle, inView: inViewRoadmapSecondTitle } =
    useInView({});
  const { ref: refRoadmapSecondText, inView: inViewRoadmapSecondText } =
    useInView({});
  const { ref: refRoadmapThirdTitle, inView: inViewRoadmapThirdTitle } =
    useInView({});
  const { ref: refRoadmapThirdText, inView: inViewRoadmapThirdText } =
    useInView({});
  const { ref: refRoadmapFourthTitle, inView: inViewRoadmapFourthTitle } =
    useInView({});
  const { ref: refRoadmapFourthText, inView: inViewRoadmapFourthText } =
    useInView({});
  const { ref: refRoadmapFifthTitle, inView: inViewRoadmapFifthTitle } =
    useInView({});
  const { ref: refRoadmapFifthText, inView: inViewRoadmapFifthText } =
    useInView({});
  const { ref: refRoadmapSixthTitle, inView: inViewRoadmapSixthTitle } =
    useInView({});
  const { ref: refRoadmapSixthText, inView: inViewRoadmapSixthText } =
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
      if (video.duration) {
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
        className="bg-primary-1200 relative"
      >
        <div className=" w-full h-1 -top-[1px] bg-white absolute"></div>
        <img className="w-full" src="/images/cloud_1.svg" alt="cloud_1" />
        <div className="relative grid grid-cols-3 max-w-7xl mx-auto gap-x-4 py-12 lg:pt-36 lg:pb-48 px-6">
          <p className={`col-span-3 mx-auto mb-12 text-7xl text-white`}>
            Roadmap
          </p>

          <div className="col-span-3 lg:col-span-2">
            <div className=" bg-primary-1100 relative max-w-3xl p-6 lg:p-12 lg:px-16 mb-4 shadow-lg rounded-xl">
              <p
                ref={refRoadmapFirstTitle}
                className={`${
                  inViewRoadmapFirstTitle
                    ? 'transition-all duration-500 opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-10'
                } font-bold text-2xl text-secondary-500 mb-4`}
              >
                <span className=" mr-2 ">1.</span>Official website is launched!
              </p>

              <p
                ref={refRoadmapFirstText}
                className={`${
                  inViewRoadmapFirstText
                    ? 'transition-all duration-500 delay-100 opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-10'
                } text-white text-lg`}
              >
                Arlequin.gg is out! You can try the{' '}
                <Link href="/playground">
                  <a className="italic underline font-bold text-white">
                    Painter
                  </a>
                </Link>{' '}
                and show the world your beautiful Arlees by generating an avatar
                and brag on Twitter! We are working hard on adding more and more
                cool Arlees, enhanching the Painter and
                <span className="font-bold">
                  {' '}
                  preparing for the genesis drop.
                </span>
              </p>
            </div>

            <div className="max-w-3xl opacity-50 my-8 p-6 lg:p-12 lg:px-16 bg-primary-1100 rounded-xl">
              <p
                ref={refRoadmapSecondTitle}
                className={`${
                  inViewRoadmapSecondTitle
                    ? 'transition-all duration-500 opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-10'
                } font-bold text-2xl text-white mb-4`}
              >
                <span className="text-secondary-300 mr-2">2.</span> First
                genesis drop
              </p>

              <p
                ref={refRoadmapSecondText}
                className={`${
                  inViewRoadmapSecondText
                    ? 'transition-all duration-500 delay-100 opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-10'
                } text-white text-lg`}
              >
                10k packs, 3 bundles. This is the first ever drop from Arlequin.
                You will be able to grab some cool Arlees from our 3 bundles.
              </p>

              <p className="text-white text-right">Est. Date: march 2022</p>
            </div>

            <div className="max-w-3xl opacity-50 my-8 p-6 lg:p-12 lg:px-16 bg-primary-1100  rounded-xl">
              <p
                ref={refRoadmapThirdTitle}
                className={`${
                  inViewRoadmapThirdTitle
                    ? 'transition-all duration-500 opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-10'
                } font-bold text-2xl text-white mb-4`}
              >
                <span className="text-secondary-300 mr-2">3.</span> Marketplace
              </p>

              <p
                ref={refRoadmapThirdText}
                className={`${
                  inViewRoadmapThirdText
                    ? 'transition-all duration-500 delay-100 opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-10'
                } text-white text-lg`}
              >
                Do you want to trade some cute Arlees? The marketplace is here!
              </p>
              <p className="text-white text-right">Est. Date: april 2022</p>
            </div>

            <div className="max-w-3xl opacity-50 my-8 p-6 lg:p-12 lg:px-16 bg-primary-1100  rounded-xl">
              <p
                ref={refRoadmapFourthTitle}
                className={`${
                  inViewRoadmapFourthTitle
                    ? 'transition-all duration-500 opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-10'
                } font-bold text-2xl text-white mb-4`}
              >
                <span className="text-secondary-300 mr-2">4.</span> Painting
                contests
              </p>

              <p
                ref={refRoadmapFourthText}
                className={`${
                  inViewRoadmapFourthText
                    ? 'transition-all duration-500 delay-100 opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-10'
                } text-white text-lg`}
              >
                Each month, two painting contests are set up for every artists
                in the world to show off their talents by painting on new Arlees
                species. You can also vote for your preferred entries and obtain
                1 $NIMO per 1 vote distributed! This is what we call the Paint
                To Earn.
              </p>

              <p className="text-white text-right">Est. Date: june 2022</p>
            </div>

            <div className="max-w-3xl opacity-50 my-8 p-6 lg:p-12 lg:px-16 bg-primary-1100  rounded-xl">
              <p
                ref={refRoadmapFifthTitle}
                className={`${
                  inViewRoadmapFifthTitle
                    ? 'transition-all duration-500 opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-10'
                } font-bold text-2xl text-white mb-4`}
              >
                <span className="text-secondary-300 mr-2">5.</span> The Pool
              </p>

              <p
                ref={refRoadmapFifthText}
                className={`${
                  inViewRoadmapFifthText
                    ? 'transition-all duration-500 delay-100 opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-10'
                } text-white text-lg`}
              >
                The pool is where the non-winning painting contests entries go.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit
              </p>

              <p className="text-white text-right">Est. Date: august 2022</p>
            </div>

            <div className="max-w-3xl opacity-50 my-8 p-6 lg:p-12 lg:px-16 bg-primary-1100  rounded-xl">
              <p
                ref={refRoadmapSixthTitle}
                className={`${
                  inViewRoadmapSixthTitle
                    ? 'transition-all duration-500 opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-10'
                } font-bold text-2xl text-white mb-4`}
              >
                <span className="text-secondary-300 mr-2">6.</span> Cosmetics
                items
              </p>

              <p
                ref={refRoadmapSixthText}
                className={`${
                  inViewRoadmapSixthText
                    ? 'transition-all duration-500 delay-100 opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-10'
                } text-white text-lg`}
              >
                More customization! Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Quae in non sapiente explicabo corrupti ut
                molestias quod pariatur vitae odio, necessitatibus ipsa magni
                tempore ducimus officiis aspernatur? Perspiciatis, aliquam
                deserunt.
              </p>

              <p className="text-white text-right">Est. Date: october 2022</p>
            </div>
          </div>

          <video className={` col-span-1 sticky top-12 hidden lg:flex`}>
            <source src="/videos/arlee_painted.mp4" type="video/mp4"></source>
          </video>
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
