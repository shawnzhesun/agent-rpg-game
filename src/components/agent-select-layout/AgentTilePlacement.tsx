import { AgentAvatarObject } from '../../classes/game-objects/AgentAvatarObject';

interface AgentTilePlacementProps {
  placements: AgentAvatarObject[];
}

const AgentTilePlacement = (props: AgentTilePlacementProps) => {
  return (
    <div style={{
      position: 'absolute',
      left: 120,
      top: 120,
    }}>
      {props.placements.map((placement: AgentAvatarObject) => {
        const [x, y] = placement.displayXY();
        const style: React.CSSProperties = {
          position: 'absolute',
          transform: `translate3d(${x}px, ${y}px, 0)`,
          zIndex: 2,
        };
        return (
          <div key={placement.id} style={style}>
            {placement.renderComponent()}
          </div>
        )
      })}
    </div>
  )
};

export default AgentTilePlacement;
