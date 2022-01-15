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
      <p className="mb-2 text-7xl text-primary font-bold text-center">
        Meet the team
      </p>
      <p className="mb-6 text-3xl text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis quod
        sit magnam tempore veritatis eaque placeat pariatur praesentium.
        Inventore sapiente nihil quas mollitia distinctio officiis quibusdam ab
        alias hic dignissimos.
      </p>
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col items-center mb-6 lg:mb-0">
          <img
            width="80%"
            height="80%"
            src="/images/avatar_placeholder.webp"
            alt=""
          />
          <p className="font-bold text-xl my-1">Kevin Tale</p>
          <p className="text-lg text-primary">Founder of Arlequin</p>
        </div>
        <div className="flex flex-col items-center mb-6 lg:mb-0">
          <img
            width="80%"
            height="80%"
            src="/images/avatar_placeholder.webp"
            alt=""
          />
          <p className="font-bold text-xl my-1 ">Julian Rutherford</p>
          <p className="text-lg text-primary">Blockchain engineer</p>
        </div>
        <div className="flex flex-col items-center mb-6 lg:mb-0">
          <img
            width="80%"
            height="80%"
            src="/images/avatar_placeholder.webp"
            alt=""
          />
          <p className="font-bold text-xl my-1">Lara Branco</p>
          <p className="text-lg text-primary">3D Artist</p>
        </div>
        <div className="flex flex-col items-center mb-6 lg:mb-0">
          <img
            width="80%"
            height="80%"
            src="/images/avatar_placeholder.webp"
            alt=""
          />
          <p className="font-bold text-xl my-1">Hibou Barbu</p>
          <p className="text-lg text-primary">Art Director</p>
        </div>
        <div className="flex flex-col items-center mb-6 lg:mb-0">
          <img
            width="80%"
            height="80%"
            src="/images/avatar_placeholder.webp"
            alt=""
          />
          <p className="font-bold text-xl my-1 ">Antoine B.</p>
          <p className="text-lg text-primary">Unity engineer</p>
        </div>
      </div>
    </section>
  );
};
export default Team;
