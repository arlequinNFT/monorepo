import { ComponentsButton } from '@arlequin/components/button';
import Link from 'next/link';
import React from 'react';
import * as fcl from '@onflow/fcl';
import { useAppDispatch, useAppSelector } from '../../store/hook';

const Header = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  return (
    <header className="flex justify-between w-full max-w-5xl mx-auto 3xl:max-w-7xl lg:py-4">
      <Link href="/">
        <a className="font-extrabold text-7xl py-4 md:py-0 md:text-5xl text-rainbow">
          Arlequin
        </a>
      </Link>

      {!currentUser?.loggedIn && (
        <div>
          <ComponentsButton
            color="secondary"
            rounded
            onClick={(e) => fcl.logIn()}
          >
            Connect Wallet
          </ComponentsButton>
        </div>
      )}

      {currentUser?.loggedIn && (
        <div>
          <ComponentsButton onClick={(e) => fcl.logIn()}>
            {currentUser.addr}
          </ComponentsButton>
        </div>
      )}
    </header>
  );
};
export default Header;
