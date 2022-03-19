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
import Image from 'next/image';
import { setCurrentPaintingMode } from '../painting-mode/painting-mode.reducer';
import { useScrollDirection } from '../../utils/use-scroll-direction';
import { useEffect } from 'react';

const Stickers = () => {
  const { scrollingDirection, keyPress } = useScrollDirection();
  const unityContext = useAppSelector((state) => state.painter.unityContext);

  const dispatch = useAppDispatch();
  const activeSticker = useAppSelector((state) => state.stickers.activeSticker);
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
    <>
      <Accordion allowMultiple defaultIndex={[0]}>
        <AccordionItem>
          <AccordionButton className="flex w-full justify-between">
            <p className="text-white font-bold text-[0.875rem] mt-3 mb-1">
              Emotions
            </p>
            <AccordionIcon className="!text-white text-xl" />
          </AccordionButton>
          <AccordionPanel>
            <div className="flex">
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('emotion_1')}
              >
                <Image
                  src="/images/stickers/emotions/emotion_1.webp"
                  alt="emotion_1"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('emotion_2')}
              >
                <Image
                  src="/images/stickers/emotions/emotion_2.webp"
                  alt="emotion_2"
                  height="75px"
                  width="75px"
                ></Image>
              </div>

              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('emotion_3a')}
              >
                <Image
                  src="/images/stickers/emotions/emotion_3a.webp"
                  alt="emotion_3a"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('emotion_3b')}
              >
                <Image
                  src="/images/stickers/emotions/emotion_3b.webp"
                  alt="emotion_3b"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
            </div>

            <div className="flex">
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('emotion_4')}
              >
                <Image
                  src="/images/stickers/emotions/emotion_4.webp"
                  alt="emotion_4"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('emotion_5')}
              >
                <Image
                  src="/images/stickers/emotions/emotion_5.webp"
                  alt="emotion_5"
                  height="75px"
                  width="75px"
                ></Image>
              </div>

              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('emotion_6')}
              >
                <Image
                  src="/images/stickers/emotions/emotion_6.webp"
                  alt="emotion_6"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
            </div>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton className="flex w-full justify-between">
            <p className="text-white font-bold text-[0.875rem] mt-3 mb-1">
              Nature
            </p>
            <AccordionIcon className="!text-white text-xl" />
          </AccordionButton>
          <AccordionPanel>
            <div className="flex">
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('nature_1')}
              >
                <Image
                  src="/images/stickers/nature/nature_1.webp"
                  alt="nature_1"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('nature_2')}
              >
                <Image
                  src="/images/stickers/nature/nature_2.webp"
                  alt="nature_2"
                  height="75px"
                  width="75px"
                ></Image>
              </div>

              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('nature_3')}
              >
                <Image
                  src="/images/stickers/nature/nature_3.webp"
                  alt="nature_3"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('nature_4')}
              >
                <Image
                  src="/images/stickers/nature/nature_4.webp"
                  alt="nature_4"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
            </div>
            <div className="flex">
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('nature_5')}
              >
                <Image
                  src="/images/stickers/nature/nature_5.webp"
                  alt="nature_5"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('nature_6')}
              >
                <Image
                  src="/images/stickers/nature/nature_6.webp"
                  alt="nature_6"
                  height="75px"
                  width="75px"
                ></Image>
              </div>

              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('nature_7')}
              >
                <Image
                  src="/images/stickers/nature/nature_7.webp"
                  alt="nature_7"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('nature_8')}
              >
                <Image
                  src="/images/stickers/nature/nature_8.webp"
                  alt="nature_8"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
            </div>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton className="flex w-full justify-between">
            <p className="text-white font-bold text-[0.875rem] mt-3 mb-1">
              Hearts
            </p>
            <AccordionIcon className="!text-white text-xl" />
          </AccordionButton>
          <AccordionPanel>
            <div className="flex">
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('heart_1')}
              >
                <Image
                  src="/images/stickers/hearts/heart_1.webp"
                  alt="heart_1"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('heart_2')}
              >
                <Image
                  src="/images/stickers/hearts/heart_2.webp"
                  alt="heart_2"
                  height="75px"
                  width="75px"
                ></Image>
              </div>

              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('heart_3')}
              >
                <Image
                  src="/images/stickers/hearts/heart_3.webp"
                  alt="heart_3"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('heart_4')}
              >
                <Image
                  src="/images/stickers/hearts/heart_4.webp"
                  alt="heart_4"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
            </div>
            <div className="flex">
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('heart_5')}
              >
                <Image
                  src="/images/stickers/hearts/heart_5.webp"
                  alt="heart_5"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('heart_6')}
              >
                <Image
                  src="/images/stickers/hearts/heart_6.webp"
                  alt="heart_6"
                  height="75px"
                  width="75px"
                ></Image>
              </div>

              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('heart_7')}
              >
                <Image
                  src="/images/stickers/hearts/heart_7.webp"
                  alt="heart_7"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('heart_8')}
              >
                <Image
                  src="/images/stickers/hearts/heart_8.webp"
                  alt="heart_8"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
            </div>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton className="flex w-full justify-between">
            <p className="text-white font-bold text-[0.875rem] mt-3 mb-1">
              Stars
            </p>
            <AccordionIcon className="!text-white text-xl" />
          </AccordionButton>
          <AccordionPanel>
            <div className="flex">
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('star_1')}
              >
                <Image
                  src="/images/stickers/stars/star_1.webp"
                  alt="star_1"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('star_2')}
              >
                <Image
                  src="/images/stickers/stars/star_2.webp"
                  alt="star_2"
                  height="75px"
                  width="75px"
                ></Image>
              </div>

              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('star_3')}
              >
                <Image
                  src="/images/stickers/stars/star_3.webp"
                  alt="star_3"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('star_4')}
              >
                <Image
                  src="/images/stickers/stars/star_4.webp"
                  alt="star_4"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
            </div>
            <div className="flex">
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('star_5')}
              >
                <Image
                  src="/images/stickers/stars/star_5.webp"
                  alt="star_5"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('star_6')}
              >
                <Image
                  src="/images/stickers/stars/star_6.webp"
                  alt="star_6"
                  height="75px"
                  width="75px"
                ></Image>
              </div>

              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('star_7')}
              >
                <Image
                  src="/images/stickers/stars/star_7.webp"
                  alt="star_7"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('star_8')}
              >
                <Image
                  src="/images/stickers/stars/star_8.webp"
                  alt="star_8"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
            </div>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton className="flex w-full justify-between">
            <p className="text-white font-bold text-[0.875rem] mt-3 mb-1">
              Bandaids
            </p>
            <AccordionIcon className="!text-white text-xl" />
          </AccordionButton>
          <AccordionPanel>
            <div className="flex">
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('bandaid_1')}
              >
                <Image
                  src="/images/stickers/bandaids/bandaid_1.webp"
                  alt="bandaid_1"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('bandaid_2')}
              >
                <Image
                  src="/images/stickers/bandaids/bandaid_2.webp"
                  alt="bandaid_2"
                  height="75px"
                  width="75px"
                ></Image>
              </div>

              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('bandaid_3')}
              >
                <Image
                  src="/images/stickers/bandaids/bandaid_3.webp"
                  alt="bandaid_3"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
              <div
                className="cursor-pointer"
                onClick={(e) => setSticker('bandaid_4')}
              >
                <Image
                  src="/images/stickers/bandaids/bandaid_4.webp"
                  alt="bandaid_4"
                  height="75px"
                  width="75px"
                ></Image>
              </div>
            </div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Stickers;
