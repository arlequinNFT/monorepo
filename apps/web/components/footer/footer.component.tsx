import React from 'react';
import { FaMediumM, FaDiscord, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="mt-auto flex p-4 justify-end">
      <ul className="flex gap-x-2">
        <li>
          <a
            href="https://discord.gg/arlequin"
            target="_blank"
            rel="noreferrer"
          >
            <FaDiscord size={'2em'}></FaDiscord>
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/arlequinNFT"
            target="_blank"
            rel="noreferrer"
          >
            <FaTwitter size={'2em'}></FaTwitter>
          </a>
        </li>
        <li>
          <a
            href="https://medium.com/@arlequinnft"
            target="_blank"
            rel="noreferrer"
          >
            <FaMediumM size={'2em'}></FaMediumM>
          </a>
        </li>
      </ul>
    </footer>
  );
};
export default Footer;
