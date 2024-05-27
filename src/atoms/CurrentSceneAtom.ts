import { atom } from 'recoil';

export interface ICurrentSceneAtom {
  currentSceneId: string;
}

export const CurrentSceneAtom = atom<ICurrentSceneAtom>({
  key: 'CurrentSceneAtom',
  default: {
    currentSceneId: 'agent-selection-scene',
    // currentSceneId: 'map-scene',
  },
});
