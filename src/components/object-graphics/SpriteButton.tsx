import { useState } from 'react';
import Sprite from './Sprite';
import { CELL_SIZE } from '../../utils/constants';

interface SpriteButtonProps {
  image: CanvasImageSource;
  normalFrameCoordinate: string;
  hoverFrameCoordinate: string;
  activeFrameCoordinate: string;
  size?: number;
  onClick?: () => void;
}

const SpriteButton = (props: SpriteButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const size = props.size || CELL_SIZE;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsActive(false);
  };

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
    if (props.onClick) {
      props.onClick();
    }
  };

  let currentFrameCoordinate = props.normalFrameCoordinate;
  if (isActive) {
    currentFrameCoordinate = props.activeFrameCoordinate;
  } else if (isHovered) {
    currentFrameCoordinate = props.hoverFrameCoordinate;
  }

  return (
    <div
      style={{width: size, height: size, display: 'inline-block', zIndex: 1}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <Sprite
        image={props.image}
        frameCoordinate={currentFrameCoordinate}
        size={size}
      />
    </div>
  );
};

export default SpriteButton;