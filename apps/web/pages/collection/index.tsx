import * as fcl from '@onflow/fcl';
import { GET_USER_ARLEE_SCENE_NFTS } from '../../cadence/scripts/get_user_arlee_scene_nfts';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { ComponentsButton } from '@arlequin/components/button';
import Link from 'next/link';
import { setArleesCollection } from '../../store/reducers/collection.reducer';

export function Collection() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const arleesCollection = useAppSelector(
    (state) => state.collection.arleesCollection
  );

  useEffect(() => {
    const getUserArleeSceneNFTs = async () => {
      if (currentUser?.loggedIn) {
        const res = await fcl.query({
          cadence: GET_USER_ARLEE_SCENE_NFTS,
          args: (arg, t) => [arg(currentUser?.addr, t.Address)],
        });
        dispatch(setArleesCollection(res));
      }
    };
    getUserArleeSceneNFTs();
  }, [currentUser, dispatch]);

  if (!currentUser?.addr) {
    return (
      <>
        <div className="h-screen grid place-content-center">
          <p>
            Oh no, you're not logged in! Connect your wallet to see your
            collection.
          </p>
          <div className="flex mx-auto py-4">
            <ComponentsButton
              color="secondary"
              rounded
              onClick={(e) => fcl.logIn()}
            >
              Connect
            </ComponentsButton>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <header className="flex justify-end items-center gap-x-4 p-4">
          <p>{currentUser.addr}</p>
          <ComponentsButton
            color="secondary"
            rounded
            outline
            onClick={(e) => fcl.unauthenticate()}
          >
            Logout
          </ComponentsButton>
        </header>
        <div className="p-6">
          {arleesCollection.length > 0 && (
            <>
              <h1 className="text-2xl mb-4">My Arlees</h1>
              <div className="grid gap-8 grid-cols-auto-xl">
                {arleesCollection.map((item, index) => (
                  <Link key={index} href={`/viewer?cid=${item.cid}`}>
                    <a>
                      <div className="cursor-pointer shadow-md">
                        <img
                          src={`https://${item.cid}.ipfs.nftstorage.link/thumbnail.jpeg`}
                        />
                        <div className="bg-white p-4">
                          <p className="uppercase">Lorem ispum</p>
                          <p>Lorem ispum</p>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </>
          )}
          {arleesCollection.length === 0 && (
            <p>Oh no! You don't have any Arlee yet :(</p>
          )}
        </div>
      </>
    );
  }
}

export default Collection;
