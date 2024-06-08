// JobDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Heading, Stack, Tag, Flex, Icon, VStack, Divider, Grid, GridItem } from '@chakra-ui/react';
import { MdLocationOn, MdWork, MdAttachMoney } from 'react-icons/md';

const jobData = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Photosnap",
    location: "Remote",
    postedAt: "1d ago",
    contract: "Full Time",
    cost: 100,
    experienceLevel: "Mid-Level",
    projectType: "Development",
    skills: ["React", "JavaScript", "CSS"],
    description: "Develop user-facing features using React and other modern technologies.",
    responsibilities: "Write clean, maintainable code. Collaborate with cross-functional teams.",
    requirements: "Experience with React and JavaScript. Strong problem-solving skills.",
    niceToHave: "Experience with TypeScript and Redux.",
    futureWork: "Potential to lead front-end projects.",
    toApply: "Submit your resume and cover letter.",
    clientInfo: "Established company with a strong remote work culture.",
    type: "Worldwide"
  },
  // Add more job objects here...
];

const JobDetails = () => {
  const { id } = useParams();
  const job = jobData.find(job => job.id === parseInt(id));

  if (!job) {
    return <Box className="bg-black mt-10 mb-10 mr-24 text-white p-10 rounded-3xl">Job not found</Box>;
  }

  return (
    <Box className="bg-gradient-to-b from-black to-zinc-950 text-white p-10 rounded-3xl mt-10 mb-10 mr-24 shadow-lg">
      <Box mb="6">
        <Heading as="h1" size="xl" mb="2" className="text-teal-300">{job.title}</Heading>
        <Text fontSize="lg" mb="1" className="text-gray-400">{job.company}</Text>
        <Flex align="center" mb="4" className="text-gray-400">
          <Icon as={MdLocationOn} mr="2" />
          <Text fontSize="md">{job.location}</Text>
        </Flex>
        <Flex align="center" className="text-gray-400">
          <Icon as={MdWork} mr="2" />
          <Text fontSize="md">{job.contract}</Text>
        </Flex>
      </Box>

      <Divider my="6" borderColor="gray-700" />

      <Grid templateColumns="repeat(2, 1fr)" gap={6} className="bg-gray-950 p-6 rounded-xl">
        <GridItem colSpan={[2, 1]} className="bg-gray-900 p-4 rounded-lg">
          <Heading as="h2" size="md" mb="2" className="text-teal-300">Job Description</Heading>
          <Text className="text-gray-300">{job.description}</Text>
        </GridItem>
        <GridItem colSpan={[2, 1]} className="bg-gray-900 p-4 rounded-lg">
          <Heading as="h2" size="md" mb="2" className="text-teal-300">Responsibilities</Heading>
          <Text className="text-gray-300">{job.responsibilities}</Text>
        </GridItem>
        <GridItem colSpan={[2, 1]} className="bg-gray-900 p-4 rounded-lg">
          <Heading as="h2" size="md" mb="2" className="text-teal-300">Requirements</Heading>
          <Text className="text-gray-300">{job.requirements}</Text>
        </GridItem>
        <GridItem colSpan={[2, 1]} className="bg-gray-900 p-4 rounded-lg">
          <Heading as="h2" size="md" mb="2" className="text-teal-300">Nice to Have</Heading>
          <Text className="text-gray-300">{job.niceToHave}</Text>
        </GridItem>
        <GridItem colSpan={[2, 1]} className="bg-gray-900 p-4 rounded-lg">
          <Heading as="h2" size="md" mb="2" className="text-teal-300">Future Work</Heading>
          <Text className="text-gray-300">{job.futureWork}</Text>
        </GridItem>
        <GridItem colSpan={[2, 1]} className="bg-gray-900 p-4 rounded-lg">
          <Heading as="h2" size="md" mb="2" className="text-teal-300">To Apply</Heading>
          <Text className="text-gray-300">{job.toApply}</Text>
        </GridItem>
      </Grid>

      <Divider my="6" borderColor="gray-900" />

      <Box mb="5" className="bg-gray-900 p-6 rounded-xl">
        <Heading as="h2" size="md" mb="2" className="text-teal-300">About the Client</Heading>
        <Text className="text-gray-300">{job.clientInfo}</Text>
      </Box>

      <Divider my="6" borderColor="gray-900" />

      <Box mb="5" className="bg-gray-900 p-6 rounded-xl">
        <Heading as="h2" size="md" mb="2" className="text-teal-300">Skills and Expertise</Heading>
        <Stack direction="row" spacing={4} wrap="wrap">
          {job.skills.map(skill => (
            <Tag size="lg" key={skill} variant="solid" colorScheme="teal">{skill}</Tag>
          ))}
        </Stack>
      </Box>

      <Flex align="center" mt="4">
        <Icon as={MdAttachMoney} mr="2" />
        <Text fontSize="lg" className="text-teal-300">${job.cost}K/Mo</Text>
      </Flex>
    </Box>
  );
};

export default JobDetails;
