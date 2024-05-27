import { useRecoilValue } from 'recoil';
import Sprite from './Sprite';
import { SpriteImageAtom } from '../../atoms/SpriteImageAtom';
import styles from './AgentAvatar.module.css';

interface AgentCreationProps {
  onFocus: boolean;
  frameCoordinate: string;
}

const AgentCreation = (props: AgentCreationProps) => {
  const SpriteImage = useRecoilValue(SpriteImageAtom);
  return (
    <>
      <div className={`${styles.avatar} ${props.onFocus && styles.avatarFocused}`} style={{opacity: 1}}>
        <Sprite frameCoordinate={props.frameCoordinate} image={SpriteImage.buttonImage!} size={32} />
      </div>
    </>
  );
}

export default AgentCreation;
