import { useEffect, useState } from 'react';
import styles from './RenderLevel.module.css';
import Sprite from '../object-graphics/Sprite';
import LevelBackgroundTile from './LevelBackgroundTile';
import { CELL_SIZE } from '../../utils/constants';

const RenderLevel = () => {
  const level = {
    tileWidth: 10,
    tileHeight: 7,
    placements: [
      { id: 0, x: 4, y: 7, frameCoordinate: '0x2'},
      { id: 0, x: 5, y: 7, frameCoordinate: '0x2'},
    ],
  };

  const loadSpriteResource = (src: string) => {
    return new Promise<HTMLImageElement>((resolve) => {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        resolve(image);
      };
    });
  }

  const [characterImage, setCharacterImage] = useState<HTMLImageElement | null>(null);
  const [levelBackgroundImage, setLevelBackgroundImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    loadSpriteResource('character-sprites.png').then((image) => {
      setCharacterImage(image);
    });
    loadSpriteResource('level-background.png').then((image) => {
      setLevelBackgroundImage(image);
    });
  }, []);

  if (!characterImage || !levelBackgroundImage) {
    return null;
  }

  return (
    <div className={styles.fullScreenContainer} style={{ background: '#5b6983' }}>
      <div className={styles.gameScreen}>
        <LevelBackgroundTile level={level} image={levelBackgroundImage} />
        {level.placements.map((placement) => {
          const x = placement.x * CELL_SIZE + 'px';
          const y = placement.y * CELL_SIZE + 'px';
          const style: React.CSSProperties = {
            position: 'absolute',
            transform: `translate3d(${x}, ${y}, 0)`,
          };
          return (
            <div key={placement.id} style={style}>
              <Sprite
                image={levelBackgroundImage}
                frameCoordinate={placement.frameCoordinate}
                size={16}
              />
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default RenderLevel;