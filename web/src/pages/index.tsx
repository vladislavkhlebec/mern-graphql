import { gql, useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import React from 'react';

import { Layout } from '@/components/molecules/Layout';
import NList from '@/components/organisms/NList';
import { All_NOTES_QUERY } from '@/graphql/note/query';

const Home = () => {
  const { data } = useQuery(All_NOTES_QUERY);

  return (
    <Layout>
      <Box>
        <Container maxWidth="sm">
          <NList data={data?.notes || []} />
        </Container>
      </Box>
    </Layout>
  );
};

export default Home;
