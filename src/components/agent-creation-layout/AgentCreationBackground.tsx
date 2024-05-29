import Sprite from '../object-graphics/Sprite';
import { SpriteImageAtom } from '../../atoms/SpriteImageAtom';
import { useRecoilValue } from 'recoil';


const AgentCreationBackground = () => {
  const SpriteImage = useRecoilValue(SpriteImageAtom);
  return (
    <div>
      <Sprite frameCoordinate='1x0' image={SpriteImage.agentSelectBackgroundImage!} size={400} />
    </div>
  )
};

export default AgentCreationBackground;
