import React, { useState } from 'react';

export const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prevVal, setPrevVal] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [newNum, setNewNum] = useState(true);

  const handleNum = (num: string) => {
    if (newNum) {
      setDisplay(num);
      setNewNum(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOp = (operator: string) => {
    const current = parseFloat(display);
    if (prevVal === null) {
      setPrevVal(current);
    } else if (op) {
      const result = calculate(prevVal, current, op);
      setPrevVal(result);
      setDisplay(String(result));
    }
    setOp(operator);
    setNewNum(true);
  };

  const calculate = (a: number, b: number, operator: string) => {
    switch (operator) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return a / b;
      default: return b;
    }
  };

  const handleEqual = () => {
    if (op && prevVal !== null) {
      const current = parseFloat(display);
      const result = calculate(prevVal, current, op);
      setDisplay(String(result));
      setPrevVal(null);
      setOp(null);
      setNewNum(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevVal(null);
    setOp(null);
    setNewNum(true);
  };

  const btnClass = "flex items-center justify-center p-4 rounded-lg text-lg font-medium transition-colors hover:bg-white/10 active:bg-white/20";
  const numBtnClass = `${btnClass} bg-white dark:bg-slate-700 text-slate-900 dark:text-white hover:!bg-slate-100 dark:hover:!bg-slate-600`;
  const opBtnClass = `${btnClass} bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200`;
  const equalBtnClass = `${btnClass} bg-blue-600 hover:!bg-blue-700 text-white`;

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#202020] p-4 text-slate-900 dark:text-white">
      <div className="flex-1 flex items-end justify-end mb-4 text-5xl font-light overflow-x-auto overflow-y-hidden">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2 h-3/5">
        <button className={opBtnClass} onClick={handleClear}>C</button>
        <button className={opBtnClass}>CE</button>
        <button className={opBtnClass}>%</button>
        <button className={opBtnClass} onClick={() => handleOp('÷')}>÷</button>
        
        <button className={numBtnClass} onClick={() => handleNum('7')}>7</button>
        <button className={numBtnClass} onClick={() => handleNum('8')}>8</button>
        <button className={numBtnClass} onClick={() => handleNum('9')}>9</button>
        <button className={opBtnClass} onClick={() => handleOp('×')}>×</button>
        
        <button className={numBtnClass} onClick={() => handleNum('4')}>4</button>
        <button className={numBtnClass} onClick={() => handleNum('5')}>5</button>
        <button className={numBtnClass} onClick={() => handleNum('6')}>6</button>
        <button className={opBtnClass} onClick={() => handleOp('-')}>-</button>
        
        <button className={numBtnClass} onClick={() => handleNum('1')}>1</button>
        <button className={numBtnClass} onClick={() => handleNum('2')}>2</button>
        <button className={numBtnClass} onClick={() => handleNum('3')}>3</button>
        <button className={opBtnClass} onClick={() => handleOp('+')}>+</button>
        
        <button className={numBtnClass} style={{gridColumn: 'span 2'}} onClick={() => handleNum('0')}>0</button>
        <button className={numBtnClass} onClick={() => handleNum('.')}>.</button>
        <button className={equalBtnClass} onClick={handleEqual}>=</button>
      </div>
    </div>
  );
};