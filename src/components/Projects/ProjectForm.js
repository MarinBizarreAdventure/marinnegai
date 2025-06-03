import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  useColorModeValue,
  Heading,
  Select,
} from '@chakra-ui/react';

const ProjectForm = ({ project, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [status, setStatus] = useState('active');
  const [technologies, setTechnologies] = useState([]);
  const [techInput, setTechInput] = useState('');

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    if (project) {
      setName(project.name || '');
      setDescription(project.description || '');
      setGithubUrl(project.githubUrl || '');
      setLiveUrl(project.liveUrl || '');
      setStatus(project.status || 'active');
      setTechnologies(project.technologies || []);
    }
  }, [project]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      githubUrl,
      liveUrl,
      status,
      technologies,
    });
  };

  const handleAddTech = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput('');
    }
  };

  const handleRemoveTech = (techToRemove) => {
    setTechnologies(technologies.filter(tech => tech !== techToRemove));
  };

  const handleTechInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTech();
    }
  };

  return (
    <Box bg={bg} p={6} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <Heading size="lg" mb={4}>
            {project ? 'Edit Project' : 'Add New Project'}
          </Heading>
          
          <FormControl isRequired>
            <FormLabel>Project Name</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter project name"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your project"
              rows={4}
            />
          </FormControl>

          <FormControl>
            <FormLabel>GitHub URL</FormLabel>
            <Input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username/repo"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Live Demo URL</FormLabel>
            <Input
              type="url"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="https://your-project.com"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="archived">Archived</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Technologies</FormLabel>
            <HStack spacing={2} mb={2}>
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={handleTechInputKeyPress}
                placeholder="Add a technology"
              />
              <Button onClick={handleAddTech} size="sm">
                Add
              </Button>
            </HStack>
            <HStack spacing={2} flexWrap="wrap">
              {technologies.map((tech, index) => (
                <Tag key={index} size="md" variant="solid" colorScheme="blue">
                  <TagLabel>{tech}</TagLabel>
                  <TagCloseButton onClick={() => handleRemoveTech(tech)} />
                </Tag>
              ))}
            </HStack>
          </FormControl>

          <HStack spacing={4} pt={4}>
            <Button type="submit" colorScheme="blue" variant="solid">
              {project ? 'Update Project' : 'Add Project'}
            </Button>
            <Button onClick={onCancel} variant="outline">
              Cancel
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default ProjectForm;