import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string
  delay: number
  infinite?: boolean
}

export default function Typewriter({ text, delay, infinite }: TypewriterProps) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);

    } else if (infinite) {
      setTimeout(() => {
        setCurrentIndex(0);
        setCurrentText('');
      }, delay * 1.5);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, infinite, text]);

  return (
    <span>{currentText}</span>
  );
}