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
        }  max-w-7xl mx-auto p-4 flex items-center`}
      >
        <Link href="/">
          <a className="col-span-4 font-extrabold text-2xl sm:text-5xl text-rainbow">
            Arlequin
          </a>
        </Link>
        <ul className="flex flex-1 justify-end gap-x-2">
          <li>
            <a
              href="https://discord.gg/rBPP7uxnwd"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/icons/discord.svg"
                alt="Discord icon"
                width="64px"
                height="64px"
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
                width="64px"
                height="64px"
              />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};
export default Header;
