import { useRecoilValue } from "recoil";
import { SpriteImageAtom } from "../../atoms/SpriteImageAtom";
import SpriteButton from "../object-graphics/SpriteButton";
import styles from './AgentStatsComponent.module.css';
import { useState } from "react";
import StatsBar from "../stats-bar/StatsBar";

export interface IModelStats {
  text: string;
  bars: number;
}

export interface IModelInfo {
  modelName: string;
  stats: IModelStats[];
}

const AgentStatsComponent = () => {
  const SpriteImage = useRecoilValue(SpriteImageAtom);
  const [modelName, setModelName] = useState('GPT-4');

  const modelInfo: IModelInfo[] = [
    {
      modelName: 'GPT-4',
      stats: [
        {
          text: 'Quality',
          bars: 2,
        },
        {
          text: 'Speed',
          bars: 1,
        },
        {
          text: 'Coding',
          bars: 3,
        },
      ],
    },
    {
      modelName: 'GPT-3.5',
      stats: [
        {
          text: 'Quality',
          bars: 3,
        },
        {
          text: 'Speed',
          bars: 2,
        },
        {
          text: 'Coding',
          bars: 1,
        },
      ],
    },
    {
      modelName: 'LLaMA',
      stats: [
        {
          text: 'Quality',
          bars: 1,
        },
        {
          text: 'Speed',
          bars: 3,
        },
        {
          text: 'Coding',
          bars: 2,
        },
      ],
    },
    {
      modelName: 'Gemini Pro',
      stats: [
        {
          text: 'Quality',
          bars: 3,
        },
        {
          text: 'Speed',
          bars: 1,
        },
        {
          text: 'Coding',
          bars: 2,
        },
      ],
    },
    {
      modelName: 'Gemini Ultra',
      stats: [
        {
          text: 'Quality',
          bars: 2,
        },
        {
          text: 'Speed',
          bars: 3,
        },
        {
          text: 'Coding',
          bars: 1,
        },
      ],
    },
  ];

  const modelNames = modelInfo.map((model) => model.modelName);

  const handlePreviousModel = () => {
    setModelName((prevModel) => modelNames[(modelNames.indexOf(prevModel) - 1 + modelNames.length) % modelNames.length]);
  }

  const handleNextModel = () => {
    setModelName((prevModel) => modelNames[(modelNames.indexOf(prevModel) + 1) % modelNames.length]);
  }

  return (
    <div>
    <div className={styles.modelNameContainer}>
      <SpriteButton
        normalFrameCoordinate='8x0'
        hoverFrameCoordinate='9x0'
        activeFrameCoordinate='10x0'
        image={SpriteImage.buttonImage!}
        size={32}
        onClick={handlePreviousModel}
      />
      <input
        type="text"
        placeholder={modelNames[0]}
        value={modelName}
        readOnly
      />
      <SpriteButton
        normalFrameCoordinate='11x0'
        hoverFrameCoordinate='12x0'
        activeFrameCoordinate='13x0'
        image={SpriteImage.buttonImage!}
        size={32}
        onClick={handleNextModel}
      />
    </div>
    <StatsBar modelStats={modelInfo.find((model) => model.modelName === modelName)?.stats} />
    </div>
  );
}

export default AgentStatsComponent;
