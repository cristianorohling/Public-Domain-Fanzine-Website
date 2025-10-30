
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
          
          <img src={member.avatarUrl} alt={member.name} className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-gray-700 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-1 text-light-text">{member.name}</h2>
          <p className="text-brand-secondary font-mono mb-2">{member.role}</p>
          {member.instagram && (
            <a 
                href={`https://www.instagram.com/${member.instagram.replace('@', '')}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-medium-text hover:text-brand-primary transition-colors duration-300 mb-6"
            >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049 1.064.218 1.791.465 2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 4.22c.636-.247 1.363-.416 2.427-.465C9.792 2.013 10.146 2 12.315 2zM12 8.118c-2.146 0-3.882 1.736-3.882 3.882s1.736 3.882 3.882 3.882 3.882-1.736 3.882-3.882S14.146 8.118 12 8.118zM12 14.162c-1.205 0-2.182-.977-2.182-2.182s.977-2.182 2.182-2.182 2.182.977 2.182 2.182-.977 2.182-2.182 2.182zM16.802 6.118a1.205 1.205 0 110 2.41 1.205 1.205 0 010-2.41z" clipRule="evenodd" /></svg>
                <span>{member.instagram}</span>
            </a>
          )}
          <p className="text-medium-text text-left">{member.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberModal;
