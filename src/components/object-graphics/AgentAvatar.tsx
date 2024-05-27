import { useRecoilValue } from 'recoil';
import Sprite from './Sprite';
import { SpriteImageAtom } from '../../atoms/SpriteImageAtom';
import styles from './AgentAvatar.module.css';

interface AgentAvatarProps {
  onFocus: boolean;
  selected: boolean;
  bodyFrameCoordinate: string;
  portraitFrameCoordinate: string;
  x: number;
  y: number;
}

const AgentAvatar = (props: AgentAvatarProps) => {
  const SpriteImage = useRecoilValue(SpriteImageAtom);
  const spriteImageSize = 32;
  const xOffset = props.x * spriteImageSize + 75;
  const yOffset = props.y * spriteImageSize;
  return (
    <>
      <div className={`${styles.avatar} ${props.onFocus && styles.avatarFocused} ${props.selected && !props.onFocus && styles.avatarSelected}`}>
        <Sprite frameCoordinate={props.bodyFrameCoordinate} image={SpriteImage.characterImage!} size={spriteImageSize} />
      </div>
      {props.onFocus &&
        <div className={styles.portrait} style={{left: `-${xOffset}px`, top: `-${yOffset}px`}}>
          <Sprite frameCoordinate={props.portraitFrameCoordinate} image={SpriteImage.portraitImage!} size={192} />
        </div>
      }
    </>
  );
}

export default AgentAvatar;
