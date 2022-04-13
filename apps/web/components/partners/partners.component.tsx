import { useAppDispatch, useAppSelector } from '../../store/hook';
import { enablePartner } from './partners.reducer';
import * as fcl from '@onflow/fcl';
import React from 'react';
import { MINT_ARLEE_PARTNER_NFT } from '../../cadence/transactions/ArleePartner/mintArleePartnerNFT';
import {
  setPartnersStickersGroup,
  Sticker,
} from '../stickers/stickers.reducer';

const Partners = () => {
  const dispatch = useAppDispatch();

  const list = useAppSelector((state) => state.partners.list);

  const unlock = (partnerName: string) => {
    const mintPartnerNFT = async () => {
      const res = await fcl.mutate({
        cadence: MINT_ARLEE_PARTNER_NFT,
        limit: 999,
        args: (arg, t) => [arg(partnerName, t.String)],
      });
      await fcl.tx(res).onceSealed();

      dispatch(enablePartner({ partnerName }));
      switch (partnerName) {
        case 'CryptoPiggos':
          {
            const piggosStickersRes = await fetch(
              'https://bafkreiashukkbjdtzggebjeq7h5fzh52hd3mozeqr7ts474jkliuxmmkvm.ipfs.nftstorage.link/'
            );
            const piggosStickers: { list: Sticker[] } =
              await piggosStickersRes.json();

            dispatch(
              setPartnersStickersGroup({
                name: 'CryptoPiggos',
                stickers: piggosStickers.list,
              })
            );
          }
          break;

        default:
          break;
      }
    };

    mintPartnerNFT();
  };

  return (
    <>
      <p className="text-black-200 font-bold text-[0.875rem]">
        Purchase our PartnerNFT to unlock new features!
      </p>
      <hr className="my-6 w-1/2" />
      {list.map((l, index) => (
        <div className="mb-4" key={index}>
          <h2 className="text-white text-2xl font-bold">{l.name}</h2>

          <div className="flex w-full justify-center">
            {l.enabled ? (
              <p className="text-white uppercase">Unlocked!</p>
            ) : (
              <button
                onClick={(e) => unlock(l.name)}
                className="py-4 px-6 text-white bg-red uppercase rounded-full"
              >
                Unlock (3 $FLOW)
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Partners;
