/* eslint-disable @next/next/no-img-element */
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/accordion';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import {
  decreaseStickerAngle,
  decreaseStickerSize,
  increaseStickerAngle,
  increaseStickerSize,
  setActiveSticker,
} from './stickers.reducer';
import { setCurrentPaintingMode } from '../painting-mode/painting-mode.reducer';
import { useScrollDirection } from '../../utils/use-scroll-direction';
import { useEffect } from 'react';

const Stickers = () => {
  const { scrollingDirection, keyPress } = useScrollDirection();
  const unityContext = useAppSelector((state) => state.painter.unityContext);

  const dispatch = useAppDispatch();
  const stickersGroupList = useAppSelector(
    (state) => state.stickers.stickersGroupList
  );
  const stickerSize = useAppSelector((state) => state.stickers.stickerSize);
  const stickerAngle = useAppSelector((state) => state.stickers.stickerAngle);

  const setSticker = (sticker: string) => {
    unityContext?.send('HudManager', 'SetSticker', sticker);
    unityContext?.send('HudManager', 'SetPaintingMode', 'Sticker');
    dispatch(setActiveSticker(sticker));
    dispatch(setCurrentPaintingMode('sticker'));
  };

  useEffect(() => {
    if (keyPress?.ctrl) {
      if (scrollingDirection?.up) {
        dispatch(increaseStickerSize());
      }
      if (scrollingDirection?.down) {
        dispatch(decreaseStickerSize());
      }
    }
    if (keyPress?.shift) {
      if (scrollingDirection?.up) {
        dispatch(increaseStickerAngle());
      }
      if (scrollingDirection?.down) {
        dispatch(decreaseStickerAngle());
      }
    }
  }, [scrollingDirection, keyPress, unityContext, dispatch]);

  useEffect(() => {
    unityContext?.send('HudManager', 'UpdateStickerSize', stickerSize);
  }, [unityContext, stickerSize]);
  useEffect(() => {
    unityContext?.send('HudManager', 'UpdateStickerAngle', stickerAngle);
  }, [unityContext, stickerAngle]);

  return (
    <div className="h-full relative w-full overflow-y-auto">
      <Accordion
        className="w-full absolute pr-2 pb-2"
        allowMultiple
        defaultIndex={[0]}
      >
        {stickersGroupList.map((group, index) => (
          <AccordionItem key={index}>
            <AccordionButton className="flex justify-between">
              <p className="text-white font-bold text-[0.875rem] mt-3 mb-1">
                {group.title}
              </p>
              <AccordionIcon className="!text-white text-xl" />
            </AccordionButton>
            <AccordionPanel>
              <div className="grid grid-cols-[repeat(5,minmax(2rem,3rem))] gap-2">
                {group.list.map((sticker, index) => (
                  <div
                    key={index}
                    className="cursor-pointer bg-black-400 rounded-lg"
                    onClick={(e) => setSticker(sticker.name)}
                  >
                    <img
                      src={sticker.base64}
                      alt={sticker.name}
                      height="75px"
                      width="75px"
                    />
                  </div>
                ))}
              </div>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Stickers;
