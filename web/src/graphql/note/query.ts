import { gql } from '@apollo/client';

export const All_NOTES_QUERY = gql`
  query {
    notes {
      id
      title
      content
    }
  }
`;
