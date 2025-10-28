
import React from 'react';
import type { TeamMember } from '../types';

interface TeamMemberModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

const TeamMemberModal: React.FC<TeamMemberModalProps> = ({ member, onClose }) => {
  if (!member) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-[#1a1a1a] rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto border border-gray-800 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 relative text-center">
           <button
            onClick={onClose}
            className="absolute top-4 right-4 text-medium-text hover:text-light-text transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          
          <img src={member.avatarUrl} alt={member.name} className="w-32 h-32 rounded-full object-cover border-4 border-gray-700 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mt-2 mb-1 text-light-text">{member.name}</h2>
          <p className="text-brand-secondary font-mono mb-6">{member.role}</p>
          <p className="text-medium-text text-left">{member.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberModal;