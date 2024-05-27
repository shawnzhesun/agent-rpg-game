import { GameObject } from '../../classes/GameObject';

interface MapPlacementsProps {
  placements: GameObject[];
}

const MapPlacement = (props: MapPlacementsProps) => {
  return (
    props.placements.map((placement: GameObject) => {
      const [x, y] = placement.displayXY();
      const style: React.CSSProperties = {
        position: 'absolute',
        transform: `translate3d(${x}px, ${y}px, 0)`,
        zIndex: placement.zIndex(),
      };
      return (
        <div key={placement.id} style={style}>
          {placement.renderComponent()}
        </div>
      )
    })
  )
}

export default MapPlacement;
