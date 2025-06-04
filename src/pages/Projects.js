import React, { useState, useMemo } from 'react';
import {
  Box,
  Heading,
  Button,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Select,
  useColorModeValue,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { useData } from '../contexts/DataContext';
import ProjectCard from '../components/Projects/ProjectCard';
import ProjectForm from '../components/Projects/ProjectForm';

const Projects = () => {
  const { projects, addProject, updateProject } = useData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterTech, setFilterTech] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  const emptyTextColor = useColorModeValue('gray.500', 'gray.400');

  // Get all unique technologies
  const allTechnologies = useMemo(() => {
    const techs = new Set();
    projects.forEach(project => {
      project.technologies?.forEach(tech => techs.add(tech));
    });
    return Array.from(techs);
  }, [projects]);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus) {
      filtered = filtered.filter(project => project.status === filterStatus);
    }

    // Technology filter
    if (filterTech) {
      filtered = filtered.filter(project =>
        project.technologies?.includes(filterTech)
      );
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === 'alphabetical') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'likes') {
        return (b.likes || 0) - (a.likes || 0);
      }
      return 0;
    });

    return filtered;
  }, [projects, searchTerm, filterStatus, filterTech, sortBy]);

  const handleSubmit = (projectData) => {
    if (editingProject) {
      updateProject(editingProject.id, projectData);
    } else {
      addProject(projectData);
    }
    handleClose();
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    onOpen();
  };

  const handleClose = () => {
    setEditingProject(null);
    onClose();
  };

  return (
    <Box>
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between" align="center">
          <Heading size="xl">Projects</Heading>
          <Button
            leftIcon={<FaPlus />}
            onClick={onOpen}
            variant="solid"
          >
            Add Project
          </Button>
        </HStack>

        {/* Filters */}
        <HStack spacing={4} flexWrap="wrap">
          <InputGroup maxW="300px">
            <InputLeftElement>
              <FaSearch />
            </InputLeftElement>
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <Select
            placeholder="All statuses"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            maxW="200px"
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="archived">Archived</option>
          </Select>
          <Select
            placeholder="All technologies"
            value={filterTech}
            onChange={(e) => setFilterTech(e.target.value)}
            maxW="200px"
          >
            {allTechnologies.map(tech => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </Select>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            maxW="200px"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="likes">Most Liked</option>
          </Select>
        </HStack>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                showActions={true}
                onEdit={handleEdit}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Box textAlign="center" py={20}>
            <Text fontSize="lg" color={emptyTextColor}>
              {searchTerm || filterStatus || filterTech
                ? 'No projects found matching your criteria.'
                : 'No projects yet. Add your first project!'}
            </Text>
          </Box>
        )}
      </VStack>

      {/* Project Form Modal */}
      <Modal isOpen={isOpen} onClose={handleClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ProjectForm
              project={editingProject}
              onSubmit={handleSubmit}
              onCancel={handleClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Projects;