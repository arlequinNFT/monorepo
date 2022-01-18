import React from 'react';
import { useInView } from 'react-intersection-observer';

const Team = () => {
  const { ref, inView } = useInView({});

  return (
    <section
      ref={ref}
      className={`${
        inView
          ? 'lg:duration-1000 lg:translate-y-0 lg:opacity-100 lg:transition-all'
          : 'lg:translate-y-10 lg:opacity-0 lg:duration-500 lg:transition-all'
      } max-w-7xl mx-auto py-12 lg:pt-32 3xl:pt-56`}
    >
      <p className="mb-2 text-7xl text-purple font-bold text-center">
        Meet the team
      </p>
      <p className="mb-6 p-6 text-3xl text-center text-purple">
        We're a bunch of passionate folks (mostly from France 🥖) who've been
        working in tech and art fields for many years. Our mission is to create
        a fun game anyone can join for free and still earn NFTs!
      </p>
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col items-center mb-6 lg:mb-0">
          <img
            width="80%"
            height="80%"
            src="/images/avatar_placeholder.webp"
            alt=""
          />
          <p className="font-bold text-purple text-xl my-1">Kevin Tale</p>
          <p className="text-lg ">Founder of Arlequin</p>
        </div>
        <div className="flex flex-col items-center mb-6 lg:mb-0">
          <img
            width="80%"
            height="80%"
            src="/images/avatar_placeholder.webp"
            alt=""
          />
          <p className="font-bold text-purple text-xl my-1 ">
            Julian Rutherford
          </p>
          <p className="text-lg ">Blockchain engineer</p>
        </div>
        <div className="flex flex-col items-center mb-6 lg:mb-0">
          <img
            width="80%"
            height="80%"
            src="/images/avatar_placeholder.webp"
            alt=""
          />
          <p className="font-bold text-purple text-xl my-1">Lara Branco</p>
          <p className="text-lg ">3D Artist</p>
        </div>
        <div className="flex flex-col items-center mb-6 lg:mb-0">
          <img
            width="80%"
            height="80%"
            src="/images/avatar_placeholder.webp"
            alt=""
          />
          <p className="font-bold text-purple text-xl my-1">Hibou Barbu</p>
          <p className="text-lg ">Art Director</p>
        </div>
        <div className="flex flex-col items-center mb-6 lg:mb-0">
          <img
            width="80%"
            height="80%"
            src="/images/avatar_placeholder.webp"
            alt=""
          />
          <p className="font-bold text-purple text-xl my-1 ">Antoine B.</p>
          <p className="text-lg ">Unity engineer</p>
        </div>
      </div>
    </section>
  );
};
export default Team;
