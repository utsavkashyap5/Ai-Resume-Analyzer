import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import PageContainer from '../components/common/PageContainer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import ATSScoreCard from '../components/results/ATSScoreCard';
import CategoryScoresGrid from '../components/results/CategoryScoresGrid';
import SummaryCard from '../components/results/SummaryCard';
import StrengthsList from '../components/results/StrengthsList';
import KeywordChips from '../components/results/KeywordChips';
import SkillsGapList from '../components/results/SkillsGapList';
import WeakBulletsList from '../components/results/WeakBulletsList';
import RecommendedProjects from '../components/results/RecommendedProjects';
import RecommendedCerts from '../components/results/RecommendedCerts';
import ResultsSkeleton from '../components/results/ResultsSkeleton';
import ResultsError from '../components/results/ResultsError';
import { normalizeAnalysis } from '../utils/analysis';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const raw = location.state?.analysis;
    if (raw) {
      setData(normalizeAnalysis(raw));
    }
    setLoading(false);
  }, [location.state]);

  if (loading) return <PageContainer><ResultsSkeleton /></PageContainer>;
  if (!data) return <PageContainer><ResultsError /></PageContainer>;

  const {
    atsScore,
    categoryScores,
    matchedKeywords,
    missingKeywords,
    skillsGap,
    strengths,
    weakBullets,
    recommendedProjects,
    recommendedCertifications,
    summary,
  } = data;

  const hasKeywords = matchedKeywords.length > 0 || missingKeywords.length > 0;
  const hasStrengths = strengths.length > 0;
  const hasSkillsGap = skillsGap.length > 0;
  const hasWeakBullets = weakBullets.length > 0;
  const hasProjects = recommendedProjects.length > 0;
  const hasCerts = recommendedCertifications.length > 0;

  return (
    <PageContainer>
      <div className="flex items-center gap-4 mb-7">
        <Button variant="ghost" size="sm" icon={ArrowLeft} onClick={() => navigate('/dashboard')} aria-label="Back to dashboard">
          Back
        </Button>
        <div className="flex-1" />
        <Button variant="primary" size="sm" icon={Sparkles} onClick={() => navigate('/dashboard')}>
          Analyze Again
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-7">
        <div className="lg:col-span-1">
          <Card>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B665F] mb-1">ATS Score</h3>
            <ATSScoreCard score={atsScore} />
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B665F] mb-5">Category Scores</h3>
            <CategoryScoresGrid scores={categoryScores} />
          </Card>
        </div>
      </div>

      {summary && <div className="mb-7"><SummaryCard summary={summary} /></div>}

      {hasStrengths && (
        <Card className="mb-7">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B665F] mb-4">Strengths</h3>
          <StrengthsList strengths={strengths} />
        </Card>
      )}

      {hasKeywords && (
        <Card className="mb-7">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B665F] mb-4">Keyword Analysis</h3>
          <KeywordChips matched={matchedKeywords} missing={missingKeywords} />
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-7">
        {hasSkillsGap && (
          <Card>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B665F] mb-4">Skills Gap</h3>
            <SkillsGapList skills={skillsGap} />
          </Card>
        )}
        {hasWeakBullets && (
          <Card>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B665F] mb-4">Weak Bullet Improvements</h3>
            <WeakBulletsList bullets={weakBullets} />
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-7">
        {hasProjects && (
          <Card>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B665F] mb-4">Recommended Projects</h3>
            <RecommendedProjects projects={recommendedProjects} />
          </Card>
        )}
        {hasCerts && (
          <Card>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6B665F] mb-4">Recommended Certifications</h3>
            <RecommendedCerts certifications={recommendedCertifications} />
          </Card>
        )}
      </div>
    </PageContainer>
  );
};

export default Results;
