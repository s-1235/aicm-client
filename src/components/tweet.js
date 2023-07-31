import { useState } from 'react';
import { Box, Button, Flex, Textarea, Image, useToast, useDisclosure } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const TweetForm = ({ onClose }) => {
  const [tweetText, setTweetText] = useState('');
  const [hasCalendar, setHasCalendar] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const toast = useToast();
  const token = localStorage.getItem('token');

  const handleTweetChange = (e) => {
    setTweetText(e.target.value);
  };

  const handleCalendarToggle = () => {
    setHasCalendar((prev) => !prev);
  };

  const handleTweetSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append('tweetContent', tweetText);
      if (hasCalendar) {
        formData.append('hasCalendar', hasCalendar);
      }
      if (uploadedImage) {
        formData.append('imageData', uploadedImage);
      }

      const response = await postTweet(formData);
      toast({
        title: "Success",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error generating tweet:', error);
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedImage(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const postTweet = async (formData) => {
    try {
      return await axios.post(`http://localhost:3000/api/twitter/generate`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
    } catch (exception) {
      console.error('Failed to post tweet', exception);
      throw exception;
    }
  };

  return (
    <Box>
      <Textarea
        placeholder="What's happening?"
        rows={15} 
        resize="vertical"
        mb={4}
        value={tweetText}
        onChange={handleTweetChange}
      />
      <Flex mt={2}>
        <Button colorScheme={hasCalendar ? 'green' : 'gray'} onClick={handleCalendarToggle}>
          {hasCalendar ? 'With Calendar 📅' : 'Without Calendar'}
        </Button>
        <Box ml={2} {...getRootProps()} cursor="pointer">
          <input {...getInputProps()} />
          <Button colorScheme="teal">Upload Image</Button>
        </Box>
        <Button ml={2} onClick={handleTweetSubmit} colorScheme="blue">
          Tweet
        </Button>
      </Flex>
      {uploadedImage && (
        <Box mt={4}>
          <p>Uploaded Image:</p>
          <Image src={URL.createObjectURL(uploadedImage)} alt="Uploaded" width="200" />
        </Box>
      )}
    </Box>
  );
};

export default TweetForm;
