import api from './axios';

export const analyzeResume = async (resumeId, jobDescription) => {
  const { data } = await api.post(`/analyze/${resumeId}`, { jobDescription });
  return data;
};
