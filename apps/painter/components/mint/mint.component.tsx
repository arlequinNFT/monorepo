import { ComponentsButton } from '@arlequin/components/button';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setWithContestParticipation } from './mint.reducer';
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
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

const Mint = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useAppDispatch();

  const unityContext = useAppSelector((state) => state.painter.unityContext);
  const withContestParticipation = useAppSelector(
    (state) => state.mint.withContestParticipation
  );
  const price = useAppSelector((state) => state.mint.price);
  const currentUser = useAppSelector((state) => state.auth.currentUser);

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
              <div className="flex gap-x-4">
                <ComponentsButton color="secondary" rounded onClick={onOpen}>
                  MINT
                </ComponentsButton>
                <ComponentsButton color="secondary" rounded onClick={onOpen}>
                  SUBMIT
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

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>salut</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Mint;
