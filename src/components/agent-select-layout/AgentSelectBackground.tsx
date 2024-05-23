import Sprite from '../object-graphics/Sprite';
import { SpriteImageAtom } from '../../atoms/SpriteImageAtom';
import { useRecoilValue } from 'recoil';


const AgentSelectBackground = () => {
  const SpriteImage = useRecoilValue(SpriteImageAtom);
  return (
    <div>
      <Sprite frameCoordinate='0x0' image={SpriteImage.agentSelectBackgroundImage!} size={480} />
    </div>
  )
};

export default AgentSelectBackground;
