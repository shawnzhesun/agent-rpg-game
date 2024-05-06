import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from './RenderLevel.module.css';
import { SpriteImageAtom, SpriteImageAtomIFace } from '../../atoms/SpriteImageAtom';
import LevelBackgroundTile from './LevelBackgroundTile';
import LevelPlacement from './LevelPlacement';
import { LevelState, LevelStateIFace } from '../../state/LevelState';


const RenderLevel = () => {
  const [level, setLevel] = useState<LevelStateIFace | null>(null);
  useEffect(() => {
    const levelState = new LevelState('work-level', (newState: LevelStateIFace) => {
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
  }, [setSpriteImage]);

  function allImagesLoaded(image: SpriteImageAtomIFace): boolean {
    return Object.values(image).every(image => image !== null);
  }

  if (!level || !allImagesLoaded(spriteImage)) {
    return <div>Error loading resources. Please try reloading the page.</div>;
  }

  return (
    <div className={styles.fullScreenContainer} style={{ background: '#5b6983' }}>
      <div className={styles.gameScreen}>
        <LevelBackgroundTile level={level} />
        <LevelPlacement placements={level.placements} />
      </div>
    </div>
  );
};

export default RenderLevel;