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
import { setThumbnail } from './mint.reducer';

const Mint = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useAppDispatch();

  const unityContext = useAppSelector((state) => state.painter.unityContext);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const thumbnail = useAppSelector((state) => state.mint.thumbnail);

  const logOut = () => {
    fcl.unauthenticate();
    dispatch(unauthenticate());
    dispatch(emptyPartnersStickersGroup());
    dispatch(disableAllPartners());
  };

  const openMintModal = async () => {
    if (currentUser?.loggedIn) {
      const thumbnail = unityContext.takeScreenshot('image/jpeg', 1.0);

      dispatch(setThumbnail(thumbnail));
      onOpen();
    } else {
      fcl.logIn();
    }
  };

  const requestArtwork = async () => {
    unityContext.send('HudManager', 'RequestArtwork');
  };

  useEffect(() => {
    if (unityContext) {
      unityContext?.on('SendArtwork', async (metadata: string) => {
        const metadataFile = new File([new Blob([metadata])], 'metadata.txt', {
          type: 'text/plain',
        });
        const res: Response = await fetch(thumbnail);
        const blob: Blob = await res.blob();
        const thumbnailFile = new File([blob], 'thumbnail.jpeg', {
          type: 'image/jpeg',
        });

        const cid = await nftstorageClient.storeDirectory([
          metadataFile,
          thumbnailFile,
        ]);

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
      });
    }
  }, [unityContext, thumbnail]);

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
                  onClick={openMintModal}
                >
                  MINT
                </ComponentsButton>
              </div>
            </>
          )}

          {!currentUser?.addr && (
            <>
              <p className="text-white text-xs mb-2">Connect wallet to mint</p>
              <div className="text-center">
                <ComponentsButton color="secondary" rounded onClick={fcl.logIn}>
                  Connect
                </ComponentsButton>
              </div>
            </>
          )}
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>You're going to mint this Arlee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="grid grid-cols-12 gap-x-4 p-4">
              <div className="col-span-6 text-center ">
                <img src={thumbnail} alt="thumbnail" />
                <input
                  className="text-small mt-2 focus:outline-none"
                  maxLength={100}
                  placeholder="a cool description..."
                  type="text"
                />
              </div>

              <div className="flex flex-col col-span-6">
                <ul className="mb-auto">
                  <li>Artist: {currentUser?.addr}</li>
                  <li>Species: Cacatoes</li>
                </ul>
                <div className="flex flex-col mx-auto">
                  <ComponentsButton onClick={requestArtwork} color="secondary">
                    Mint
                  </ComponentsButton>
                  <small className="text-right">12 $F</small>
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
