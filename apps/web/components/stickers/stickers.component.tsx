/* eslint-disable @next/next/no-img-element */
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import {
  decreaseStickerAngle,
  decreaseStickerSize,
  increaseStickerAngle,
  increaseStickerSize,
} from './stickers.reducer';
import { setCurrentPaintingMode } from '../painting-mode/painting-mode.reducer';
import { useScrollDirection } from '../../utils/use-scroll-direction';
import { useEffect } from 'react';

const Stickers = () => {
  const { scrollingDirection, keyPress } = useScrollDirection();
  const unityContext = useAppSelector((state) => state.painter.unityContext);

  const dispatch = useAppDispatch();
  const arlequinStickersGroup = useAppSelector(
    (state) => state.stickers.arlequinStickersGroup
  );
  const partnersStickersGroup = useAppSelector(
    (state) => state.stickers.partnersStickersGroup
  );
  const stickerSize = useAppSelector((state) => state.stickers.stickerSize);
  const stickerAngle = useAppSelector((state) => state.stickers.stickerAngle);

  const setSticker = (sticker: string) => {
    unityContext?.send('HudManager', 'SetSticker', sticker);
    unityContext?.send('HudManager', 'SetPaintingMode', 'Sticker');
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
        defaultIndex={[0, 1, 2]}
      >
        {arlequinStickersGroup.map((group, index) => (
          <AccordionItem className="border-none" key={index}>
            <AccordionButton className="flex justify-between !p-0 !shadow-none">
              <p className="text-white font-bold text-[0.875rem] mt-3 mb-1">
                {group.name}
              </p>
              <AccordionIcon className="!text-white text-xl" />
            </AccordionButton>
            <AccordionPanel>
              <div className="grid grid-cols-[repeat(5,minmax(2rem,3rem))] gap-2">
                {group.stickers.map((sticker, index) => (
                  <div
                    key={index}
                    className="cursor-pointer bg-black-400 rounded-lg"
                    onClick={(e) => setSticker(sticker.name)}
                  >
                    <img
                      src={`data:image/png;base64,${sticker.base64}`}
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
        {partnersStickersGroup.map((group, index) => (
          <AccordionItem className="border-none" key={index}>
            <AccordionButton className="flex justify-between !p-0 !shadow-none">
              <p className="text-white font-bold text-[0.875rem] mt-3 mb-1">
                {group.name}
              </p>
              <AccordionIcon className="!text-white text-xl" />
            </AccordionButton>
            <AccordionPanel>
              <div className="grid grid-cols-[repeat(5,minmax(2rem,3rem))] gap-2">
                {group.stickers.map((sticker, index) => (
                  <div
                    key={index}
                    className="cursor-pointer bg-black-400 rounded-lg"
                    onClick={(e) => setSticker(sticker.name)}
                  >
                    <img
                      src={`data:image/png;base64,${sticker.base64}`}
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