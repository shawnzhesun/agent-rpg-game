import { CELL_SIZE } from '../../utils/constants';
import Sprite from '../object-graphics/Sprite';
import { SpriteImageAtom } from '../../atoms/SpriteImageAtom';
import { useRecoilValue } from 'recoil';

interface MapCellProps {
  x: number;
  y: number;
  frameCoordinate: string;
}

const MapCell = (props: MapCellProps) => {
  const SpriteImage = useRecoilValue(SpriteImageAtom);
  return (
    <div
    style= {{
      position: 'absolute',
      left: props.x * CELL_SIZE,
      top: props.y * CELL_SIZE,
    }}
    >
      <Sprite frameCoordinate={props.frameCoordinate} image={SpriteImage.levelBackgroundImage!} size={16} />
    </div>
  )
};

export default MapCell;
