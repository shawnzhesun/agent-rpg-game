import { useEffect, useRef } from 'react';
import { CELL_SIZE } from '../../utils/constants';

interface SpriteProps {

  /**
   * The image to pull from
   */
  image: CanvasImageSource;

  /**
   * The coordinate of the frame in the sprite sheet
   */
  frameCoordinate: string;

  /**
   * The size of the sprite
   */
  size: number;
}

// How to set an initializer value for size of the prop?
const Sprite = (props: SpriteProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const size = props.size || CELL_SIZE;
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvasEl: HTMLCanvasElement = canvasRef.current;
    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;

    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    // Draw on the canvas
    const frameCoordinate = props.frameCoordinate;
    const tileSheetX = Number(frameCoordinate.split('x')[0]);
    const tileSheetY = Number(frameCoordinate.split('x')[1]);

    ctx.drawImage(
      props.image,
      tileSheetX * size, // Left X corner of the frame
      tileSheetY * size, // Top Y corner of the frame
      size, // How much to crop from the sprite sheet (X)
      size, // How much to crop from the sprite shet (Y)
      0, // Where to place this on canvas tag X (0)
      0, // Where to place this on canvas tag Y (0)
      size, // How large to scale it (X)
      size, // How large to scale it (Y)
    )
  }, [props.frameCoordinate, size, props.image]);

  return (
    <canvas width={size} height={size} ref={canvasRef} />
  );
};

export default Sprite;
