import Tile from '../../components/object-graphics/Tile';
import { GameObject } from '../GameObject';

export class TileObject extends GameObject {
  type = 'tile';

  tick() {

  }

  renderComponent(): JSX.Element {
    return <Tile />
  }
}
