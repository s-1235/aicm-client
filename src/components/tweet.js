// components/TweetForm.js
import { useState } from 'react';
import { Box, Button, Flex, Input, Textarea } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';

const TweetForm = () => {
  const [tweetText, setTweetText] = useState('');
  const [hasCalendar, setHasCalendar] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleTweetChange = (e) => {
    setTweetText(e.target.value);
  };

  const handleCalendarToggle = () => {
    setHasCalendar((prev) => !prev);
  };

  const handleTweetSubmit = () => {
    // Code to send the tweetText, hasCalendar, and uploadedImage to the backend
    // Your backend should handle the tweet posting with or without a calendar option
    console.log('Tweet Text:', tweetText);
    console.log('Has Calendar:', hasCalendar);
    console.log('Uploaded Image:', uploadedImage);
  };

  // react-dropzone configuration
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedImage(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box>
      <Textarea
        placeholder="What's happening?"
        rows={15} // Set the number of rows for the textarea
        resize="vertical" // Set the resize behavior of the textarea (optional)
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
          <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded" width="200" />
        </Box>
      )}
    </Box>
  );
};

export default TweetForm;
