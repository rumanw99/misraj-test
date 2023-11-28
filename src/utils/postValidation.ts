// utils/postValidation.ts
import * as yup from 'yup';

export const createPostSchema = yup.object({
  title: yup.string().required('Title is required'),
  body: yup.string().required('Body is required'),
});

export const updatePostSchema = yup.object({
  title: yup.string(),
  body: yup.string(),
});
