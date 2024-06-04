import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SpriteImageAtom } from '../../atoms/SpriteImageAtom';
import styles from './RenderAgentSelect.module.css';
import AgentSelectBackground from './AgentSelectBackground';
import { AgentSelectState, IAgentSelectState } from '../../classes/AgentSelectState';
import AgentTilePlacement from './AgentTilePlacement';
import { AgentsAtom } from '../../atoms/AgentsAtom';

const RenderAgentSelect = () => {
  const [selectState, setSelectState] = useState<IAgentSelectState | null>(null);
  const agentList = useRecoilValue(AgentsAtom).agents;
  useEffect(() => {
    const agentSelectState = new AgentSelectState(agentList, (newState: IAgentSelectState) => {
      setSelectState(newState);
    });

    setSelectState(agentSelectState.getState());

    return () => {
      agentSelectState.destroy();
    };
  }, [agentList]);

  const loadSpriteResource = (src: string) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = src;
      image.onload = () => resolve(image);
      image.onerror = (error: Error | Event | string) => reject(new Error(`Failed to load image at ${src}, error: ${error}`));
    });
  }

  const [spriteImage, setSpriteImage] = useRecoilState(SpriteImageAtom);

  useEffect(() => {
    loadSpriteResource('character-sprites.png').then(image =>
      setSpriteImage(prev => ({ ...prev, characterImage: image as CanvasImageSource }))
    ).catch(console.error);
  }, [setSpriteImage]);

  useEffect(() => {
    loadSpriteResource('agent-select-background.png').then(image =>
      setSpriteImage(prev => ({ ...prev, agentSelectBackgroundImage: image as CanvasImageSource }))
    ).catch(console.error);
  }, [setSpriteImage]);

  useEffect(() => {
    loadSpriteResource('character-portrait.png').then(image =>
      setSpriteImage(prev => ({ ...prev, portraitImage: image as CanvasImageSource }))
    ).catch(console.error);
  }, [setSpriteImage]);

  useEffect(() => {
    loadSpriteResource('buttons.png').then(image =>
      setSpriteImage(prev => ({ ...prev, buttonImage: image as CanvasImageSource }))
    ).catch(console.error);
  }, [setSpriteImage]);

  useEffect(() => {
    loadSpriteResource('map-background.png').then(image =>
      setSpriteImage(prev => ({ ...prev, mapBackgroundImage: image as CanvasImageSource }))
    ).catch(console.error);
  }, [setSpriteImage]);

  useEffect(() => {
    loadSpriteResource('texture.png').then(image =>
      setSpriteImage(prev => ({ ...prev, textureImage: image as CanvasImageSource }))
    ).catch(console.error);
  }, [setSpriteImage]);

  useEffect(() => {
    loadSpriteResource('text-box.png').then(image =>
      setSpriteImage(prev => ({ ...prev, textBoxImage: image as CanvasImageSource }))
    ).catch(console.error);
  }, [setSpriteImage]);

  const allImagesLoaded = Object.values(spriteImage).every(image => image !== null);

  if (!selectState || !allImagesLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.fullScreenContainer} style={{ background: '#222222' }}>
        <div className={styles.gameScreen}>
          <AgentTilePlacement placements={selectState.agents} />
          <AgentSelectBackground />
        </div>
      </div>
    </>
  );
};

export default RenderAgentSelect;
