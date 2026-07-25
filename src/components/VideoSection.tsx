import React, { useState } from 'react';
import { Video, Play, X, Eye, Clock } from 'lucide-react';
import { ALL_NEWS_ARTICLES } from '../data/newsData';
import { NewsArticle } from '../types';

interface VideoSectionProps {
  onSelectArticle: (article: NewsArticle) => void;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ onSelectArticle }) => {
  const [activeVideo, setActiveVideo] = useState<NewsArticle | null>(null);

  const videoArticles = ALL_NEWS_ARTICLES.slice(0, 4);

  return (
    <section className="my-8 bg-[#18181b] text-white rounded-2xl p-4 sm:p-6 shadow-lg border border-zinc-800">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white">
            <Video className="w-4 h-4" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
            वीडियो बुलेटिन (Latest News Videos)
          </h2>
        </div>
        <span className="text-xs bg-red-950 text-red-400 border border-red-800 px-3 py-1 rounded-full font-bold">
          HD वीडियो न्यूज़
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {videoArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => setActiveVideo(article)}
            className="group cursor-pointer bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-red-600 transition-all shadow-md flex flex-col"
          >
            <div className="relative aspect-video w-full bg-black overflow-hidden">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 opacity-80 transition-transform duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#C60000] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/80 text-[11px] text-white px-2 py-0.5 rounded font-mono">
                {article.readingTimeMinutes}:30
              </span>
            </div>

            <div className="p-3 flex-1 flex flex-col justify-between">
              <h3 className="font-bold text-xs sm:text-sm text-zinc-100 group-hover:text-red-400 line-clamp-2 leading-snug font-heading mb-2">
                {article.title}
              </h3>

              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-zinc-800">
                <span className="truncate max-w-[120px]">{article.location}</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {article.views}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Player Simulation */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/70 text-white hover:bg-red-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              <img
                src={activeVideo.imageUrl}
                alt={activeVideo.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
              
              <div className="absolute flex flex-col items-center justify-center text-center p-4">
                <div className="w-16 h-16 rounded-full bg-[#C60000] text-white flex items-center justify-center shadow-2xl animate-pulse cursor-pointer">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
                <span className="mt-3 text-xs bg-red-950 text-red-300 px-3 py-1 rounded-full border border-red-800">
                  लाइव वीडियो स्ट्रीम चालू है
                </span>
              </div>
            </div>

            <div className="p-5 text-white">
              <div className="flex items-center gap-2 text-xs text-red-400 mb-1 font-bold">
                <span>{activeVideo.category}</span>
                <span>•</span>
                <span>{activeVideo.location}</span>
              </div>
              <h3 className="text-lg font-bold font-heading text-zinc-100 mb-2">
                {activeVideo.title}
              </h3>
              <p className="text-xs text-zinc-400 line-clamp-2">
                {activeVideo.summary}
              </p>
              
              <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-between items-center text-xs">
                <span className="text-zinc-500">रिपोर्टर: {activeVideo.author.name}</span>
                <button
                  onClick={() => {
                    const vid = activeVideo;
                    setActiveVideo(null);
                    onSelectArticle(vid);
                  }}
                  className="bg-[#C60000] hover:bg-red-700 text-white px-4 py-1.5 rounded font-bold transition-colors"
                >
                  पूरा लेख पढ़ें →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
