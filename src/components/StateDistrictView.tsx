import React, { useState } from 'react';
import { StateInfo, NewsArticle } from '../types';
import { ArticleCard } from './ArticleCard';
import { MapPin, ChevronRight, Building2, Search, ArrowLeft, Layers, Filter } from 'lucide-react';

interface StateDistrictViewProps {
  states: StateInfo[];
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onBackToHome?: () => void;
}

export const StateDistrictView: React.FC<StateDistrictViewProps> = ({
  states,
  articles,
  onSelectArticle,
  onBackToHome
}) => {
  const [selectedState, setSelectedState] = useState<StateInfo | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter states by search
  const filteredStates = states.filter(s =>
    s.nameHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.districts.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Filter districts inside selected state
  const filteredDistricts = selectedState
    ? selectedState.districts.filter(d =>
        d.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Articles for selected state & district
  const districtArticles = articles.filter(a => {
    if (!selectedState) return false;
    
    // Match State Name
    const matchState =
      a.state?.toLowerCase().includes(selectedState.nameHi.toLowerCase()) ||
      a.location?.toLowerCase().includes(selectedState.nameHi.toLowerCase()) ||
      a.title.toLowerCase().includes(selectedState.nameHi.toLowerCase());

    if (!matchState) return false;

    // If district is selected, filter strictly by district
    if (selectedDistrict) {
      const matchDistrict =
        a.district?.toLowerCase().includes(selectedDistrict.toLowerCase()) ||
        a.location?.toLowerCase().includes(selectedDistrict.toLowerCase()) ||
        a.title.toLowerCase().includes(selectedDistrict.toLowerCase()) ||
        a.summary.toLowerCase().includes(selectedDistrict.toLowerCase());

      return matchDistrict;
    }

    return true;
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm my-6 font-sans">
      
      {/* Top Header & Breadcrumb Bar */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-1">
              {onBackToHome && (
                <button
                  onClick={onBackToHome}
                  className="hover:text-[#C60000] flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>मुख्य पृष्ठ</span>
                </button>
              )}
              <span>/</span>
              <button
                onClick={() => {
                  setSelectedState(null);
                  setSelectedDistrict(null);
                }}
                className={`hover:text-[#C60000] transition-colors ${!selectedState ? 'text-[#C60000] font-extrabold' : ''}`}
              >
                सभी राज्य (States)
              </button>

              {selectedState && (
                <>
                  <span>/</span>
                  <button
                    onClick={() => setSelectedDistrict(null)}
                    className={`hover:text-[#C60000] transition-colors ${selectedState && !selectedDistrict ? 'text-[#C60000] font-extrabold' : ''}`}
                  >
                    {selectedState.nameHi}
                  </button>
                </>
              )}

              {selectedDistrict && (
                <>
                  <span>/</span>
                  <span className="text-[#C60000] font-extrabold">{selectedDistrict} जिला</span>
                </>
              )}
            </div>

            <h2 className="text-2xl font-bold font-heading text-gray-900 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-[#C60000]" />
              <span>
                {!selectedState
                  ? 'राज्य एवं जिला समाचार बुलेटिन (State & District News)'
                  : !selectedDistrict
                  ? `${selectedState.nameHi} के सभी जिले`
                  : `${selectedState.nameHi} • ${selectedDistrict} जिले की खबरें`}
              </span>
            </h2>
          </div>

          {/* Search Input for States/Districts */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                !selectedState
                  ? 'राज्य या जिला खोजें...'
                  : 'जिला खोजें...'
              }
              className="w-full bg-gray-50 border border-gray-300 rounded-full py-1.5 px-4 pr-9 text-xs outline-none focus:border-[#C60000]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2" />
          </div>
        </div>
      </div>

      {/* LEVEL 1: ALL STATES GRID */}
      {!selectedState && (
        <div className="space-y-4">
          <p className="text-xs text-gray-600 font-medium">
            कृपया अपने राज्य का चयन करें। राज्य चुनने के बाद उस राज्य के सभी जिलों की खबरें देखें:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredStates.map((state) => (
              <button
                key={state.id}
                onClick={() => {
                  setSelectedState(state);
                  setSelectedDistrict(null);
                  setSearchQuery('');
                }}
                className="p-3 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-[#C60000] rounded-xl text-left transition-all group shadow-2xs cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-gray-900 group-hover:text-[#C60000] font-heading">
                    {state.nameHi}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#C60000] transition-transform group-hover:translate-x-1" />
                </div>
                <div className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-amber-500" />
                  <span>{state.districts.length} जिले शामिल</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* LEVEL 2: DISTRICTS GRID OF SELECTED STATE */}
      {selectedState && !selectedDistrict && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-red-50/60 p-3 rounded-xl border border-red-100">
            <div>
              <span className="text-xs font-bold text-[#C60000]">
                {selectedState.nameHi} ({selectedState.nameEn}) के सभी जिले
              </span>
              <p className="text-[11px] text-gray-600">
                जिला चुनने के बाद केवल उसी जिले से संबंधित खबरें दिखाई जाएंगी
              </p>
            </div>
            <button
              onClick={() => setSelectedState(null)}
              className="text-xs bg-white text-gray-700 hover:text-[#C60000] border border-gray-300 px-3 py-1.5 rounded-lg font-bold transition-colors"
            >
              ← राज्य बदलें
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {filteredDistricts.map((dist) => (
              <button
                key={dist}
                onClick={() => {
                  setSelectedDistrict(dist);
                  setSearchQuery('');
                }}
                className="p-2.5 bg-gray-50 hover:bg-[#C60000] hover:text-white border border-gray-200 rounded-lg text-xs font-bold text-center transition-all cursor-pointer shadow-2xs"
              >
                📍 {dist}
              </button>
            ))}
          </div>

          {/* Show All News for State if No District Selected */}
          <div className="pt-6 border-t border-gray-200 space-y-4">
            <h3 className="text-lg font-bold font-heading text-gray-900 border-l-4 border-[#C60000] pl-3">
              {selectedState.nameHi} की संपूर्ण ताज़ा खबरें ({districtArticles.length})
            </h3>

            {districtArticles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {districtArticles.map((art) => (
                  <ArticleCard
                    key={art.id}
                    article={art}
                    onSelect={onSelectArticle}
                    variant="grid"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-xl text-gray-500 text-xs">
                {selectedState.nameHi} की कोई खबर उपलब्ध नहीं है। आप भी अपनी खबर सबमिट कर सकते हैं!
              </div>
            )}
          </div>
        </div>
      )}

      {/* LEVEL 3: DISTRICT SPECIFIC NEWS LIST */}
      {selectedState && selectedDistrict && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-emerald-50 p-3 rounded-xl border border-emerald-200">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <div>
                <span className="text-xs font-bold text-emerald-900">
                  {selectedState.nameHi} • {selectedDistrict} जिले की रिपोर्टिंग
                </span>
                <p className="text-[11px] text-emerald-700">
                  केवल {selectedDistrict} क्षेत्र की सीधी और सटीक खबरें
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedDistrict(null)}
              className="text-xs bg-white text-gray-700 hover:text-[#C60000] border border-gray-300 px-3 py-1.5 rounded-lg font-bold transition-colors"
            >
              ← दूसरे जिले चुनें
            </button>
          </div>

          {districtArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {districtArticles.map((art) => (
                <ArticleCard
                  key={art.id}
                  article={art}
                  onSelect={onSelectArticle}
                  variant="grid"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-300 space-y-3">
              <Building2 className="w-10 h-10 text-gray-400 mx-auto" />
              <div className="text-sm font-bold text-gray-700">
                {selectedDistrict} जिले की अभी कोई ताज़ा खबर उपलब्ध नहीं है
              </div>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                क्या आप {selectedDistrict} क्षेत्र से हैं? आप अपनी स्थानीय खबर वर्ल्ड वाइड समाचार पोर्टल पर सीधे सबमिट कर सकते हैं।
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
