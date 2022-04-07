import { useAppDispatch, useAppSelector } from '../../store/hook';
import { enablePartner } from './partners.reducer';
import { enablePartner as enablePartnerStickers } from '../stickers/stickers.reducer';

const Partners = () => {
  const dispatch = useAppDispatch();

  const list = useAppSelector((state) => state.partners.list);

  const unlock = (partnerName: string) => {
    dispatch(enablePartner({ partnerName }));
    dispatch(enablePartnerStickers({ partnerName }));
  };

  return (
    <>
      <p className="text-black-200 font-bold text-[0.875rem]">
        Purchase our PartnerNFT to unlock new features!
      </p>
      <hr className="my-6 w-1/2" />
      {list.map((l) => (
        <>
          <div className="mb-4">
            <h2 className="text-white text-2xl font-bold">{l.title}</h2>
            <p className="text-white">{l.image}</p>

            <div className="flex w-full justify-center">
              {l.enabled ? (
                <p className="text-white uppercase">Unlocked!</p>
              ) : (
                <button
                  onClick={(e) => unlock(l.title)}
                  className="py-4 px-6 text-white bg-red uppercase rounded-full"
                >
                  Unlock (3 $FLOW)
                </button>
              )}
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default Partners;
