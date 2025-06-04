import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Container,
  SimpleGrid,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { FaFileAlt, FaProjectDiagram, FaArrowRight } from 'react-icons/fa';
import { useData } from '../contexts/DataContext';
import ArticleCard from '../components/Articles/ArticleCard';
import ProjectCard from '../components/Projects/ProjectCard';

const Home = () => {
  const { articles, projects } = useData();
  const bg = useColorModeValue('gray.50', 'gray.900');
  const emptyTextColor = useColorModeValue('gray.500', 'gray.400');
  
  // Get latest 3 articles and projects
  const latestArticles = articles.slice(-3).reverse();
  const latestProjects = projects.slice(-3).reverse();

  return (
    <Box>
      {/* Hero Section */}
      <Box bg={useColorModeValue('brand.cream', 'gray.900')} py={20} mb={10} borderRadius="lg">
        <Container maxW="container.md">
          <VStack spacing={6} textAlign="center">
            <Heading size="2xl">Hi, I'm Marin Negai</Heading>
            <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')}>
              Machine Learning Engineer & Software Developer
            </Text>
            <Text fontSize="lg" maxW="2xl">
              Welcome to my personal space where I share my thoughts, projects, and journey 
              in the world of technology and software development.
            </Text>
            <HStack spacing={4} pt={4}>
              <Button as={RouterLink} to="/articles" rightIcon={<FaArrowRight />} variant="solid">
                Read Articles
              </Button>
              <Button as={RouterLink} to="/projects" rightIcon={<FaArrowRight />} variant="outline">
                View Projects
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Latest Articles Section */}
      <Box mb={16}>
        <HStack justify="space-between" align="center" mb={8}>
          <Heading size="lg">
            <Icon as={FaFileAlt} mr={2} />
            Latest Articles
          </Heading>
          <Button as={RouterLink} to="/articles" variant="ghost" rightIcon={<FaArrowRight />}>
            View All
          </Button>
        </HStack>
        {latestArticles.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </SimpleGrid>
        ) : (
          <Box textAlign="center" py={10}>
            <Text color={emptyTextColor}>
              No articles yet. Start writing!
            </Text>
            <Button as={RouterLink} to="/articles" mt={4} variant="outline">
              Create Your First Article
            </Button>
          </Box>
        )}
      </Box>

      {/* Latest Projects Section */}
      <Box>
        <HStack justify="space-between" align="center" mb={8}>
          <Heading size="lg">
            <Icon as={FaProjectDiagram} mr={2} />
            Latest Projects
          </Heading>
          <Button as={RouterLink} to="/projects" variant="ghost" rightIcon={<FaArrowRight />}>
            View All
          </Button>
        </HStack>
        {latestProjects.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {latestProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </SimpleGrid>
        ) : (
          <Box textAlign="center" py={10}>
            <Text color={emptyTextColor}>
              No projects yet. Add your first project!
            </Text>
            <Button as={RouterLink} to="/projects" mt={4} variant="outline">
              Add Your First Project
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;