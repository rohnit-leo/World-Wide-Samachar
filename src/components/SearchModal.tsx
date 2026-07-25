import React, { useState } from 'react';
import { Search, X, Filter, Tag, Calendar } from 'lucide-react';
import { ALL_NEWS_ARTICLES } from '../data/newsData';
import { NewsArticle, CategoryType } from '../types';
import { ArticleCard } from './ArticleCard';

interface SearchModalProps {
  onClose: () => void;
  onSelectArticle: (article: NewsArticle) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onClose, onSelectArticle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filtered = ALL_NEWS_ARTICLES.filter((article) => {
    const matchTerm =
      searchTerm === '' ||
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchCat = selectedCategory === 'all' || article.category === selectedCategory;

    return matchTerm && matchCat;
  });

  const categories = ['all', 'टॉप न्यूज़', 'राष्ट्रीय', 'राज्य', 'राजनीति', 'अपराध', 'खेल', 'मनोरंजन', 'व्यापार एवं अर्थव्यवस्था'];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 text-gray-900 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full my-6 p-4 sm:p-6 shadow-2xl border border-gray-200 relative animate-in fade-in slide-in-from-top-4">
        
        {/* Header Search Bar */}
        <div className="flex items-center gap-3 border-b-2 border-[#C60000] pb-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-50 text-[#C60000] flex items-center justify-center shrink-0">
            <Search className="w-5 h-5" />
          </div>

          <div className="flex-1 relative">
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="खोजें... (उदा: यूपी चुनाव, बजट, क्रिकेट, मानसून)"
              className="w-full bg-gray-100 text-gray-900 font-medium text-base sm:text-lg rounded-xl pl-4 pr-10 py-2.5 outline-none focus:bg-white focus:ring-2 focus:ring-[#C60000]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-thin border-b border-gray-100">
          <Filter className="w-4 h-4 text-[#C60000] shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#C60000] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? 'सभी श्रेणियां' : cat}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="text-xs text-gray-500 font-semibold mb-4">
          कुल मिले परिणाम: <span className="font-bold text-[#C60000] text-sm">{filtered.length}</span> ख़बरें
        </div>

        {/* Search Results Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-1">
            {filtered.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onSelect={(a) => {
                  onSelectArticle(a);
                  onClose();
                }}
                variant="grid"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <h3 className="text-base font-bold text-gray-700 font-heading">कोई परिणाम नहीं मिला</h3>
            <p className="text-xs text-gray-500 mt-1">कृपया अन्य शब्दों या श्रेणी के साथ पुनः प्रयास करें।</p>
          </div>
        )}
      </div>
    </div>
  );
};
