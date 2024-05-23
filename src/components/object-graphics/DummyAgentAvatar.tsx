import { useRecoilValue } from 'recoil';
import Sprite from './Sprite';
import { SpriteImageAtom } from '../../atoms/SpriteImageAtom';
import styles from './AgentAvatar.module.css';

interface DummyAgentAvatarProps {
  onFocus: boolean;
}

const DummyAgentAvatar = (props: DummyAgentAvatarProps) => {
  const SpriteImage = useRecoilValue(SpriteImageAtom);
  return (
    <div className={`${styles.avatar} ${props.onFocus && styles.avatarFocused}`}>
      <Sprite frameCoordinate='18.5x0.5' image={SpriteImage.characterImage!} size={32} />
    </div>
  );
}

export default DummyAgentAvatar;
