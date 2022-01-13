import React from 'react';

const Team = () => {
  return (
    <section className="max-w-7xl mx-auto py-12 px-6 lg:pt-32 lg:pb-16 3xl:pt-52 xl:pb-24">
      <p className="mb-8 text-7xl text-primary-800 font-bold text-center">
        Meet the team
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
          <p className="text-lg text-primary-700">Founder of Arlequin</p>
        </div>
        <div className="flex flex-col items-center mb-6 lg:mb-0">
          <img
            width="80%"
            height="80%"
            src="/images/avatar_placeholder.webp"
            alt=""
          />
          <p className="font-bold text-xl my-1 ">Julian Rutherford</p>
          <p className="text-lg text-primary-700">Blockchain engineer</p>
        </div>
        <div className="flex flex-col items-center mb-6 lg:mb-0">
          <img
            width="80%"
            height="80%"
            src="/images/avatar_placeholder.webp"
            alt=""
          />
          <p className="font-bold text-xl my-1">Lara Branco</p>
          <p className="text-lg text-primary-700">3D Artist</p>
        </div>
        <div className="flex flex-col items-center mb-6 lg:mb-0">
          <img
            width="80%"
            height="80%"
            src="/images/avatar_placeholder.webp"
            alt=""
          />
          <p className="font-bold text-xl my-1">Hibou Barbu</p>
          <p className="text-lg text-primary-700">Art Director</p>
        </div>
        <div className="flex flex-col items-center mb-6 lg:mb-0">
          <img
            width="80%"
            height="80%"
            src="/images/avatar_placeholder.webp"
            alt=""
          />
          <p className="font-bold text-xl my-1 ">Antoine B.</p>
          <p className="text-lg text-primary-700">Unity engineer</p>
        </div>
      </div>
    </section>
  );
};
export default Team;
