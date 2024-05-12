import { ILevelState } from '../../classes/LevelState';
import MapCell from './MapCell';

interface LevelBackgroundTileProps {
  level: ILevelState;
}

const LevelBackgroundTile = (props: LevelBackgroundTileProps) => {
  const widthWithWall = props.level.tileWidth + 1;
  const heightWithWall = props.level.tileHeight + 1;
  function getTileValue(x: number, y: number) {
    if (x === 0) return '0x1';
    if (x === widthWithWall) return '2x1';
    if (y === 0) return '1x0';
    if (y === heightWithWall) return '1x2';
    return '1x1';
  }
  const canvases = [];
  for (let y = 0; y <= heightWithWall; y++) {
    for (let x = 0; x <= widthWithWall; x++) {
      if (y === heightWithWall) {
        if (x == 0 || x == widthWithWall) continue;
      }
      canvases.push(
        <MapCell
          key={`${x}-${y}`}
          x={x}
          y={y}
          frameCoordinate={getTileValue(x, y)}
        />
      )
    }
  }
  return <div>{canvases}</div>;
};

export default LevelBackgroundTile;
