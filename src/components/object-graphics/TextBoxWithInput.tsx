import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Sprite from './Sprite';
import { SpriteImageAtom } from '../../atoms/SpriteImageAtom';
import styles from './TextBox.module.css';

interface TextBoxWithInputProps {
  onSubmit: (input: string) => void;
}

const TextBoxWithInput = (props: TextBoxWithInputProps) => {
  const SpriteImage = useRecoilValue(SpriteImageAtom);
  const [inputValue, setInputValue] = useState('');


  return (
    <div className={styles.textBox}>
      <textarea
        autoFocus
        className={styles.textBoxInput}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className={styles.textBoxButton} onClick={() => props.onSubmit(inputValue)}>Send</button>
      <Sprite frameCoordinate={'0x0'} image={SpriteImage.textBoxImage!} size={256} />
    </div>
  );
}

export default TextBoxWithInput;
