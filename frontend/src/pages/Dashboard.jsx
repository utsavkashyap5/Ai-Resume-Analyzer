import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Clock, AlertCircle, Upload, FileText, ChevronRight } from 'lucide-react';
import PageContainer from '../components/common/PageContainer';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import UploadDropzone from '../components/dashboard/UploadDropzone';
import JobDescriptionCard from '../components/dashboard/JobDescriptionCard';
import AnalyzeButton from '../components/dashboard/AnalyzeButton';
import RecentAnalysisCard from '../components/dashboard/RecentAnalysisCard';
import EmptyDashboard from '../components/dashboard/EmptyDashboard';
import { uploadResume } from '../api/upload';
import { analyzeResume } from '../api/analyze';
import { getHistory } from '../api/history';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const toast = useToast();

  const [resumeId, setResumeId] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzeProgress, setAnalyzeProgress] = useState(0);
  const [recentAnalyses, setRecentAnalyses] = useState([]);
  const [recentLoading, setRecentLoading] = useState(true);
  const [analyzeError, setAnalyzeError] = useState('');

  const canAnalyze = resumeId && jobDescription.trim().length > 0 && !analyzing;

  const fetchRecent = useCallback(async () => {
    setRecentLoading(true);
    try {
      const data = await getHistory();
      if (data.success) {
        setRecentAnalyses(data.history.slice(0, 3));
      }
    } catch {
      //
    } finally {
      setRecentLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecent();
  }, [fetchRecent]);

  const handleUpload = async (file, onProgress) => {
    setAnalyzeError('');
    const data = await uploadResume(file, onProgress);
    setResumeId(data.resumeId);
    toast.success('Resume uploaded', `${file.name} uploaded successfully.`);
    return data;
  };

  const handleAnalyze = async () => {
    if (!resumeId) {
      toast.error('No resume', 'Please upload a resume first.');
      return;
    }
    if (!jobDescription.trim()) {
      toast.error('Missing job description', 'Please paste a job description.');
      return;
    }

    setAnalyzing(true);
    setAnalyzeProgress(0);
    setAnalyzeError('');

    const interval = setInterval(() => {
      setAnalyzeProgress((p) => {
        if (p >= 85) {
          clearInterval(interval);
          return 85;
        }
        return p + Math.random() * 8;
      });
    }, 800);

    try {
      const data = await analyzeResume(resumeId, jobDescription.trim());
      clearInterval(interval);
      setAnalyzeProgress(100);
      toast.success('Analysis complete', 'Your resume has been analyzed.');
      setTimeout(() => {
        navigate('/results', { state: { analysis: data.analysis } });
      }, 350);
    } catch (err) {
      clearInterval(interval);
      setAnalyzeError(err.message || 'Analysis failed. Please try again.');
      setAnalyzing(false);
    }
  };

  return (
    <PageContainer>
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#2D2A26]"
        >
          Welcome{user ? `, ${user.fullName?.split(' ')[0]}` : ''}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-[#6B665F] mt-1.5"
        >
          Upload your resume and analyze it against any job description
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl bg-[#FFFCF7] border border-[#E8DDD0] shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#8B5E3C]/10 flex items-center justify-center">
                <Upload className="w-4.5 h-4.5 text-[#8B5E3C]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#2D2A26]">Resume</h3>
                <p className="text-xs text-[#6B665F] mt-0.5">Upload your PDF resume</p>
              </div>
            </div>
            <UploadDropzone onUpload={handleUpload} disabled={analyzing} />
          </div>

          <div className="rounded-xl bg-[#FFFCF7] border border-[#E8DDD0] shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#8B5E3C]/10 flex items-center justify-center">
                <FileText className="w-4.5 h-4.5 text-[#8B5E3C]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#2D2A26]">Job Description</h3>
                <p className="text-xs text-[#6B665F] mt-0.5">Paste the target role description</p>
              </div>
            </div>
            <JobDescriptionCard
              value={jobDescription}
              onChange={setJobDescription}
              disabled={analyzing}
            />
          </div>

          {analyzeError && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              className="flex items-start gap-3 p-4 rounded-xl bg-[#C65A5A]/10 border border-[#C65A5A]/20"
            >
              <AlertCircle className="w-5 h-5 text-[#C65A5A] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-[#C65A5A]">Analysis failed</p>
                <p className="text-xs text-[#6B665F] mt-0.5">{analyzeError}</p>
              </div>
            </motion.div>
          )}

          <AnalyzeButton
            onClick={handleAnalyze}
            analyzing={analyzing}
            disabled={!canAnalyze}
            progress={analyzeProgress}
          />

          {analyzing && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-center text-[#6B665F]"
            >
              AI is analyzing your resume against the job description. This may take a moment.
            </motion.p>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-[#FFFCF7] border border-[#E8DDD0] shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#8B5E3C]/10 flex items-center justify-center">
                  <Clock className="w-4.5 h-4.5 text-[#8B5E3C]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#2D2A26]">Recent Analyses</h3>
                  <p className="text-xs text-[#6B665F] mt-0.5">Your latest results</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/history')}
                className="text-xs font-medium text-[#8B5E3C] hover:text-[#6F472D] transition-colors flex items-center gap-0.5"
                aria-label="View all history"
              >
                View all
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {recentLoading ? (
              <div className="space-y-3 py-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse flex items-center gap-3" aria-hidden="true">
                    <div className="w-10 h-10 rounded-lg bg-[#E8DDD0]" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3 w-3/4 rounded bg-[#E8DDD0]" />
                      <div className="h-2.5 w-1/2 rounded bg-[#E8DDD0]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentAnalyses.length > 0 ? (
              <div className="space-y-2">
                {recentAnalyses.map((a, i) => (
                  <RecentAnalysisCard key={a._id} analysis={a} index={i} />
                ))}
              </div>
            ) : (
              <EmptyDashboard />
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
