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
} from '@chakra-ui/react';

const ArticleForm = ({ article, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    if (article) {
      setTitle(article.title || '');
      setDescription(article.description || '');
      setContent(article.content || '');
      setTags(article.tags || []);
    }
  }, [article]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      content,
      tags,
    });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Box bg={bg} p={6} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <Heading size="lg" mb={4}>
            {article ? 'Edit Article' : 'Create New Article'}
          </Heading>
          
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter article title"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of your article"
              rows={3}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Content (Markdown)</FormLabel>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article content in Markdown..."
              rows={15}
              fontFamily="mono"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Tags</FormLabel>
            <HStack spacing={2} mb={2}>
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleTagInputKeyPress}
                placeholder="Add a tag"
              />
              <Button onClick={handleAddTag} size="sm">
                Add
              </Button>
            </HStack>
            <HStack spacing={2} flexWrap="wrap">
              {tags.map((tag, index) => (
                <Tag key={index} size="md" variant="solid" colorScheme="gray">
                  <TagLabel>{tag}</TagLabel>
                  <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                </Tag>
              ))}
            </HStack>
          </FormControl>

          <HStack spacing={4} pt={4}>
            <Button type="submit" colorScheme="blue" variant="solid">
              {article ? 'Update Article' : 'Create Article'}
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

export default ArticleForm;