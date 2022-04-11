import { useAppDispatch, useAppSelector } from '../../store/hook';
import { enablePartner, setAllPartners } from './partners.reducer';
import * as fcl from '@onflow/fcl';
import React, { useEffect } from 'react';
import { MINT_ARLEE_PARTNER_NFT } from '../../cadence/transactions/ArleePartner/mintArleePartnerNFT';
import { GET_ALL_PARTNERS_MINTABLE } from '../../cadence/scripts/get_all_partners_mintable';
import { GET_USER_PARTNERS_NFTS } from '../../cadence/scripts/get_user_partners_nfts';

const Partners = () => {
  const dispatch = useAppDispatch();

  const list = useAppSelector((state) => state.partners.list);
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  useEffect(() => {
    const fetchAllPartners = async () => {
      const allPartners = await fcl.query({
        cadence: GET_ALL_PARTNERS_MINTABLE, // {CryptoPiggos: true, Zeedz: true}
      });
      dispatch(setAllPartners({ allPartners }));
    };
    fetchAllPartners();
  }, [dispatch]);

  useEffect(() => {
    const enableUserPartners = async () => {
      if (currentUser?.addr) {
        const userPartnersNFTs = await fcl.query({
          cadence: GET_USER_PARTNERS_NFTS, // [{name: 'CryptoPiggos'}, {name: 'Zeedz'}]
          args: (arg, t) => [arg(currentUser?.addr, t.Address)],
        });
        userPartnersNFTs?.map((partner) => {
          dispatch(enablePartner({ partnerName: partner.name }));
        });
      }
    };
    enableUserPartners();
  }, [dispatch, currentUser]);

  const unlock = (partnerName: string) => {
    const mintPartnerNFT = async () => {
      const res = await fcl.mutate({
        cadence: MINT_ARLEE_PARTNER_NFT,
        limit: 999,
        args: (arg, t) => [arg(partnerName, t.String)],
      });
      await fcl.tx(res).onceSealed();

      dispatch(enablePartner({ partnerName }));
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
