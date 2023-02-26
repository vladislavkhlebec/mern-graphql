import { Button, Divider, TextField, styled } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';

import { TNote } from '@/types/note';

const Container = styled('div')`
  padding: 3rem;
  background: white;
  border-radius: 0.5rem;
  max-width: 35rem;
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translate(0, -50%);

  & form {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 1rem;
  }
`;

const TitleContainer = styled('div')`
  margin: 0 0 3rem 0;
`;

const validationSchema = yup.object({
  title: yup.string().required('Email is required')
});

export interface INoteFormFields {
  title: string;
  content: string;
}
interface IProps {
  propsInitialValues: Partial<TNote>;
  onSubmit: (values: INoteFormFields) => void;
}

export const NoteForm: React.FC<IProps> = ({ propsInitialValues, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      ...propsInitialValues
    },
    validationSchema: validationSchema,
    onSubmit: (values: INoteFormFields) => {
      onSubmit(values);
    },
    enableReinitialize: true
  });

  return (
    <Container>
      <TitleContainer>
        <h2>Update note</h2>
        <Divider />
      </TitleContainer>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          fullWidth
          multiline
          id="content"
          name="content"
          label="Content"
          type="content"
          value={formik.values.content}
          onChange={formik.handleChange}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.touched.content && formik.errors.content}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};
