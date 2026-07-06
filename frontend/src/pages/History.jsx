import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUpDown } from 'lucide-react';
import PageContainer from '../components/common/PageContainer';
import SectionHeader from '../components/common/SectionHeader';
import { useToast } from '../components/common/Toast';
import HistoryCard from '../components/history/HistoryCard';
import DeleteConfirmModal from '../components/history/DeleteConfirmModal';
import HistoryEmpty from '../components/history/HistoryEmpty';
import HistorySkeleton from '../components/history/HistorySkeleton';
import ErrorState from '../components/common/ErrorState';
import { getHistory, deleteAnalysis } from '../api/history';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'score', label: 'Highest ATS' },
];

const History = () => {
  const toast = useToast();

  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getHistory();
      if (data.success) {
        setAnalyses(data.history);
      }
    } catch (err) {
      setError(err.message || 'Failed to load history');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const filteredAndSorted = useMemo(() => {
    let result = [...analyses];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((a) =>
        (a.resumeId?.fileName || '').toLowerCase().includes(q) ||
        (a.jobDescription || '').toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      if (sort === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sort === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sort === 'score') {
        const scoreA = a.analysisResult?.ats_score ?? a.analysisResult?.atsScore ?? -1;
        const scoreB = b.analysisResult?.ats_score ?? b.analysisResult?.atsScore ?? -1;
        return scoreB - scoreA;
      }
      return 0;
    });

    return result;
  }, [analyses, search, sort]);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteAnalysis(deleteId);
      setAnalyses((prev) => prev.filter((a) => a._id !== deleteId));
      toast.success('Deleted', 'Analysis has been removed successfully.');
      setDeleteId(null);
    } catch (err) {
      toast.error('Delete failed', err.message || 'Could not delete analysis.');
    } finally {
      setDeleting(false);
    }
  };

  if (error && analyses.length === 0) {
    return (
      <PageContainer>
        <SectionHeader title="History" description="View your past resume analyses" />
        <ErrorState title="Failed to load history" message={error} onRetry={fetchHistory} />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SectionHeader
        title="History"
        description="View your past resume analyses"
      />

      {!loading && analyses.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B665F]" aria-hidden="true" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by resume name or job description..."
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#E8DDD0] bg-[#FFFCF7] text-sm text-[#2D2A26] placeholder-[#6B665F]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/30 focus:border-[#8B5E3C] transition-colors"
              aria-label="Search analyses"
            />
          </div>
          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B665F] pointer-events-none" aria-hidden="true" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none pl-9 pr-8 py-2.5 rounded-lg border border-[#E8DDD0] bg-[#FFFCF7] text-sm text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/30 focus:border-[#8B5E3C] transition-colors cursor-pointer"
              aria-label="Sort analyses"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {loading ? (
        <HistorySkeleton />
      ) : filteredAndSorted.length === 0 ? (
        analyses.length === 0 ? <HistoryEmpty /> : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Search className="w-10 h-10 text-[#6B665F] mb-3" />
            <h3 className="text-base font-semibold text-[#2D2A26] mb-1">No matches found</h3>
            <p className="text-sm text-[#6B665F]">Try adjusting your search query</p>
          </div>
        )
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-[#6B665F]">
            {filteredAndSorted.length} of {analyses.length} analysis{analyses.length !== 1 ? 'es' : ''}
          </p>
          <AnimatePresence mode="popLayout">
            {filteredAndSorted.map((a, i) => (
              <HistoryCard key={a._id} analysis={a} index={i} onDelete={handleDeleteClick} />
            ))}
          </AnimatePresence>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        loading={deleting}
      />
    </PageContainer>
  );
};

export default History;
