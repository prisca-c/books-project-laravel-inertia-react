import axios from 'axios';

export const getAuthors = async () => {
  return await axios.get(route('authors.index'));
};

export const getPublishers = async () => {
  return await axios.get(route('publishers.index'));
};

export const getTags = async () => {
  return await axios.get(route('tags.index'));
};
