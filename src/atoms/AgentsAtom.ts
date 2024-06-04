import { atom } from 'recoil';
import { IGameObject } from '../classes/GameObject';

interface IAgentsAtom {
  agents: IAgentObject[];
}

export interface IAgentObject extends IGameObject {
  name: string;
  gameFrameCoordiante: string;
  bodyFrameCoordinate: string;
  portraitFrameCoordinate: string;
}

export const AgentsAtom = atom<IAgentsAtom>({
  key: 'AgentsAtom',
  default: {
    agents: [
      {
        id: 'doc-agent',
        name: 'Amy',
        x: 5,
        y: 3,
        gameFrameCoordiante: '0x2',
        bodyFrameCoordinate: '0.5x4.5',
        portraitFrameCoordinate: '1x0',
      },
      {
        id: 'eng-agent',
        name: 'Bob',
        x: 10,
        y: 3,
        gameFrameCoordiante: '0x3',
        bodyFrameCoordinate: '0.5x6.5',
        portraitFrameCoordinate: '2x0',
      },
      {
        id: 'data-agent',
        name: 'Chris',
        x: 15,
        y: 3,
        gameFrameCoordiante: '0x1',
        bodyFrameCoordinate: '0.5x2.5',
        portraitFrameCoordinate: '0x0',
      },
    ],
  },
});
