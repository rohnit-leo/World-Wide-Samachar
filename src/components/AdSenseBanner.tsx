import React from 'react';

interface AdSenseBannerProps {
  type: 'leaderboard' | 'rectangle' | 'sidebar' | 'in-article' | 'responsive';
  slotId?: string;
  className?: string;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({ type, className = '' }) => {
  return (
    <div className={`my-4 relative bg-gray-100 border border-dashed border-gray-300 rounded-lg overflow-hidden flex flex-col items-center justify-center p-3 text-center text-xs text-gray-500 hover:border-gray-400 transition-colors ${className}`}>
      <span className="absolute top-1 right-2 text-[10px] uppercase tracking-wider font-semibold text-gray-500 bg-white/90 px-2 py-0.5 rounded border border-gray-200">
        विज्ञापन / Advertisement
      </span>
      
      {type === 'leaderboard' && (
        <div className="w-full max-w-[728px] h-[90px] flex flex-col items-center justify-center bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 border border-gray-200 rounded p-2">
          <div className="font-extrabold text-[#C60000] text-sm">Header / Footer Banner – 728 × 90 px</div>
          <div className="text-[11px] text-gray-600 mt-1 font-medium">गूगल एडसेंस लीडरबोर्ड विज्ञापन स्थान (High Impact Placement)</div>
        </div>
      )}

      {type === 'rectangle' && (
        <div className="w-full max-w-[336px] h-[280px] flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded p-4">
          <div className="w-10 h-10 rounded-full bg-red-100 text-[#C60000] flex items-center justify-center font-bold mb-2 shadow-2xs">Ad</div>
          <div className="font-extrabold text-gray-900 text-sm">Center Banner – 336 × 280 px</div>
          <p className="text-[11px] text-gray-500 mt-1 max-w-[240px]">मीडियम रेक्टेंगल विज्ञापन स्थान</p>
        </div>
      )}

      {type === 'sidebar' && (
        <div className="w-full h-[250px] flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded p-3">
          <div className="font-extrabold text-gray-900 text-xs">Sidebar Banner – 300 × 250 px</div>
          <div className="text-[10px] text-gray-500 mt-1 font-medium">साइडबार विज़िबिलिटी विज्ञापन स्थान</div>
        </div>
      )}

      {type === 'in-article' && (
        <div className="w-full h-[120px] flex flex-col items-center justify-center bg-amber-50/60 border border-amber-200/80 rounded my-2 p-3">
          <div className="font-extrabold text-gray-900 text-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C60000]"></span>
            Footer Article Banner – 728 × 90 px
          </div>
          <div className="text-[11px] text-gray-600 mt-1">लेख के अंत में विज्ञापन बॉक्स (Ad Box)</div>
        </div>
      )}

      {type === 'responsive' && (
        <div className="w-full h-[100px] sm:h-[120px] flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded p-2">
          <div className="font-extrabold text-gray-800 text-xs">Responsive Banner – 728 × 90 px</div>
          <div className="text-[10px] text-gray-500 mt-1">मोबाइल व डेस्कटॉप अनुकूल एडसेंस स्थान</div>
        </div>
      )}
    </div>
  );
};
