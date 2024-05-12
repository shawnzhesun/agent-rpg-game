import Sprite from './Sprite';
import { SpriteImageAtom } from '../../atoms/SpriteImageAtom';
import { useRecoilValue } from 'recoil';

const Tile = () => {
  const SpriteImage = useRecoilValue(SpriteImageAtom);

  return (
    <div>
      <Sprite frameCoordinate={'0x2'} image={SpriteImage.levelBackgroundImage!} size={16} />
    </div>
  );
}

export default Tile;
