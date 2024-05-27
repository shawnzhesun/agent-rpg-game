import { IMapState } from '../../classes/MapState';
import MapCell from './MapCell';

interface MapBackgroundTileProps {
  map: IMapState;
}

const MapBackgroundTile = (props: MapBackgroundTileProps) => {
  const widthWithWall = props.map.tileWidth + 1;
  const heightWithWall = props.map.tileHeight + 1;
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

export default MapBackgroundTile;
