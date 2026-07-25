import React from 'react';

interface AdSenseBannerProps {
  type: 'leaderboard' | 'rectangle' | 'sidebar' | 'in-article' | 'responsive';
  slotId?: string;
  className?: string;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({ type, className = '' }) => {
  return (
    <div className={`my-4 relative bg-gray-100 border border-dashed border-gray-300 rounded-lg overflow-hidden flex flex-col items-center justify-center p-3 text-center text-xs text-gray-500 hover:border-gray-400 transition-colors ${className}`}>
      <span className="absolute top-1 right-2 text-[10px] uppercase tracking-wider font-medium text-gray-400 bg-white/80 px-1.5 py-0.5 rounded">
        विज्ञापन / Advertisement
      </span>
      
      {type === 'leaderboard' && (
        <div className="w-full max-w-[728px] h-[90px] flex flex-col items-center justify-center bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 border border-gray-200 rounded">
          <div className="font-semibold text-gray-700 text-sm">Google AdSense - 728x90 लीडरबोर्ड विज्ञापन स्थान</div>
          <div className="text-[11px] text-gray-400 mt-1">आपकी विज्ञापनों की उच्च दृश्यता (High CPM Placement)</div>
        </div>
      )}

      {type === 'rectangle' && (
        <div className="w-full max-w-[336px] h-[280px] flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded p-4">
          <div className="w-10 h-10 rounded-full bg-red-100 text-[#C60000] flex items-center justify-center font-bold mb-2">Ad</div>
          <div className="font-semibold text-gray-700 text-sm">336x280 रेक्टेंगल विज्ञापन</div>
          <p className="text-[11px] text-gray-400 mt-1 max-w-[240px]">लक्ष्य आधारित एडसेंस विज्ञापनों के लिए सुरक्षित स्थान</p>
        </div>
      )}

      {type === 'sidebar' && (
        <div className="w-full h-[250px] flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded p-3">
          <div className="font-semibold text-gray-700 text-xs">साइडबार विज्ञापन प्लेसमेंट</div>
          <div className="text-[10px] text-gray-400 mt-1">Responsive Sidebar Unit</div>
        </div>
      )}

      {type === 'in-article' && (
        <div className="w-full h-[120px] flex flex-col items-center justify-center bg-amber-50/50 border border-amber-200/60 rounded my-4 p-3">
          <div className="font-semibold text-gray-800 text-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            लेख के बीच विज्ञापन स्थान (In-Article Ad)
          </div>
          <div className="text-[11px] text-gray-500 mt-1">पाठकों के संलग्नता (Engagement) को ध्यान में रखकर तैयार स्थान</div>
        </div>
      )}

      {type === 'responsive' && (
        <div className="w-full h-[100px] sm:h-[120px] flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded">
          <div className="font-semibold text-gray-700 text-xs">रिफ्रेश योग्य रेस्पॉन्सिव विज्ञापन</div>
        </div>
      )}
    </div>
  );
};
