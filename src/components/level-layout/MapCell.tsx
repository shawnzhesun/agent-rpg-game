import { CELL_SIZE } from "../../utils/constants";
import Sprite from "../object-graphics/Sprite";

interface MapCellProps {
  x: number;
  y: number;
  frameCoordinate: string;
  image: CanvasImageSource;
}

const MapCell = (props: MapCellProps) => {
  return (
    <div
    style= {{
      position: 'absolute',
      left: props.x * CELL_SIZE,
      top: props.y * CELL_SIZE,
    }}
    >
      <Sprite frameCoordinate={props.frameCoordinate} image={props.image} size={16} />
    </div>
  )
};

export default MapCell;
