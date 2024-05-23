import { useRecoilValue } from 'recoil';
import Sprite from './Sprite';
import { SpriteImageAtom } from '../../atoms/SpriteImageAtom';
import styles from './AgentAvatar.module.css';

interface EngineerAgentAvatarProps {
  onFocus: boolean;
  selected: boolean;
}

const EngineerAgentAvatar = (props: EngineerAgentAvatarProps) => {
  const SpriteImage = useRecoilValue(SpriteImageAtom);
  return (
    <div className={`${styles.avatar} ${props.onFocus && styles.avatarFocused} ${props.selected && !props.onFocus && styles.avatarSelected}`}>
      <Sprite frameCoordinate='0.5x6.5' image={SpriteImage.characterImage!} size={32} />
    </div>
  );
}

export default EngineerAgentAvatar;
