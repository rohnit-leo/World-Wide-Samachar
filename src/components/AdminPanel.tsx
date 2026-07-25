import React, { useState } from 'react';
import {
  ShieldCheck, LayoutDashboard, FileText, Plus, Edit3, Trash2,
  Flame, CheckCircle2, Eye, User, Sparkles, Sliders, Save, ArrowLeft
} from 'lucide-react';
import { ALL_NEWS_ARTICLES, BREAKING_NEWS_TICKERS } from '../data/newsData';
import { NewsArticle, CategoryType } from '../types';

interface AdminPanelProps {
  onBackToPortal: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToPortal }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'articles' | 'add' | 'tickers' | 'adsense'>('overview');
  const [articlesList, setArticlesList] = useState<NewsArticle[]>(ALL_NEWS_ARTICLES);
  const [tickerList, setTickerList] = useState<string[]>(BREAKING_NEWS_TICKERS.ticker1);
  const [newTickerText, setNewTickerText] = useState('');

  // Form State for Adding New Article
  const [newArticle, setNewArticle] = useState({
    title: '',
    subtitle: '',
    category: 'राज्य' as CategoryType,
    summary: '',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200',
    location: 'लखनऊ',
    isBreaking: false,
    isTopStory: true,
    authorName: 'विशेष संवाददाता',
    authorRole: 'ब्यूरो चीफ'
  });

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const created: NewsArticle = {
      id: `art-${Date.now()}`,
      title: newArticle.title,
      subtitle: newArticle.subtitle,
      category: newArticle.category,
      summary: newArticle.summary,
      content: newArticle.content,
      imageUrl: newArticle.imageUrl,
      location: newArticle.location,
      publishedAt: new Date().toISOString(),
      readingTimeMinutes: 3,
      views: 120,
      likes: 15,
      commentsCount: 0,
      isBreaking: newArticle.isBreaking,
      isTopStory: newArticle.isTopStory,
      author: {
        id: 'auth-new',
        name: newArticle.authorName,
        role: newArticle.authorRole,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'
      },
      tags: [newArticle.category, newArticle.location, 'वर्ल्ड वाइड न्यूज़']
    };

    setArticlesList([created, ...articlesList]);
    alert('खबर सफलतापूर्वक प्रकाशित हुई!');
    setActiveTab('articles');
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('क्या आप निश्चित रूप से इस खबर को हटाना चाहते हैं?')) {
      setArticlesList(articlesList.filter((a) => a.id !== id));
    }
  };

  const handleAddTicker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTickerText.trim()) return;
    setTickerList([newTickerText, ...tickerList]);
    setNewTickerText('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* CMS Top Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C60000] text-white flex items-center justify-center font-black text-xl shadow">
            WWS
          </div>
          <div>
            <h1 className="text-xl font-bold font-heading text-white flex items-center gap-2">
              <span>वर्ल्ड वाइड समाचार CMS (एडमिन पैनल)</span>
              <span className="text-[10px] bg-amber-500 text-black px-2 py-0.5 rounded font-mono font-bold">
                PRO CMS
              </span>
            </h1>
            <p className="text-xs text-slate-400">एडिटोरियल डैशबोर्ड व कंटेंट मैनेजमेंट सिस्टम</p>
          </div>
        </div>

        <button
          onClick={onBackToPortal}
          className="bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs px-4 py-2 rounded-lg transition-colors border border-slate-700 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>मुख्य पोर्टल पर वापस जाएं</span>
        </button>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-1 space-y-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left p-3 rounded-xl flex items-center gap-2.5 transition-colors ${
              activeTab === 'overview' ? 'bg-[#C60000] text-white font-bold' : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>डैशबोर्ड ओवरव्यू</span>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`w-full text-left p-3 rounded-xl flex items-center gap-2.5 transition-colors ${
              activeTab === 'articles' ? 'bg-[#C60000] text-white font-bold' : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>सभी ख़बरें ({articlesList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`w-full text-left p-3 rounded-xl flex items-center gap-2.5 transition-colors ${
              activeTab === 'add' ? 'bg-[#C60000] text-white font-bold' : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>नई खबर प्रकाशित करें</span>
          </button>

          <button
            onClick={() => setActiveTab('tickers')}
            className={`w-full text-left p-3 rounded-xl flex items-center gap-2.5 transition-colors ${
              activeTab === 'tickers' ? 'bg-[#C60000] text-white font-bold' : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>ब्रेकिंग न्यूज़ टिकर</span>
          </button>

          <button
            onClick={() => setActiveTab('adsense')}
            className={`w-full text-left p-3 rounded-xl flex items-center gap-2.5 transition-colors ${
              activeTab === 'adsense' ? 'bg-[#C60000] text-white font-bold' : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span>गूगल एडसेंस सेटिंग्स</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-4 bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-2xl">
          
          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold font-heading text-white border-b border-slate-800 pb-3">
                संपादकीय ओवरव्यू (Editorial Analytics)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block font-semibold">कुल प्रकाशित ख़बरें</span>
                  <span className="text-3xl font-black text-amber-400 mt-1 block font-mono">{articlesList.length}</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block font-semibold">आज के कुल पाठक (Views)</span>
                  <span className="text-3xl font-black text-emerald-400 mt-1 block font-mono">1,24,850</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block font-semibold">सक्रिय रिपोर्टर्स</span>
                  <span className="text-3xl font-black text-sky-400 mt-1 block font-mono">48</span>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h3 className="font-bold text-sm text-white mb-3">हाल में प्रकाशित ख़बरें</h3>
                <div className="space-y-2 text-xs">
                  {articlesList.slice(0, 5).map((a) => (
                    <div key={a.id} className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-800">
                      <span className="font-semibold text-slate-200 truncate max-w-md">{a.title}</span>
                      <span className="text-slate-400 font-mono text-[11px]">{a.category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. ALL ARTICLES TAB */}
          {activeTab === 'articles' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h2 className="text-xl font-bold font-heading text-white">
                  प्रबंधित ख़बरें ({articlesList.length})
                </h2>
                <button
                  onClick={() => setActiveTab('add')}
                  className="bg-[#C60000] hover:bg-red-700 text-white font-bold text-xs px-3 py-1.5 rounded flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>नई खबर</span>
                </button>
              </div>

              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {articlesList.map((a) => (
                  <div key={a.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img src={a.imageUrl} alt="" className="w-12 h-12 rounded object-cover shrink-0" />
                      <div className="truncate">
                        <h4 className="font-bold text-slate-100 truncate">{a.title}</h4>
                        <span className="text-slate-400 text-[10px]">{a.category} • {a.author.name}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleDeleteArticle(a.id)}
                        className="p-1.5 bg-red-950 text-red-400 hover:bg-red-900 rounded border border-red-800"
                        title="खबर हटाएं"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. ADD ARTICLE FORM */}
          {activeTab === 'add' && (
            <form onSubmit={handleCreateArticle} className="space-y-4 text-xs">
              <h2 className="text-xl font-bold font-heading text-white border-b border-slate-800 pb-3">
                नई खबर का प्रकाशन (Publish News)
              </h2>

              <div>
                <label className="block font-bold text-slate-300 mb-1">खबर का शीर्षक (Title) *</label>
                <input
                  type="text"
                  required
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                  placeholder="मुख्य शीर्षक दर्ज करें"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white outline-none focus:border-[#C60000]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">श्रेणी (Category) *</label>
                  <select
                    value={newArticle.category}
                    onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value as CategoryType })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white outline-none"
                  >
                    <option value="टॉप न्यूज़">टॉप न्यूज़</option>
                    <option value="राष्ट्रीय">राष्ट्रीय</option>
                    <option value="राज्य">राज्य एवं शहर</option>
                    <option value="राजनीति">राजनीति</option>
                    <option value="अपराध">अपराध</option>
                    <option value="खेल">खेल</option>
                    <option value="मनोरंजन">मनोरंजन</option>
                    <option value="टेक्नोलॉजी">टेक्नोलॉजी</option>
                    <option value="कृषि एवं किसान">कृषि एवं किसान</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">स्थान / ज़िला *</label>
                  <input
                    type="text"
                    value={newArticle.location}
                    onChange={(e) => setNewArticle({ ...newArticle, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">संक्षिप्त सारांश (Summary) *</label>
                <textarea
                  rows={2}
                  required
                  value={newArticle.summary}
                  onChange={(e) => setNewArticle({ ...newArticle, summary: e.target.value })}
                  placeholder="2-3 पंक्तियों में सारांश लिखे..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">विस्तृत खबर कंटेंट *</label>
                <textarea
                  rows={6}
                  required
                  value={newArticle.content}
                  onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                  placeholder="पूरा समाचार दर्ज करें..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white outline-none"
                />
              </div>

              <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-lg border border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-amber-300">
                  <input
                    type="checkbox"
                    checked={newArticle.isBreaking}
                    onChange={(e) => setNewArticle({ ...newArticle, isBreaking: e.target.checked })}
                  />
                  <span>ब्रेकिंग न्यूज़ बनाएं</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-emerald-300">
                  <input
                    type="checkbox"
                    checked={newArticle.isTopStory}
                    onChange={(e) => setNewArticle({ ...newArticle, isTopStory: e.target.checked })}
                  />
                  <span>टॉप स्टोरी कैरोसेल में दिखाएं</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#C60000] hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>खबर तुरंत प्रकाशित करें</span>
              </button>
            </form>
          )}

          {/* 4. TICKERS MANAGER */}
          {activeTab === 'tickers' && (
            <div className="space-y-4 text-xs">
              <h2 className="text-xl font-bold font-heading text-white border-b border-slate-800 pb-3">
                ब्रेकिंग न्यूज़ टिकर प्रबंधक
              </h2>

              <form onSubmit={handleAddTicker} className="flex gap-2">
                <input
                  type="text"
                  value={newTickerText}
                  onChange={(e) => setNewTickerText(e.target.value)}
                  placeholder="नया ब्रेकिंग टिकर संदेश लिखें..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white outline-none"
                />
                <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-4 rounded-lg">
                  जोड़ें
                </button>
              </form>

              <div className="space-y-2">
                {tickerList.map((t, idx) => (
                  <div key={idx} className="bg-slate-950 p-2.5 rounded border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-200">★ {t}</span>
                    <button
                      onClick={() => setTickerList(tickerList.filter((_, i) => i !== idx))}
                      className="text-red-400 hover:text-red-300"
                    >
                      हटायें
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. ADSENSE SETTINGS */}
          {activeTab === 'adsense' && (
            <div className="space-y-4 text-xs">
              <h2 className="text-xl font-bold font-heading text-white border-b border-slate-800 pb-3">
                Google AdSense विज्ञापन सेटिंग्स
              </h2>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">AdSense Publisher ID (ca-pub-xxx)</label>
                  <input
                    type="text"
                    defaultValue="ca-pub-9876543210123456"
                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-amber-300 font-mono"
                  />
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-emerald-400 font-bold">
                  <span>Google AdSense Status: Active & Serving</span>
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
