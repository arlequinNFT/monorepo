import React from 'react';
import { useEffect } from 'react';
import * as fcl from '@onflow/fcl';
import { useAppDispatch } from '../../store/hook';
import { setCurrentUser } from '../../store/reducers/auth.reducer';

const Layout = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(
    () =>
      fcl.currentUser.subscribe((user) => {
        dispatch(setCurrentUser(user));
      }),
    [dispatch]
  );
  return <>{children}</>;
};
export default Layout;
