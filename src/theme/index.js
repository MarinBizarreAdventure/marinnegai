import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      cream: '#FFFDF2',
      black: '#000000',
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'brand.cream',
        color: props.colorMode === 'dark' ? 'brand.cream' : 'brand.black',
      },
    }),
  },
  components: {
    Button: {
      variants: {
        solid: (props) => ({
          bg: props.colorMode === 'dark' ? 'brand.cream' : 'brand.black',
          color: props.colorMode === 'dark' ? 'brand.black' : 'brand.cream',
          _hover: {
            bg: props.colorMode === 'dark' ? 'gray.200' : 'gray.800',
          },
        }),
        outline: (props) => ({
          borderColor: props.colorMode === 'dark' ? 'brand.cream' : 'brand.black',
          color: props.colorMode === 'dark' ? 'brand.cream' : 'brand.black',
          _hover: {
            bg: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'blackAlpha.100',
          },
        }),
      },
    },
  },
});

export default theme;