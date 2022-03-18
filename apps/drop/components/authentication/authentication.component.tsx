import { useEffect } from 'react';

import * as fcl from '@onflow/fcl';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setCurrentUser, User } from '../../store/reducers/auth.reducer';

const Authentication = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const connect = () => {
    fcl.authenticate();
  };

  const unauthenticate = async () => {
    await fcl.unauthenticate();
    dispatch(setCurrentUser(null));
  };

  useEffect(
    () =>
      fcl.currentUser.subscribe((user: User) => {
        dispatch(setCurrentUser(user));
      }),
    [dispatch]
  );

  return (
    <>
      {!currentUser?.loggedIn && (
        <button onClick={(e) => connect()}>connect</button>
      )}
      {currentUser?.loggedIn && (
        <button onClick={(e) => unauthenticate()}>
          {' '}
          {currentUser.addr} logout
        </button>
      )}
    </>
  );
};

export default Authentication;
