import React, { useState } from 'react';
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Divider,
} from '@chakra-ui/react';
import { FaHeart, FaGithub, FaExternalLinkAlt, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useData } from '../../contexts/DataContext';

const ProjectCard = ({ project, showActions = false, onEdit }) => {
  const { deleteProject, likeProject } = useData();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    <>
      <Box
        bg={bg}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="lg"
        p={6}
        transition="all 0.3s"
        _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
        cursor="pointer"
        onClick={onOpen}
      >
        <Stack spacing={4}>
          <HStack justify="space-between" align="start">
            <Heading size="md">{project.name}</Heading>
            <Badge colorScheme={project.status === 'active' ? 'green' : 'gray'}>
              {project.status}
            </Badge>
          </HStack>

          <Text color={useColorModeValue('gray.600', 'gray.400')} noOfLines={2}>
            {project.description}
          </Text>

          <HStack spacing={2} flexWrap="wrap">
            {project.technologies?.slice(0, 3).map((tech, index) => (
              <Tag key={index} size="sm" variant="subtle" colorScheme="blue">
                {tech}
              </Tag>
            ))}
            {project.technologies?.length > 3 && (
              <Tag size="sm" variant="subtle" colorScheme="gray">
                +{project.technologies.length - 3}
              </Tag>
            )}
          </HStack>

          <HStack justify="space-between" align="center">
            <HStack spacing={3}>
              <IconButton
                aria-label="View details"
                icon={<FaEye />}
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen();
                }}
              />
              {showActions && (
                <>
                  <IconButton
                    aria-label="Edit project"
                    icon={<FaEdit />}
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(project);
                    }}
                  />
                  <IconButton
                    aria-label="Delete project"
                    icon={<FaTrash />}
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete();
                    }}
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike();
                }}
              />
              <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                {project.likes || 0}
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>

      {/* Project Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack justify="space-between" align="start">
              <Heading size="lg">{project.name}</Heading>
              <Badge colorScheme={project.status === 'active' ? 'green' : 'gray'}>
                {project.status}
              </Badge>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="stretch" spacing={4}>
              <Text fontSize="lg">{project.description}</Text>
              
              <Divider />
              
              <Box>
                <Text fontWeight="bold" mb={2}>Technologies:</Text>
                <HStack spacing={2} flexWrap="wrap">
                  {project.technologies?.map((tech, index) => (
                    <Tag key={index} size="md" variant="solid" colorScheme="blue">
                      {tech}
                    </Tag>
                  ))}
                </HStack>
              </Box>

              <Box>
                <Text fontWeight="bold" mb={2}>Links:</Text>
                <VStack align="stretch" spacing={2}>
                  {project.githubUrl && (
                    <Link href={project.githubUrl} isExternal>
                      <Button leftIcon={<FaGithub />} variant="outline" size="sm" width="full">
                        View on GitHub
                      </Button>
                    </Link>
                  )}
                  {project.liveUrl && (
                    <Link href={project.liveUrl} isExternal>
                      <Button leftIcon={<FaExternalLinkAlt />} variant="outline" size="sm" width="full" colorScheme="green">
                        View Live Demo
                      </Button>
                    </Link>
                  )}
                </VStack>
              </Box>

              <Box>
                <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                  Created: {new Date(project.createdAt).toLocaleDateString()}
                </Text>
                {project.updatedAt && (
                  <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                    Updated: {new Date(project.updatedAt).toLocaleDateString()}
                  </Text>
                )}
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <HStack spacing={3}>
              <HStack>
                <IconButton
                  aria-label="Like project"
                  icon={<FaHeart />}
                  variant="ghost"
                  colorScheme="red"
                  onClick={handleLike}
                />
                <Text>{project.likes || 0} likes</Text>
              </HStack>
              <Button onClick={onClose}>Close</Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProjectCard;