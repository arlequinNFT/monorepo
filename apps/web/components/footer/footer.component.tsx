import Link from 'next/link';
import React from 'react';
import { useInView } from 'react-intersection-observer';

const Footer = () => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  return (
    <footer className="text-white relative">
      <div className="h-1 w-full bg-white absolute -top-[1px]"></div>
      <img className="w-full" src="/images/cloud_2.svg" alt="cloud_2" />
      <div
        ref={ref}
        className={`${
          inView ? 'duration-1000 transition-all opacity-1' : 'opacity-0'
        } flex justify-between max-w-7xl mx-auto py-14 px-6 text-center lg:text-left`}
      >
        <div className="flex-1">
          <Link href="/">
            <a className="col-span-4 font-extrabold text-2xl sm:text-6xl text-rainbow">
              Arlequin
            </a>
          </Link>
          <p className="text-white text-xl">
            Copyright © {new Date().getFullYear()} arlequin.gg
          </p>
          <p className="text-white text-xl">
            contact@arlequin.gg
          </p>
        </div>

        <div className="flex gap-x-4">
          <a
            href="https://discord.gg/rBPP7uxnwd"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/icons/discord.svg"
              alt="Discord icon"
              width="65px"
              height="65px"
            />
          </a>
          <a
            href="https://twitter.com/arlequinNFT"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/icons/twitter.svg"
              alt="Twitter icon"
              width="65px"
              height="65px"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
