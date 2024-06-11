import Sprite from './Sprite';
import { SpriteImageAtom } from '../../atoms/SpriteImageAtom';
import { useRecoilValue } from 'recoil';
import styles from './Character.module.css';

interface AgentProps {
  frameCoordinate: string;
  inConversation: boolean;
}

const Agent = (props: AgentProps) => {
  const SpriteImage = useRecoilValue(SpriteImageAtom);

  return (
    <div className={styles.character}>
      <div className={styles.characterShadow}>
        <Sprite frameCoordinate={'0x0'} image={SpriteImage.textureImage!} size={64} />
      </div>
      <div className={styles.characterBody} >
        <Sprite frameCoordinate={props.frameCoordinate} image={SpriteImage.characterImage!} size={64} />
      </div>
      {props.inConversation &&
        <div className={styles.characterSpeechBubble}>
          <Sprite frameCoordinate={'1x0'} image={SpriteImage.textureImage!} size={64} />
        </div>
      }
    </div>
  );
}

export default Agent;
