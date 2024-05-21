import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Sprite from './Sprite';
import { SpriteImageAtom } from '../../atoms/SpriteImageAtom';
import styles from './TextBox.module.css';

interface TextBoxProps {
  content: string;
}

const TextBox = (props: TextBoxProps) => {
  const SpriteImage = useRecoilValue(SpriteImageAtom);
  const [displayedText, setDisplayedText] = useState('');
  const textDisplayIntervalMs = 30;

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    const timer = setInterval(() => {
      if (props.content) {
        setDisplayedText((prev) => prev + props.content[index]);
        index += 1;
        if (index >= props.content.length) {
          clearInterval(timer);
        }
      }
    }, textDisplayIntervalMs);
    return () => clearInterval(timer);
  }, [props.content]);

  if (props.content === '') {
    return null; // Render nothing if content is empty
  }

  return (
    <div className={styles.textBox}>
      <div className={styles.textBoxText}>
        {displayedText}
      </div>
      <Sprite frameCoordinate={'0x0'} image={SpriteImage.textBoxImage!} size={256} />
    </div>
  );
}

export default TextBox;
