import React, { useState } from 'react';
import {
  Box,
  Text,
  Select,
  FormControl,
  FormLabel,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { AiFillLike, AiFillComment, AiFillRetweet, AiOutlineSend } from 'react-icons/ai';

const ActiveFollowersDetails = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [message, setMessage] = useState('');
  const [mostActiveFollowers, setMostActiveFollowers] = useState([]);
  const [selectedFollower, setSelectedFollower] = useState(null);

  // Dummy data for demonstration
  const dummyFollowers = [
    {
      id: 1,
      name: 'John Doe',
      picture: 'https://via.placeholder.com/50',
      likesCount: 500,
      commentsCount: 300,
      retweetsCount: 200,
    },
    {
      id: 2,
      name: 'Jane Smith',
      picture: 'https://via.placeholder.com/50',
      likesCount: 400,
      commentsCount: 350,
      retweetsCount: 150,
    },
    // Add more dummy data...
  ];

  // Dummy data for interaction details
  const dummyInteractionDetails = {
    posts: [
      {
        id: 1,
        content: 'This is a post by John Doe',
        likes: 100,
        comments: 50,
        retweets: 20,
      },
      {
        id: 2,
        content: 'Another post by John Doe',
        likes: 120,
        comments: 70,
        retweets: 30,
      },
      // Add more posts...
    ],
    likedPosts: [
      {
        id: 1,
        content: 'John Doe liked this post',
        likes: 0,
        comments: 0,
        retweets: 0,
      },
      {
        id: 2,
        content: 'John Doe liked another post',
        likes: 0,
        comments: 0,
        retweets: 0,
      },
      // Add more liked posts...
    ],
    commentedPosts: [
      {
        id: 1,
        content: 'John Doe commented on this post',
        likes: 0,
        comments: 0,
        retweets: 0,
      },
      {
        id: 2,
        content: 'John Doe commented on another post',
        likes: 0,
        comments: 0,
        retweets: 0,
      },
      // Add more commented posts...
    ],
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSendMessage = () => {
    // Implement the logic to send the message to active followers based on the selected option and message
    console.log('Sending message to active followers:', selectedOption, message);
  };

  const handleShowMostActiveFollowers = () => {
    // Sort followers based on the selected option
    let sortedFollowers = [];
    switch (selectedOption) {
      case 'like_most':
        sortedFollowers = dummyFollowers.sort((a, b) => b.likesCount - a.likesCount);
        break;
      case 'comment_most':
        sortedFollowers = dummyFollowers.sort((a, b) => b.commentsCount - a.commentsCount);
        break;
      case 'retweet_most':
        sortedFollowers = dummyFollowers.sort((a, b) => b.retweetsCount - a.retweetsCount);
        break;
      default:
        sortedFollowers = dummyFollowers;
    }

    // Set the most active followers to state
    setMostActiveFollowers(sortedFollowers);
  };

  const handleShowInteractionDetails = (follower) => {
    setSelectedFollower(follower);
  };

  const handleCloseModal = () => {
    setSelectedFollower(null);
  };

  return (
    <Box p={4}>
      <Box
        backgroundColor="white"
        border="2px solid #d1d1d1"
        borderRadius="10px"
        p={6}
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
        maxWidth="1000px"
        width="100%"
      >
        <Text fontSize="24px" fontWeight="bold" mb="20px" color="#0eb7f4">
          Active Followers Details
        </Text>
        <FormControl mb={4}>
          <FormLabel>Choose active followers based on:</FormLabel>
          <Select value={selectedOption} onChange={handleOptionChange}>
            <option value="like_most">Like Most</option>
            <option value="comment_most">Comment Most</option>
            <option value="retweet_most">Retweet Most</option>
          </Select>
        </FormControl>
        <Button colorScheme="blue" onClick={handleShowMostActiveFollowers}>
          Show Most Active Followers
        </Button>

        {mostActiveFollowers.length > 0 && (
          <Table variant="simple" mt={4}>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Profile Picture</Th>
                <Th>Likes</Th>
                <Th>Comments</Th>
                <Th>Retweets</Th>
                <Th>Send Message</Th>
                <Th>Interaction Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              {mostActiveFollowers.map((follower) => (
                <Tr key={follower.id}>
                  <Td>{follower.name}</Td>
                  <Td>
                    <Avatar size="sm" src={follower.picture} />
                  </Td>
                  <Td>{follower.likesCount}</Td>
                  <Td>{follower.commentsCount}</Td>
                  <Td>{follower.retweetsCount}</Td>
                  <Td>
                    <IconButton
                      icon={<AiOutlineSend />}
                      colorScheme="blue"
                      onClick={() => handleSendMessage(follower)}
                    />
                  </Td>
                  <Td>
                    <IconButton
                      icon={<AiFillLike />}
                      colorScheme="blue"
                      onClick={() => handleShowInteractionDetails(follower)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}

        {/* Modal for showing interaction details */}
        {selectedFollower !== null && (
          <Modal isOpen={selectedFollower !== null} onClose={handleCloseModal}>
            <ModalOverlay />
            <ModalContent maxWidth="1000px">
              <ModalHeader>Interaction Details for {selectedFollower?.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody width="800px" maxHeight="70vh" overflowY="auto">
                <Box>
                  <Text fontWeight="bold">Posts:</Text>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Content</Th>
                        <Th>Likes</Th>
                        <Th>Comments</Th>
                        <Th>Retweets</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {dummyInteractionDetails.posts.map((post) => (
                        <Tr key={post.id}>
                          <Td>{post.content}</Td>
                          <Td>{post.likes}</Td>
                          <Td>{post.comments}</Td>
                          <Td>{post.retweets}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
                <Box mt={4}>
                  <Text fontWeight="bold">Liked Posts:</Text>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Content</Th>
                        <Th>Likes</Th>
                        <Th>Comments</Th>
                        <Th>Retweets</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {dummyInteractionDetails.likedPosts.map((post) => (
                        <Tr key={post.id}>
                          <Td>{post.content}</Td>
                          <Td>{post.likes}</Td>
                          <Td>{post.comments}</Td>
                          <Td>{post.retweets}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
                <Box mt={4}>
                  <Text fontWeight="bold">Commented Posts:</Text>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Content</Th>
                        <Th>Likes</Th>
                        <Th>Comments</Th>
                        <Th>Retweets</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {dummyInteractionDetails.commentedPosts.map((post) => (
                        <Tr key={post.id}>
                          <Td>{post.content}</Td>
                          <Td>{post.likes}</Td>
                          <Td>{post.comments}</Td>
                          <Td>{post.retweets}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" onClick={handleCloseModal}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Box>
    </Box>
  );
};

export default ActiveFollowersDetails;
