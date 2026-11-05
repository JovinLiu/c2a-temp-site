import { useRef, useState } from 'react';

export default function useQuotationRowOrder(rows, onChange) {
  const source = useRef(null);
  const [target, setTarget] = useState(null);
  const clear = () => {
    source.current = null;
    setTarget(null);
  };
  const move = (from, to) => {
    if (from === to || to < 0 || to >= rows.length) return;
    const next = [...rows];
    const [row] = next.splice(from, 1);
    next.splice(to, 0, row);
    onChange(next);
  };
  return {
    rowProps: (index) => ({
      className: target === index ? 'quotation-drop-target' : undefined,
      onDragOver: (event) => {
        if (source.current === null) return;
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        setTarget(index);
      },
      onDrop: (event) => {
        if (source.current === null) return;
        event.preventDefault();
        move(source.current, index);
        clear();
      },
    }),
    handleProps: (index) => ({
      draggable: rows.length > 1,
      onDragStart: (event) => {
        source.current = index;
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', String(index));
        const row = event.currentTarget.closest('tr');
        if (row) event.dataTransfer.setDragImage(row, 0, 0);
      },
      onDragEnd: clear,
      onKeyDown: (event) => {
        if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
        event.preventDefault();
        move(index, index + (event.key === 'ArrowUp' ? -1 : 1));
      },
    }),
  };
}
