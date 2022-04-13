import { ComponentsButton } from '@arlequin/components/button';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import * as fcl from '@onflow/fcl';
import { unauthenticate } from '../../store/reducers/auth.reducer';
import { disableAllPartners } from '../partners/partners.reducer';
import { emptyPartnersStickersGroup } from '../stickers/stickers.reducer';
import { useEffect } from 'react';
import { MINT_ARLEE_SCENE_NFT } from '../../cadence/transactions/ArleeScene/mintArleeSceneNFT';
import { nftstorageClient } from '../../configs/nftstorage';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { setImage } from './mint.reducer';

const Mint = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useAppDispatch();

  const unityContext = useAppSelector((state) => state.painter.unityContext);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const image = useAppSelector((state) => state.mint.image);

  const logOut = () => {
    fcl.unauthenticate();
    dispatch(unauthenticate());
    dispatch(emptyPartnersStickersGroup());
    dispatch(disableAllPartners());
  };

  const mint = async () => {
    if (currentUser?.loggedIn) {
      unityContext.send('HudManager', 'RequestArtwork');
    } else {
      fcl.logIn();
    }
  };

  const requestAvatar = async () => {
    unityContext.send('HudManager', 'RequestAvatar');
  };

  useEffect(() => {
    if (unityContext) {
      unityContext.on('SendAvatar', async (avatar) => {
        const image = `data:image/png;base64,${avatar}`;
        dispatch(setImage(image));
        onOpen();
      });
    }
  }, [unityContext, onOpen, dispatch]);

  useEffect(() => {
    if (unityContext) {
      unityContext?.on(
        'SendArtwork',
        async (metadata: string, thumbnail: string) => {
          const files = [
            new File([new Blob([metadata])], 'metadata.txt', {
              type: 'text/plain',
            }),
            new File([new Blob([thumbnail])], 'thumbnail.txt', {
              type: 'text/plain',
            }),
          ];

          const cid = await nftstorageClient.storeDirectory(files);

          if (cid) {
            const res = await fcl.mutate({
              cadence: MINT_ARLEE_SCENE_NFT,
              limit: 999,
              args: (arg, t) => [
                arg(cid, t.String),
                arg('description', t.String),
              ],
            });
            await fcl.tx(res).onceSealed();
          }
        }
      );
    }
  }, [unityContext]);

  return (
    <>
      <div>
        <div className="p-3 bg-black-600">
          {currentUser?.addr && (
            <>
              <p
                className="  text-white text-xs underline cursor-pointer mb-2"
                onClick={logOut}
              >
                Log out
              </p>
              <div className="text-center">
                <ComponentsButton
                  color="secondary"
                  rounded
                  onClick={requestAvatar}
                >
                  MINT
                </ComponentsButton>
              </div>
            </>
          )}

          {!currentUser?.addr && (
            <>
              <p className="text-white text-xs mb-2">
                Connect wallet to unlock all features
              </p>
              <div className="text-center">
                <ComponentsButton color="secondary" rounded onClick={fcl.logIn}>
                  Connect
                </ComponentsButton>
              </div>
            </>
          )}
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>You're going to mint this Arlee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex justify-center p-4">
              <img
                className="object-contain w-2/3"
                src={image}
                alt="thumbnail"
              />
            </div>
            <div>
              <p className="text-center text-xl py-4">
                The Zeedz contest is currently running! <br /> Participate to
                win NFTs and $FLOW!{' '}
                <span className="underline">More infos</span>
              </p>
              <div className="grid grid-cols-12 py-4">
                <div className="col-span-6 border-r-4 flex flex-col p-8">
                  <ComponentsButton color="secondary" rounded>
                    Mint
                  </ComponentsButton>
                  <small className="text-right">12 $F</small>
                </div>
                <div className="col-span-6 flex flex-col p-8">
                  <ComponentsButton color="secondary" rounded>
                    Mint + Participate
                  </ComponentsButton>
                  <small className="text-right">15 $F</small>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Mint;
