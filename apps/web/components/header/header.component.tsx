import Link from 'next/link';
import React from 'react';
import { useInView } from 'react-intersection-observer';

const Header = () => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  return (
    <header
      className={`bg-transparent max-w-5xl mx-auto 3xl:max-w-7xl lg:py-4`}
    >
      <div
        ref={ref}
        className={`${
          inView
            ? 'duration-1000 transition-all opacity-1 translate-y-0'
            : '-translate-y-5 opacity-0'
        } flex flex-col md:flex-row items-center max-w-7xl mx-auto py-4`}
      >
        <Link href="/">
          <a className="order-3 md:order-1 font-extrabold text-7xl py-4 md:py-0 md:text-5xl text-rainbow">
            Arlequin
          </a>
        </Link>
        <ul className="order-2 md:order-2 flex flex-1 justify-end items-center gap-x-6 px-12">
          <li className="text-white text-xl hover:underline cursor-pointer font-bold">
            <Link href="/animal-welfare">Animal Welfare</Link>
          </li>
          {/* <li className="text-white text-2xl hover:underline cursor-pointer font-bold">
            Whitepaper
          </li> */}
        </ul>
        <ul className="order-1 md:order-3 flex items-center gap-x-2 md:ml-auto">
          <li>
            <a
              href="https://discord.gg/rBPP7uxnwd"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/icons/discord.svg"
                alt="Discord icon"
                width="48px"
                height="48px"
              />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/arlequinNFT"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/icons/twitter.svg"
                alt="Twitter icon"
                width="48px"
                height="48px"
              />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};
export default Header;
