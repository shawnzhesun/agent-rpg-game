import { atom } from 'recoil';

export interface SpriteImageAtomIFace {
  characterImage: CanvasImageSource | null;
  levelBackgroundImage: CanvasImageSource | null;
}

export const SpriteImageAtom = atom<SpriteImageAtomIFace>({
  key: 'SpriteImageAtom',
  default: {
    characterImage: null,
    levelBackgroundImage: null,
  },
});
