
import React, { useState } from 'react';
import type { TeamMember } from '../types';
import { getTeam } from '../services/contentService';
import TeamMemberModal from './TeamMemberModal';

const TeamMemberCard: React.FC<{ member: TeamMember; onSelect: () => void }> = ({ member, onSelect }) => (
  <button onClick={onSelect} className="group text-center focus:outline-none focus:ring-2 focus:ring-brand-primary ring-offset-2 ring-offset-dark-bg rounded-lg p-4 transform hover:-translate-y-1 transition-transform duration-300">
    <img className="mx-auto h-32 w-32 rounded-full object-cover border-4 border-gray-800 group-hover:border-brand-secondary transition-colors duration-300" src={member.avatarUrl} alt={member.name} />
    <h3 className="mt-6 text-xl font-bold text-light-text">{member.name}</h3>
    <p className="text-brand-secondary font-mono">{member.role}</p>
    {member.instagram && (
        <p className="text-sm text-medium-text mt-1">{member.instagram}</p>
    )}
  </button>
);

const Team: React.FC = () => {
  const team = getTeam();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <>
      <section className="py-16 md:py-24 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter">Nossa Equipe</h2>
            <p className="mt-4 text-base sm:text-lg text-medium-text max-w-2xl mx-auto">As mentes criativas por trás da Public Domain Fanzine.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {team.map((member) => (
              <TeamMemberCard key={member.name} member={member} onSelect={() => setSelectedMember(member)} />
            ))}
          </div>
        </div>
      </section>
      <TeamMemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
    </>
  );
};

export default Team;
