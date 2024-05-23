import { useRecoilValue } from 'recoil';
import Sprite from './Sprite';
import { SpriteImageAtom } from '../../atoms/SpriteImageAtom';
import styles from './AgentAvatar.module.css';

interface DataEngineerAgentAvatarProps {
  onFocus: boolean;
  selected: boolean;
}

const DataEngineerAgentAvatar = (props: DataEngineerAgentAvatarProps) => {
  const SpriteImage = useRecoilValue(SpriteImageAtom);
  return (
    <div className={`${styles.avatar} ${props.onFocus && styles.avatarFocused} ${props.selected && !props.onFocus && styles.avatarSelected}`}>
      <Sprite frameCoordinate='0.5x2.5' image={SpriteImage.characterImage!} size={32} />
    </div>
  );
}

export default DataEngineerAgentAvatar;
