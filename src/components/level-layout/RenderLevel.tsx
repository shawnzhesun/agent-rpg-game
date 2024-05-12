import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from './RenderLevel.module.css';
import { SpriteImageAtom, ISpriteImageAtom } from '../../atoms/SpriteImageAtom';
import LevelBackgroundTile from './LevelBackgroundTile';
import LevelPlacement from './LevelPlacement';
import { LevelState, ILevelState } from '../../classes/LevelState';


const RenderLevel = () => {
  const [level, setLevel] = useState<ILevelState | null>(null);
  useEffect(() => {
    const levelState = new LevelState('work-level', (newState: ILevelState) => {
      setLevel(newState);
    });

    setLevel(levelState.getState());

    return () => {
      levelState.destroy();
    };
  }, []);

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

    loadSpriteResource('level-background.png').then(image =>
      setSpriteImage(prev => ({ ...prev, levelBackgroundImage: image as CanvasImageSource }))
    ).catch(console.error);

    loadSpriteResource('texture.png').then(image =>
      setSpriteImage(prev => ({ ...prev, textureImage: image as CanvasImageSource }))
    ).catch(console.error);
  }, [setSpriteImage]);

  function allImagesLoaded(image: ISpriteImageAtom): boolean {
    return Object.values(image).every(image => image !== null);
  }

  if (!level || !allImagesLoaded(spriteImage)) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.fullScreenContainer} style={{ background: '#5b6983' }}>
      <div className={styles.gameScreen}>
        <LevelBackgroundTile level={level} />
        <LevelPlacement placements={level.gameObjects} />
      </div>
    </div>
  );
};

export default RenderLevel;