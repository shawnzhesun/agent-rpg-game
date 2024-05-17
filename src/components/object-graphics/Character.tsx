import Sprite from './Sprite';
import { SpriteImageAtom } from '../../atoms/SpriteImageAtom';
import { useRecoilValue } from 'recoil';
import styles from './Character.module.css';

interface CharacterProps {
  frameCoordinate: string;
}

const Character = (props: CharacterProps) => {
  const SpriteImage = useRecoilValue(SpriteImageAtom);

  return (
    <div className={styles.character}>
      <div className={styles.characterShadow}>
        <Sprite frameCoordinate={'0x0'} image={SpriteImage.textureImage!} size={64} />
      </div>
      <div className={styles.characterBody} >
        <Sprite frameCoordinate={props.frameCoordinate} image={SpriteImage.characterImage!} size={64} />
      </div>
    </div>
  );
}

export default Character;
