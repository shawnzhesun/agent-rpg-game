import Sprite from './Sprite';
import { SpriteImageAtom } from '../../atoms/SpriteImageAtom';
import { useRecoilValue } from 'recoil';
import styles from './Character.module.css';
import { AgentStatus } from '../../classes/game-objects/AgentObject';

interface AgentProps {
  frameCoordinate: string;
  agentStatus: AgentStatus;
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
      {props.agentStatus === AgentStatus.TALKING &&
        <div className={styles.characterStatusIndicator}>
          <Sprite frameCoordinate={'1x0'} image={SpriteImage.textureImage!} size={64} />
        </div>
      }
      {props.agentStatus === AgentStatus.WAITING &&
        <div className={styles.characterStatusIndicator}>
          <Sprite frameCoordinate={'2x0'} image={SpriteImage.textureImage!} size={64} />
        </div>
      }
    </div>
  );
}

export default Agent;
