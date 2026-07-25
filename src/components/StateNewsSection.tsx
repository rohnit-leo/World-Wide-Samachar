import React, { useState } from 'react';
import { MapPin, ChevronRight, Building2 } from 'lucide-react';
import { STATES_DATA } from '../data/statesData';
import { ALL_NEWS_ARTICLES } from '../data/newsData';
import { ArticleCard } from './ArticleCard';
import { NewsArticle } from '../types';

interface StateNewsSectionProps {
  onSelectArticle: (article: NewsArticle) => void;
}

export const StateNewsSection: React.FC<StateNewsSectionProps> = ({ onSelectArticle }) => {
  const [selectedStateId, setSelectedStateId] = useState('up');
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const currentState = STATES_DATA.find((s) => s.id === selectedStateId) || STATES_DATA[0];

  // Filter news by state and optional district
  const filteredArticles = ALL_NEWS_ARTICLES.filter((article) => {
    if (article.state) {
      const matchState = article.state.toLowerCase().includes(currentState.nameHi.toLowerCase());
      if (!matchState) return false;
      if (selectedDistrict) {
        return article.district?.toLowerCase().includes(selectedDistrict.toLowerCase());
      }
      return true;
    }
    return false;
  });

  // Fallback to general state news if filtered list is small
  const displayArticles = filteredArticles.length > 0 ? filteredArticles : ALL_NEWS_ARTICLES.slice(0, 4);

  return (
    <section className="my-8 bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-[#C60000] pb-3 mb-4 gap-3">
        <div className="flex items-center gap-2">
          <Building2 className="w-6 h-6 text-[#C60000]" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-heading">
            राज्य एवं शहर समाचार (State & Local News)
          </h2>
        </div>
        
        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
          22 राज्य • सभी प्रमुख ज़िले
        </span>
      </div>

      {/* States Tabs horizontal list */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-thin border-b border-gray-100">
        {STATES_DATA.map((st) => (
          <button
            key={st.id}
            onClick={() => {
              setSelectedStateId(st.id);
              setSelectedDistrict(null);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedStateId === st.id
                ? 'bg-[#C60000] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {st.nameHi}
          </button>
        ))}
      </div>

      {/* Districts pills for selected state */}
      <div className="bg-red-50/50 p-3 rounded-xl border border-red-100/80 mb-5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#C60000] mb-2">
          <MapPin className="w-3.5 h-3.5" />
          <span>{currentState.nameHi} के प्रमुख जिले:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedDistrict(null)}
            className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
              selectedDistrict === null
                ? 'bg-[#C60000] text-white font-bold'
                : 'bg-white text-gray-700 hover:bg-red-100 border border-gray-200'
            }`}
          >
            सभी जिले
          </button>
          {currentState.districts.map((dist) => (
            <button
              key={dist}
              onClick={() => setSelectedDistrict(dist)}
              className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                selectedDistrict === dist
                  ? 'bg-[#C60000] text-white font-bold'
                  : 'bg-white text-gray-700 hover:bg-red-100 border border-gray-200'
              }`}
            >
              {dist}
            </button>
          ))}
        </div>
      </div>

      {/* State News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayArticles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onSelect={onSelectArticle}
            variant="grid"
          />
        ))}
      </div>
    </section>
  );
};
