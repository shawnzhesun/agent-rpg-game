import { useRecoilValue } from 'recoil';
import { CELL_SIZE } from '../../utils/constants';
import Sprite from '../object-graphics/Sprite';
import { SpriteImageAtom } from '../../atoms/SpriteImageAtom';

interface LevelPlacementIFace {
  id: number;
  x: number;
  y: number;
  frameCoordinate: string;
}

interface LevelPlacementsProps {
  placements: LevelPlacementIFace[];
}

const LevelPlacement = (props: LevelPlacementsProps) => {
  const SpriteImage = useRecoilValue(SpriteImageAtom);
  return (
    props.placements.map((placement: LevelPlacementIFace) => {
      const x = placement.x * CELL_SIZE + 'px';
      const y = placement.y * CELL_SIZE + 'px';
      const style: React.CSSProperties = {
        position: 'absolute',
        transform: `translate3d(${x}, ${y}, 0)`,
      };
      return (
        <div key={placement.id} style={style}>
          <Sprite
            image={SpriteImage.levelBackgroundImage!}
            frameCoordinate={placement.frameCoordinate}
            size={16}
          />
        </div>
      )
    })
  )
}

export default LevelPlacement;
export type {
  LevelPlacementIFace,
  LevelPlacementsProps,
};
