import React, { useState, useEffect } from 'react';
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
import { getAllRetrievedTweets } from './../utils/api';

const ActiveFollowersDetails = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [message, setMessage] = useState('');
  const [mostActiveFollowers, setMostActiveFollowers] = useState([]);
  const [selectedFollower, setSelectedFollower] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const openModal = (follower) => {
    setSelectedFollower(follower);
    setIsOpen(true);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllRetrievedTweets();
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchPosts();
  }, []);

  const computeUserScores = (data) => {
    const userScores = {};

    data.forEach(post => {
      if (post.mostActiveUser) {
        post.mostActiveUser.forEach(user => {
          if (!userScores[user.userId]) {
            userScores[user.userId] = {
              name: user.name,
              username: user.username,
              profile_image_url: user.profile_image_url,
              likes: 0,
              retweets: 0
            };
          }
          if (user.score === 1 || user.score === 3) {
            userScores[user.userId].likes += 1;
          }
          if (user.score === 2 || user.score === 3) {
            userScores[user.userId].retweets += 1;
          }
        });
      }
    });

    return Object.values(userScores);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    const scores = computeUserScores(posts);

    let sortedFollowers = [];
    switch (event.target.value) {
      case 'like_most':
        sortedFollowers = scores.sort((a, b) => b.likes - a.likes);
        break;
      case 'retweet_most':
        sortedFollowers = scores.sort((a, b) => b.retweets - a.retweets);
        break;
      default:
        sortedFollowers = scores;
    }

    setMostActiveFollowers(sortedFollowers);
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
            <option value="retweet_most">Retweet Most</option>
          </Select>
        </FormControl>

        {mostActiveFollowers.length > 0 && (
          <Table variant="simple" mt={4}>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Username</Th>
                <Th>Profile Picture</Th>
                <Th>Likes</Th>
                <Th>Retweets</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {mostActiveFollowers.map((follower, index) => (
                <Tr key={index}>
                  <Td>{follower.name}</Td>
                  <Td>{follower.username}</Td>
                  <Td>
                    <Avatar size="sm" src={follower.profile_image_url} />
                  </Td>
                  <Td>{follower.likes}</Td>
                  <Td>{follower.retweets}</Td>
                  <Td>
                    <IconButton
                      onClick={() => openModal(follower)}
                      icon={<AiOutlineSend />}
                      aria-label="Send message"
                      colorScheme="twitter"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}

        {selectedFollower && (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Message {selectedFollower.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Enter your message</FormLabel>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    style={{ width: '100%', padding: '10px', minHeight: '150px' }}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="twitter" mr={3} onClick={onClose}>
                  Send
                </Button>
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Box>
    </Box>
  );
};

export default ActiveFollowersDetails;
