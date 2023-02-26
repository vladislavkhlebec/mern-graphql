import { useMutation } from '@apollo/client';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Divider, styled } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React, { useCallback, useState } from 'react';

import { NestedModal } from '@/components/atoms/NestedModal';
import { INoteFormFields, NoteForm } from '@/components/molecules/NoteForm';
import { ADD_NOTE, DELETE_NOTE, UPDATE_NOTE } from '@/graphql/note/mutation';
import { All_NOTES_QUERY } from '@/graphql/note/query';
import { TNote } from '@/types/note';

const Container = styled('div')`
  margin: 3rem auto 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  max-width: 50rem;
`;

const StyledList = styled(List)`
  width: 100%;
`;

interface IProps {
  data: TNote[] | [];
}
const NList: React.FC<IProps> = ({ data }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<TNote | null>(null);

  const [addNote, { data: addNoteData }] = useMutation(ADD_NOTE, {
    refetchQueries: [{ query: All_NOTES_QUERY }]
  });

  const [updateNote, { data: updateNoteData }] = useMutation(UPDATE_NOTE, {
    refetchQueries: [{ query: All_NOTES_QUERY }]
  });

  const [deleteNote, { data: deleteNoteData }] = useMutation(DELETE_NOTE, {
    refetchQueries: [{ query: All_NOTES_QUERY }]
  });

  const toggleEditModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleEditItem = (item: TNote) => {
    setSelected(item);
    toggleEditModal();
  };
  const handleDeleteItem = (id: string) => {
    deleteNote({
      variables: {
        id
      }
    });
  };

  const handleSubmit = useCallback(
    (values: INoteFormFields) => {
      selected
        ? updateNote({
            variables: {
              id: selected.id,
              title: values.title,
              content: values.content
            }
          })
        : addNote({
            variables: {
              title: values.title,
              content: values.content
            }
          });

      setIsOpenModal(false);
    },
    [selected]
  );

  return (
    <Container>
      <Button color="primary" variant="contained" onClick={toggleEditModal}>
        Create note
      </Button>
      <StyledList>
        {data.map((item, i) => (
          <React.Fragment key={i}>
            <ListItem
              key={i}
              disableGutters
              secondaryAction={
                <div>
                  <IconButton aria-label="comment" onClick={() => handleEditItem(item)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="comment" onClick={() => handleDeleteItem(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              }
            >
              <ListItemText primary={item.title} secondary={item.content} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </StyledList>
      {!data?.length && <div style={{ margin: '0 auto' }}>List of notes is empty! Create a new!</div>}
      <NestedModal hideTrigger={true} isOpen={isOpenModal} onClose={toggleEditModal}>
        <NoteForm onSubmit={handleSubmit} propsInitialValues={selected ? selected : {}} />
      </NestedModal>
    </Container>
  );
};

export default NList;
