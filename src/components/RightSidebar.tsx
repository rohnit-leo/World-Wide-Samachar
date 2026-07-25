import React, { useState } from 'react';
import { Flame, Eye, CloudSun, Send, CheckCircle2, Tag, Vote, Radio } from 'lucide-react';
import { ALL_NEWS_ARTICLES, WEATHER_FORECAST, DAILY_POLL } from '../data/newsData';
import { NewsArticle } from '../types';
import { AdSenseBanner } from './AdSenseBanner';

interface RightSidebarProps {
  onSelectArticle: (article: NewsArticle) => void;
  onTagSelect?: (tag: string) => void;
  articles?: NewsArticle[];
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ onSelectArticle, onTagSelect, articles = ALL_NEWS_ARTICLES }) => {
  const [selectedCity, setSelectedCity] = useState('लखनऊ');
  const [pollState, setPollState] = useState(DAILY_POLL);
  const [votedOption, setVotedOption] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const trendingNews = articles.filter((a) => a.isTrending || a.views > 30000).slice(0, 5);
  const mostReadNews = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

  const handleVote = (optionId: number) => {
    if (votedOption !== null) return;
    setVotedOption(optionId);
    setPollState((prev) => ({
      ...prev,
      totalVotes: prev.totalVotes + 1,
      options: prev.options.map((opt) =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      )
    }));
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
  };

  const currentWeather = WEATHER_FORECAST.find((w) => w.city === selectedCity) || WEATHER_FORECAST[0];

  const popularTags = [
    'उत्तर प्रदेश', 'बजट 2026', 'क्रिकेट', 'नौकरी', 'मौसम', 'यूपी पुलिस',
    'अयोध्या', 'स्मार्टफोन', 'शेयर बाजार', 'चुनाव', 'एम्स', 'सोना चांदी'
  ];

  return (
    <aside className="w-full space-y-6">
      {/* Live Updates Feed */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-3">
          <div className="flex items-center gap-2 font-bold text-gray-900 text-base font-heading">
            <Radio className="w-5 h-5 text-red-600 animate-pulse" />
            <span>लाइव अपडेट्स</span>
          </div>
          <span className="bg-red-100 text-[#C60000] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
            LIVE
          </span>
        </div>

        <div className="space-y-3 relative before:absolute before:top-2 before:bottom-2 before:left-2 before:w-0.5 before:bg-red-100">
          <div className="pl-5 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#C60000] ring-4 ring-red-100"></span>
            <span className="text-[10px] font-semibold text-[#C60000]">10:30 AM</span>
            <p className="text-xs font-semibold text-gray-800 hover:text-[#C60000] cursor-pointer" onClick={() => onSelectArticle(ALL_NEWS_ARTICLES[0])}>
              नोएडा में 22 हजार करोड़ के सेमीकंडक्टर प्लांट का उद्घाटन हुआ।
            </p>
          </div>
          <div className="pl-5 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-gray-400"></span>
            <span className="text-[10px] font-semibold text-gray-500">09:15 AM</span>
            <p className="text-xs font-semibold text-gray-800 hover:text-[#C60000] cursor-pointer" onClick={() => onSelectArticle(ALL_NEWS_ARTICLES[1])}>
              मौसम विभाग: यूपी और बिहार के 12 जिलों में मूसलाधार बारिश का अलर्ट।
            </p>
          </div>
          <div className="pl-5 relative">
            <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-gray-400"></span>
            <span className="text-[10px] font-semibold text-gray-500">08:00 AM</span>
            <p className="text-xs font-semibold text-gray-800 hover:text-[#C60000] cursor-pointer" onClick={() => onSelectArticle(ALL_NEWS_ARTICLES[2])}>
              इसरो: गगनयान-2 का क्रू एस्केप सिस्टम परीक्षण पूरी तरह सफल।
            </p>
          </div>
        </div>
      </div>

      {/* AdSpace Top Sidebar */}
      <AdSenseBanner type="rectangle" />

      {/* Trending News */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center gap-2 border-b-2 border-[#C60000] pb-2 mb-3">
          <Flame className="w-5 h-5 text-[#C60000]" />
          <h3 className="font-bold text-gray-900 text-lg font-heading">ट्रेंडिंग ख़बरें</h3>
        </div>

        <div className="space-y-3">
          {trendingNews.map((article, index) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="flex items-start gap-3 group cursor-pointer border-b border-gray-100 last:border-0 pb-2.5 last:pb-0"
            >
              <span className="w-6 h-6 rounded bg-red-50 text-[#C60000] font-extrabold text-xs flex items-center justify-center shrink-0">
                0{index + 1}
              </span>
              <div className="flex-1">
                <span className="text-[10px] text-[#C60000] font-bold">{article.category}</span>
                <h4 className="text-xs font-bold text-gray-800 group-hover:text-[#C60000] line-clamp-2 leading-snug font-heading">
                  {article.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Widget */}
      <div className="bg-gradient-to-br from-blue-600 via-sky-600 to-indigo-700 text-white rounded-xl p-4 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CloudSun className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-base font-heading">मौसम समाचार</h3>
          </div>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-white/20 text-white text-xs px-2 py-1 rounded border border-white/30 backdrop-blur-sm outline-none cursor-pointer"
          >
            {WEATHER_FORECAST.map((w) => (
              <option key={w.city} value={w.city} className="text-gray-900">
                {w.city}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20">
          <div>
            <div className="text-3xl font-extrabold font-mono">{currentWeather.temp}°C</div>
            <div className="text-xs text-sky-100 mt-0.5">{currentWeather.condition}</div>
          </div>
          <div className="text-right text-xs space-y-1">
            <div>अधिकतम: <span className="font-semibold">{currentWeather.high}°C</span></div>
            <div>न्यूनतम: <span className="font-semibold">{currentWeather.low}°C</span></div>
            <div>नमी: <span className="font-semibold">{currentWeather.humidity}%</span></div>
          </div>
        </div>
      </div>

      {/* Most Read News */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center gap-2 border-b-2 border-slate-800 pb-2 mb-3">
          <Eye className="w-5 h-5 text-slate-800" />
          <h3 className="font-bold text-gray-900 text-lg font-heading">सबसे ज्यादा पढ़ी गई</h3>
        </div>

        <div className="space-y-3">
          {mostReadNews.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group cursor-pointer border-b border-gray-100 last:border-0 pb-2 last:pb-0"
            >
              <h4 className="text-xs font-bold text-gray-800 group-hover:text-[#C60000] line-clamp-2 leading-snug font-heading">
                {article.title}
              </h4>
              <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-1">
                <span>{article.category}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5">
                  <Eye className="w-3 h-3" />
                  {article.views.toLocaleString('hi-IN')} पाठक
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Poll of the Day */}
      <div className="bg-amber-50/80 rounded-xl border border-amber-200 p-4 shadow-sm">
        <div className="flex items-center gap-2 border-b border-amber-200 pb-2 mb-3">
          <Vote className="w-5 h-5 text-amber-700" />
          <h3 className="font-bold text-amber-950 text-base font-heading">आज का ओपिनियन पोल</h3>
        </div>

        <p className="text-xs font-semibold text-gray-800 mb-3 leading-relaxed">
          {pollState.question}
        </p>

        <div className="space-y-2 mb-3">
          {pollState.options.map((option) => {
            const percentage = Math.round((option.votes / pollState.totalVotes) * 100);
            return (
              <button
                key={option.id}
                onClick={() => handleVote(option.id)}
                disabled={votedOption !== null}
                className={`w-full text-left p-2 rounded text-xs transition-all relative overflow-hidden border ${
                  votedOption === option.id
                    ? 'border-[#C60000] bg-red-50 font-bold'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                {votedOption !== null && (
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-red-100/60 z-0 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                )}
                <div className="relative z-10 flex items-center justify-between">
                  <span>{option.text}</span>
                  {votedOption !== null && (
                    <span className="font-mono text-[11px] text-[#C60000] font-bold">
                      {percentage}%
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-[11px] text-gray-500 text-right">
          कुल मत: <span className="font-bold text-gray-700">{pollState.totalVotes.toLocaleString('hi-IN')}</span>
        </div>
      </div>

      {/* AdSpace Middle Sidebar */}
      <AdSenseBanner type="sidebar" />

      {/* Newsletter Subscription */}
      <div className="bg-[#222222] text-white rounded-xl p-4 shadow-md">
        <h3 className="font-bold text-lg font-heading text-yellow-400 mb-1">
          न्यूज़लेटर सब्सक्राइब करें
        </h3>
        <p className="text-xs text-gray-300 mb-3 leading-relaxed">
          प्रतिदिन की मुख्य और ताज़ा ख़बरें सीधे अपने ईमेल पर प्राप्त करें।
        </p>

        {subscribed ? (
          <div className="bg-emerald-900/60 text-emerald-200 p-3 rounded-lg text-xs flex items-center gap-2 border border-emerald-700">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
            <span>धन्यवाद! आप वर्ल्ड वाइड समाचार न्यूज़लेटर से जुड़ चुके हैं।</span>
          </div>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className="space-y-2">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="आपका ईमेल पता..."
              required
              className="w-full bg-gray-800 border border-gray-700 text-white text-xs rounded px-3 py-2 outline-none focus:border-[#C60000]"
            />
            <button
              type="submit"
              className="w-full bg-[#C60000] hover:bg-red-700 text-white text-xs font-bold py-2 rounded transition-colors flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              सदस्यता लें (Subscribe)
            </button>
          </form>
        )}
      </div>

      {/* Popular Tags */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-2 mb-3">
          <Tag className="w-4 h-4 text-[#C60000]" />
          <h3 className="font-bold text-gray-900 text-base font-heading">लोकप्रिय टैग्स</h3>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagSelect && onTagSelect(tag)}
              className="text-xs bg-gray-100 hover:bg-red-50 hover:text-[#C60000] text-gray-700 px-2.5 py-1 rounded-full transition-colors border border-gray-200/80"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
