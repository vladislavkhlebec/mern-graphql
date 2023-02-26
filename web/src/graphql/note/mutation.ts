import { gql } from '@apollo/client';

export const ADD_NOTE = gql`
  mutation createNote($title: String!, $content: String!) {
    createNote(title: $title, content: $content) {
      id
      content
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation updateNote($id: ID!, $title: String!, $content: String) {
    updateNote(id: $id, title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation deleteNote($id: ID!) {
    deleteNote(id: $id)
  }
`;
