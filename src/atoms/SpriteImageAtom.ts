import { atom } from 'recoil';

export interface ISpriteImageAtom {
  characterImage: CanvasImageSource | null;
  levelBackgroundImage: CanvasImageSource | null;
  textureImage: CanvasImageSource | null;
  textBoxImage: CanvasImageSource | null;
}

export const SpriteImageAtom = atom<ISpriteImageAtom>({
  key: 'SpriteImageAtom',
  default: {
    characterImage: null,
    levelBackgroundImage: null,
    textureImage: null,
    textBoxImage: null,
  },
});
