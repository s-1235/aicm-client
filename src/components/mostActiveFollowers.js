import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  useColorModeValue,
  Button,
  Flex,
  Select,
  Spinner
} from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { getSavedMostActiveUsers } from './../utils/api'; // import the function from your api file

const MostActiveUsers = () => {
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isLoading, setIsLoading] = useState(true); // initialize loading state
  const [usersData, setUsersData] = useState([]); // initialize state for users data

  useEffect(() => {
    const fetchMostActiveUsers = async () => {
      setIsLoading(true);
      try {
        const response = await getSavedMostActiveUsers();
        setUsersData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setIsLoading(false);
      }
    };
    fetchMostActiveUsers();
  }, []);

  const sortByColumn = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedUsers = [...(usersData || [])].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    } else {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
  });

  return (
    <Box p={4} mr={60}>
      <Text fontSize="24px" fontWeight="bold" mr="auto" color="#0eb7f4" mb={10}>
        Most Active Users
      </Text>

      {isLoading ? (
        <Flex justifyContent="center" alignItems="center" height="50vh">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <>
          <Flex alignItems="center" mb={4}>
            <Button colorScheme="blue" mr={4} onClick={() => sortByColumn('name')}>
              Name {sortColumn === 'name' && (sortDirection === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />)}
            </Button>
            <Button colorScheme="blue" mr={4} onClick={() => sortByColumn('username')}>
              Username {sortColumn === 'username' && (sortDirection === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />)}
            </Button>
            <Button colorScheme="blue" mr={4} onClick={() => sortByColumn('score')}>
              Score {sortColumn === 'score' && (sortDirection === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />)}
            </Button>
            <Select
              width="180px"
              colorScheme="blue"
              value={sortColumn}
              onChange={(e) => setSortColumn(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="username">Username</option>
              <option value="score">Score</option>
            </Select>
          </Flex>

          <Table variant="simple" bg={useColorModeValue('white', 'gray.800')} boxShadow="md" rounded="md">
            <Thead>
              <Tr>
                <Th cursor="pointer" onClick={() => sortByColumn('name')}>Name {sortColumn === 'name' && (sortDirection === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />)}</Th>
                <Th cursor="pointer" onClick={() => sortByColumn('username')}>Username {sortColumn === 'username' && (sortDirection === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />)}</Th>
                <Th>Description</Th>
                <Th>Profile Image</Th>
                <Th cursor="pointer" onClick={() => sortByColumn('score')}>Score {sortColumn === 'score' && (sortDirection === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />)}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedUsers?.map((user) => (
                <Tr key={user.userId}>
                  <Td>{user.name}</Td>
                  <Td>{user.username}</Td>
                  <Td>{user.description}</Td>
                  <Td>
                    <Avatar size="sm" src={user.profile_image_url} />
                  </Td>
                  <Td>{user.score}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      )}
    </Box>
  );
};

export default MostActiveUsers;
