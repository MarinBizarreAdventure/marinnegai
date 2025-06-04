import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Container,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
  Divider,
  Link,
  Badge,
} from '@chakra-ui/react';
import { FaCheckCircle, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const About = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Container maxW="container.md">
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="2xl" mb={4}>About Me</Heading>
          <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
            Machine Learning Engineer & Software Developer
          </Text>
        </Box>

        <Box bg={bg} p={8} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <VStack spacing={6} align="stretch">
            <Box>
              <Heading size="md" mb={4}>Introduction</Heading>
              <Text lineHeight="tall">
                I am a Machine Learning-focused Software Engineer with backend development expertise 
                in Go, C#, Python, and C++. I contribute to projects at Plansight and Sigmoid. 
                As an AI Teacher at Lyceum Aristotel and mentor at Tekwill Academy, I guide aspiring engineers.
              </Text>
              <Text lineHeight="tall" mt={3}>
                As President of FAF NGO, I lead initiatives to advance software engineering in Moldova. 
                I also conduct machine learning research at the Technical University of Moldova, 
                always exploring new technologies for efficient solutions.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading size="md" mb={4}>Skills & Technologies</Heading>
              <VStack align="stretch" spacing={3}>
                <Box>
                  <Text fontWeight="bold" mb={2}>Programming Languages:</Text>
                  <HStack spacing={2} flexWrap="wrap">
                    {['Python', 'Go', 'C#', 'C++', 'JavaScript'].map((lang) => (
                      <Badge key={lang} colorScheme="blue" variant="solid">
                        {lang}
                      </Badge>
                    ))}
                  </HStack>
                </Box>
                <Box>
                  <Text fontWeight="bold" mb={2}>Machine Learning & AI:</Text>
                  <HStack spacing={2} flexWrap="wrap">
                    {['TensorFlow', 'PyTorch', 'Scikit-learn', 'CNNs', 'LLMs'].map((tech) => (
                      <Badge key={tech} colorScheme="green" variant="solid">
                        {tech}
                      </Badge>
                    ))}
                  </HStack>
                </Box>
                <Box>
                  <Text fontWeight="bold" mb={2}>Backend & Infrastructure:</Text>
                  <HStack spacing={2} flexWrap="wrap">
                    {['FastAPI', 'Docker', 'PostgreSQL', 'Redis', 'RabbitMQ'].map((tech) => (
                      <Badge key={tech} colorScheme="purple" variant="solid">
                        {tech}
                      </Badge>
                    ))}
                  </HStack>
                </Box>
              </VStack>
            </Box>

            <Divider />

            <Box>
              <Heading size="md" mb={4}>Current Roles</Heading>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  <Text as="span" fontWeight="bold">Software Engineer at Plansight</Text>
                  <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                    Developing AI-powered platform for business optimization
                  </Text>
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  <Text as="span" fontWeight="bold">Backend Developer at Sigmoid</Text>
                  <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                    Building AI tools for educational purposes
                  </Text>
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  <Text as="span" fontWeight="bold">AI Teacher at Lyceum Aristotel</Text>
                  <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                    Teaching Python and Machine Learning concepts
                  </Text>
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  <Text as="span" fontWeight="bold">Mentor at Tekwill Academy</Text>
                  <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                    Guiding professionals in Applied AI Tools for Business
                  </Text>
                </ListItem>
              </List>
            </Box>

            <Divider />

            <Box>
              <Heading size="md" mb={4}>Get in Touch</Heading>
              <VStack align="stretch" spacing={3}>
                <HStack>
                  <FaEnvelope />
                  <Link href="mailto:negaimarin@gmail.com">negaimarin@gmail.com</Link>
                </HStack>
                <HStack>
                  <FaLinkedin />
                  <Link href="https://linkedin.com/in/marinnegai" isExternal>
                    linkedin.com/in/marinnegai
                  </Link>
                </HStack>
                <HStack>
                  <FaGithub />
                  <Link href="https://github.com/MarinBizarreAdventure" isExternal>
                    github.com/MarinBizarreAdventure
                  </Link>
                </HStack>
              </VStack>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default About;