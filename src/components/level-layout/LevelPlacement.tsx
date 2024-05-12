import { GameObject } from '../../classes/GameObject';

interface LevelPlacementsProps {
  placements: GameObject[];
}

const LevelPlacement = (props: LevelPlacementsProps) => {
  return (
    props.placements.map((placement: GameObject) => {
      const [x, y] = placement.displayXY();
      const style: React.CSSProperties = {
        position: 'absolute',
        transform: `translate3d(${x}px, ${y}px, 0)`,
      };
      return (
        <div key={placement.id} style={style}>
          {placement.renderComponent()}
        </div>
      )
    })
  )
}

export default LevelPlacement;
