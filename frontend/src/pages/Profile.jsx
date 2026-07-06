import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, FileText, BarChart3 } from 'lucide-react';
import PageContainer from '../components/common/PageContainer';
import SectionHeader from '../components/common/SectionHeader';
import Card from '../components/common/Card';
import { useAuth } from '../context/AuthContext';
import { getHistory } from '../api/history';

const StatCard = ({ icon: Icon, label, value, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 rounded-xl bg-[#FFFCF7] border border-[#E8DDD0]"
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-2xl font-semibold text-[#2D2A26]">{value}</p>
          <p className="text-xs text-[#6B665F]">{label}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Profile = () => {
  const { user } = useAuth();
  const [totalAnalyses, setTotalAnalyses] = useState(0);
  const [totalResumes, setTotalResumes] = useState(0);

  useEffect(() => {
    getHistory()
      .then((data) => {
        if (data.success) {
          setTotalAnalyses(data.history.length);
          const uniqueResumes = new Set(data.history.map((a) => a.resumeId?._id).filter(Boolean));
          setTotalResumes(uniqueResumes.size);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <PageContainer>
      <SectionHeader
        title="Profile"
        description="Your account information"
      />

      <div className="max-w-2xl space-y-6">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#8B5E3C] flex items-center justify-center text-white text-xl font-semibold">
              {user?.fullName?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || '?'}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#2D2A26]">{user?.fullName || 'User'}</h2>
              <div className="flex items-center gap-1.5 text-sm text-[#6B665F] mt-0.5">
                <Mail className="w-3.5 h-3.5" />
                {user?.email || 'No email'}
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard
            icon={BarChart3}
            label="Total Analyses"
            value={totalAnalyses}
            color="bg-[#8B5E3C]/10 text-[#8B5E3C]"
          />
          <StatCard
            icon={FileText}
            label="Resumes Uploaded"
            value={totalResumes}
            color="bg-[#4F7D5C]/10 text-[#4F7D5C]"
          />
        </div>

        <Card>
          <h3 className="text-sm font-semibold text-[#2D2A26] mb-3">Account Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-[#E8DDD0]/50">
              <span className="text-sm text-[#6B665F]">Name</span>
              <span className="text-sm font-medium text-[#2D2A26]">{user?.fullName || '-'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#E8DDD0]/50">
              <span className="text-sm text-[#6B665F]">Email</span>
              <span className="text-sm font-medium text-[#2D2A26]">{user?.email || '-'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#E8DDD0]/50">
              <span className="text-sm text-[#6B665F]">Phone</span>
              <span className="text-sm font-medium text-[#2D2A26]">{user?.phone || '-'}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-[#6B665F]">Role</span>
              <span className="text-sm font-medium capitalize text-[#2D2A26]">{user?.role || '-'}</span>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Profile;
