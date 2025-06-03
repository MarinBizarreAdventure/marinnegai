import React from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  HStack,
  Link,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const bg = useColorModeValue('brand.cream', 'gray.900');
  const borderColor = useColorModeValue('brand.black', 'brand.cream');

  return (
    <Box
      bg={bg}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTop={1}
      borderStyle={'solid'}
      borderColor={borderColor}
      mt={10}
    >
      <Container
        as={Stack}
        maxW={'container.xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}
      >
        <HStack spacing={6}>
          <Link href="https://github.com/MarinBizarreAdventure" isExternal>
            <FaGithub size={24} />
          </Link>
          <Link href="https://linkedin.com/in/marinnegai" isExternal>
            <FaLinkedin size={24} />
          </Link>
          <Link href="mailto:negaimarin@gmail.com">
            <FaEnvelope size={24} />
          </Link>
        </HStack>
        <Text>© 2025 Marin Negai. All rights reserved.</Text>
      </Container>
    </Box>
  );
};

export default Footer;