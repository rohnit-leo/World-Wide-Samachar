import React, { useState } from 'react';
import { Camera, Images, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const PhotoGallerySection: React.FC = () => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const photoStories = [
    {
      title: 'सावन उत्सव: अयोध्या में सरयू तट और राम जन्मभूमि परिसर की मनमोहक तस्वीरें',
      category: 'धर्म एवं फोटो',
      count: 12,
      imageUrl: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=1000&auto=format&fit=crop&q=80',
      caption: 'सरयू तट पर शाम की महाआरती और लेजर शो का भव्य दृश्य।'
    },
    {
      title: 'मानसून 2026: उत्तर भारत के पर्वतीय इलाकों में प्रकृति की अद्भुत छटा',
      category: 'प्रकृति एवं फोटो',
      count: 8,
      imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1000&auto=format&fit=crop&q=80',
      caption: 'हिमाचल व उत्तराखंड की वादियों में बादलों का नज़ारा।'
    },
    {
      title: 'नोएडा सेमीकंडक्टर कॉम्प्लेक्स: भारत के विशालकाय चिप प्लांट की अंदरूनी झलक',
      category: 'विकास फोटो',
      count: 15,
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&auto=format&fit=crop&q=80',
      caption: 'क्लीन रूम लैब और एडवांस्ड एआई सिलिकॉन वेफर निर्माण।'
    },
    {
      title: 'राष्ट्रीय फिल्म पुरस्कार 2026: विजेताओं और सितारों का लाल कालीन पर जलवा',
      category: 'मनोरंजन फोटो',
      count: 20,
      imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1000&auto=format&fit=crop&q=80',
      caption: 'विज्ञान भवन नई दिल्ली में आयोजित भव्य राष्ट्रीय पुरस्कार समारोह।'
    }
  ];

  const handleNextPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev! + 1) % photoStories.length);
    }
  };

  const handlePrevPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev! - 1 + photoStories.length) % photoStories.length);
    }
  };

  return (
    <section className="my-8 bg-slate-900 text-white rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
        <div className="flex items-center gap-2">
          <Camera className="w-6 h-6 text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-amber-300">
            फोटो गैलरी (Photo Stories)
          </h2>
        </div>
        <span className="text-xs bg-slate-800 text-amber-300 border border-slate-700 px-3 py-1 rounded-full font-bold flex items-center gap-1">
          <Images className="w-3.5 h-3.5" />
          विशेष तस्वीरें
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {photoStories.map((story, idx) => (
          <div
            key={idx}
            onClick={() => setActivePhotoIndex(idx)}
            className="group cursor-pointer relative bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-amber-400 transition-all shadow-md"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
              <img
                src={story.imageUrl}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <span className="absolute top-2.5 right-2.5 bg-amber-500 text-black font-extrabold text-[10px] px-2 py-0.5 rounded shadow flex items-center gap-1">
                <Images className="w-3 h-3" />
                {story.count} तस्वीरें
              </span>

              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] text-amber-400 uppercase tracking-wider font-bold block mb-1">
                  {story.category}
                </span>
                <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-amber-300 line-clamp-2 leading-snug font-heading">
                  {story.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Viewer */}
      {activePhotoIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-red-600 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrevPhoto}
            className="absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-amber-500 text-white hover:text-black transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNextPhoto}
            className="absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-amber-500 text-white hover:text-black transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full flex flex-col items-center">
            <div className="relative max-h-[70vh] w-full rounded-xl overflow-hidden shadow-2xl border border-amber-500/30 flex items-center justify-center bg-black">
              <img
                src={photoStories[activePhotoIndex].imageUrl}
                alt={photoStories[activePhotoIndex].title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="mt-4 text-center max-w-2xl">
              <span className="text-xs bg-amber-500 text-black px-2.5 py-0.5 rounded font-bold">
                {activePhotoIndex + 1} / {photoStories.length} फोटो स्टोरी
              </span>
              <h3 className="text-lg font-bold font-heading text-amber-300 mt-2">
                {photoStories[activePhotoIndex].title}
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                {photoStories[activePhotoIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
