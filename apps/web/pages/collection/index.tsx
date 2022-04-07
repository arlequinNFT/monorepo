import * as fcl from '@onflow/fcl';
import { GET_USER_ARLEE_SCENE_NFTS } from '../../cadence/scripts/getUserArleeSceneNFTs';
import { useEffect } from 'react';
import { useAppSelector } from '../../store/hook';

export function Collection() {
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  useEffect(() => {
    const getUserArleeSceneNFTs = async () => {
      if (currentUser?.loggedIn) {
        const res = await fcl.query({
          cadence: GET_USER_ARLEE_SCENE_NFTS,
          args: (arg, t) => [arg(currentUser?.addr, t.Address)],
        });
        console.log(res);
      }
    };
    getUserArleeSceneNFTs();
  }, [currentUser]);
  return <>This is collection page</>;
}

export default Collection;
