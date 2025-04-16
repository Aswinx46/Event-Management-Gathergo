import React, { useState, KeyboardEvent, ChangeEvent, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SearchInputProps {
  onSearch: (query: string) => void;
  onEnterPress?: () => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  onEnterPress,
  placeholder = "Type above and press Enter or click Search to begin...",
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto focus on the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnterPress) {
      e.preventDefault();
      onEnterPress();
    } else if (e.key === 'Escape') {
      setInputValue('');
      onSearch('');
    }
  };

  return (
    <motion.div 
      className="relative w-full"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full bg-transparent border-b-2 border-gray-700 py-3 text-white text-xl focus:outline-none focus:border-white transition-colors duration-300"
        aria-label="Search"
        placeholder={placeholder}
        autoFocus
      />
      <motion.div 
        className="text-gray-500 text-sm mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Type above and press <em>Enter</em> or click the Search button to begin.
      </motion.div>
    </motion.div>
  );
};

export default SearchInput;
