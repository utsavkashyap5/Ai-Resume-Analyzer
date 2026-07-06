import api from './axios';

export const uploadResume = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('resume', file);

  const { data } = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: onProgress,
  });
  return data;
};
