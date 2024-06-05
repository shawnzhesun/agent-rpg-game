import { useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    props.onSubmit(inputValue);
    setIsLoading(true);
  };

  return (
    <div className={styles.textBox}>
      <textarea
        autoFocus
        className={styles.textBoxInput}
        value={inputValue}
        disabled={isLoading}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className={styles.textBoxButton} onClick={handleSubmit}>{isLoading ? '...' : 'Send'}</button>
      <Sprite frameCoordinate={'0x0'} image={SpriteImage.textBoxImage!} size={256} />
    </div>
  );
}

export default TextBoxWithInput;
