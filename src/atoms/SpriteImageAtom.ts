import { atom } from 'recoil';

export interface ISpriteImageAtom {
  characterImage: CanvasImageSource | null;
  mapBackgroundImage: CanvasImageSource | null;
  textureImage: CanvasImageSource | null;
  textBoxImage: CanvasImageSource | null;
  agentSelectBackgroundImage: CanvasImageSource | null;
  portraitImage: CanvasImageSource | null;
  buttonImage: CanvasImageSource | null;
}

export const SpriteImageAtom = atom<ISpriteImageAtom>({
  key: 'SpriteImageAtom',
  default: {
    characterImage: null,
    mapBackgroundImage: null,
    textureImage: null,
    textBoxImage: null,
    agentSelectBackgroundImage: null,
    portraitImage: null,
    buttonImage: null,
  },
});
