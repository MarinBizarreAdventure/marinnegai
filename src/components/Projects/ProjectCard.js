import React from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Button,
  HStack,
  Tag,
  IconButton,
  Link,
  Badge,
} from '@chakra-ui/react';
import { FaHeart, FaGithub, FaExternalLinkAlt, FaEdit, FaTrash } from 'react-icons/fa';
import { useData } from '../../contexts/DataContext';

const ProjectCard = ({ project, showActions = false, onEdit }) => {
  const { deleteProject, likeProject } = useData();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(project.id);
    }
  };

  const handleLike = () => {
    likeProject(project.id);
  };

  return (
    <Box
      bg={bg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      p={6}
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
    >
      <Stack spacing={4}>
        <HStack justify="space-between" align="start">
          <Heading size="md">{project.name}</Heading>
          <Badge colorScheme={project.status === 'active' ? 'green' : 'gray'}>
            {project.status}
          </Badge>
        </HStack>

        <Text color={useColorModeValue('gray.600', 'gray.400')}>
          {project.description}
        </Text>

        <HStack spacing={2} flexWrap="wrap">
          {project.technologies?.map((tech, index) => (
            <Tag key={index} size="sm" variant="subtle" colorScheme="blue">
              {tech}
            </Tag>
          ))}
        </HStack>

        <HStack justify="space-between" align="center">
          <HStack spacing={3}>
            {project.githubUrl && (
              <Link href={project.githubUrl} isExternal>
                <IconButton
                  aria-label="View on GitHub"
                  icon={<FaGithub />}
                  size="sm"
                  variant="ghost"
                />
              </Link>
            )}
            {project.liveUrl && (
              <Link href={project.liveUrl} isExternal>
                <IconButton
                  aria-label="View live demo"
                  icon={<FaExternalLinkAlt />}
                  size="sm"
                  variant="ghost"
                />
              </Link>
            )}
            {showActions && (
              <>
                <IconButton
                  aria-label="Edit project"
                  icon={<FaEdit />}
                  size="sm"
                  variant="ghost"
                  onClick={() => onEdit(project)}
                />
                <IconButton
                  aria-label="Delete project"
                  icon={<FaTrash />}
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  onClick={handleDelete}
                />
              </>
            )}
          </HStack>
          
          <HStack>
            <IconButton
              aria-label="Like project"
              icon={<FaHeart />}
              size="sm"
              variant="ghost"
              colorScheme="red"
              onClick={handleLike}
            />
            <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
              {project.likes || 0}
            </Text>
          </HStack>
        </HStack>
      </Stack>
    </Box>
  );
};

export default ProjectCard;