import React from 'react';
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const icon = useColorModeValue(<FaMoon />, <FaSun />);
  const label = useColorModeValue('Switch to dark mode', 'Switch to light mode');

  return (
    <IconButton
      aria-label={label}
      icon={icon}
      onClick={toggleColorMode}
      variant="ghost"
      size="md"
      _hover={{
        bg: useColorModeValue('blackAlpha.100', 'whiteAlpha.200'),
      }}
    />
  );
};

export default ThemeToggle;