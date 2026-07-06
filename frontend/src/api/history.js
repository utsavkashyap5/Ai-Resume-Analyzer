import api from './axios';

export const getHistory = async () => {
  const { data } = await api.get('/history');
  return data;
};

export const deleteAnalysis = async (analysisId) => {
  const { data } = await api.delete(`/history/${analysisId}`);
  return data;
};
