import { useRecoilValue } from 'recoil';
import Sprite from './Sprite';
import { SpriteImageAtom } from '../../atoms/SpriteImageAtom';
import styles from './AgentAvatar.module.css';

interface DocumentationAgentAvatarProps {
  onFocus: boolean;
  selected: boolean;
}

const DocumentationAgentAvatar = (props: DocumentationAgentAvatarProps) => {
  const SpriteImage = useRecoilValue(SpriteImageAtom);
  return (
    <>
      <div className={`${styles.avatar} ${props.onFocus && styles.avatarFocused} ${props.selected && !props.onFocus && styles.avatarSelected}`}>
        <Sprite frameCoordinate='0.5x4.5' image={SpriteImage.characterImage!} size={32} />
      </div>
      {props.onFocus &&
        <div className={styles.portrait} style={{left: '-70px'}}>
          <Sprite frameCoordinate='1x0' image={SpriteImage.portraitImage!} size={192} />
        </div>
      }
    </>

  );
}

export default DocumentationAgentAvatar;
