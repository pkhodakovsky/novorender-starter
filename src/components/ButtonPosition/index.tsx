import { useState, useEffect } from 'react';

type Props = {
  number: string;
  handleSavePosition: (number: string) => void;
  handleMoveToPosition: (number: string) => void;
}

export const ButtonPosition = ({ number, handleSavePosition, handleMoveToPosition }: Props) => {
  const [shiftOn, setShiftOn] = useState(false)

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Shift') {
        setShiftOn(() => true);
      }
    })
  }, []);

  useEffect(() => {
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Shift') {
        setShiftOn(() => false);
      }
    })
  }, []);

  const handleClick = () => {
    if (shiftOn) {
      handleSavePosition(number);
      return;
    }

    handleMoveToPosition(number);
  }

  return <button className="button" onClick={handleClick}>
    Position {number}
  </button>
}