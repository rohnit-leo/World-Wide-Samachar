import React, { useState, useEffect } from 'react';
import { NewsArticle } from '../types';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface HeroCarouselProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ articles, onSelectArticle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fetchedArticles, setFetchedArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveNews = async () => {
      setLoading(true);
      try {
        // Fetch Hindi News RSS using a free RSS-to-JSON service
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://feeds.feedburner.com/ndtvkhabar-latest');
        const data = await response.json();
        
        if (data.status === 'ok' && data.items) {
          const liveNews: NewsArticle[] = data.items.slice(0, 5).map((item: any) => ({
            id: item.guid || item.link,
            title: item.title,
            summary: item.description,
            content: item.content || item.description,
            imageUrl: item.enclosure?.link || item.thumbnail || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&q=80',
            category: 'ताज़ा ख़बरें',
            publishedAt: item.pubDate,
            author: item.author || 'NDTV',
            location: 'National',
            source: 'Live RSS Feed',
            isTopStory: true
          }));
          setFetchedArticles(liveNews);
        } else {
          setFetchedArticles(articles.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to fetch live news:", error);
        setFetchedArticles(articles.slice(0, 5));
      } finally {
        setLoading(false);
      }
    };

    fetchLiveNews();
  }, [articles]);

  const displayArticles = fetchedArticles.length > 0 ? fetchedArticles : articles.slice(0, 5);

  useEffect(() => {
    if (displayArticles.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayArticles.length);
    }, 5000); // 5 seconds per slide
    return () => clearInterval(timer);
  }, [displayArticles.length]);

  if (loading) {
    return (
      <div className="w-full h-[400px] sm:h-[500px] mb-8 rounded-2xl bg-gray-100 animate-pulse flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#C60000] animate-spin" />
      </div>
    );
  }

  if (displayArticles.length === 0) return null;

  const currentArticle = displayArticles[currentIndex];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % displayArticles.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + displayArticles.length) % displayArticles.length);

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] mb-8 overflow-hidden rounded-2xl group">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out cursor-pointer group-hover:scale-105"
        style={{ backgroundImage: `url(${currentArticle.imageUrl})` }}
        onClick={() => onSelectArticle(currentArticle)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 pointer-events-none">
        <span className="inline-block bg-[#C60000] text-white px-3 py-1 rounded-md text-xs font-bold mb-3 shadow-lg">
          {currentArticle.category}
        </span>
        <h2 className="text-white text-2xl sm:text-4xl font-extrabold font-heading leading-tight mb-2 drop-shadow-lg line-clamp-3">
          {currentArticle.title}
        </h2>
        <div className="flex items-center gap-4 text-gray-300 text-xs sm:text-sm font-semibold">
          <span>{currentArticle.source || 'World Wide Samachar'}</span>
          <span>•</span>
          <span>{new Date(currentArticle.publishedAt).toLocaleString('hi-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}</span>
        </div>
      </div>

      {/* Controls */}
      <button 
        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-[#C60000] text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-[#C60000] text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 right-6 flex gap-2 z-10">
        {displayArticles.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${idx === currentIndex ? 'bg-[#C60000] w-8' : 'bg-white/50 hover:bg-white'}`}
          />
        ))}
      </div>
    </div>
  );
};
