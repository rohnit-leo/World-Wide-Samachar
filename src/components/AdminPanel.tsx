import React, { useState, useEffect } from 'react';
import {
  ShieldCheck, LayoutDashboard, FileText, Plus, Edit3, Trash2,
  Flame, CheckCircle2, Eye, User, Sliders, Save, ArrowLeft,
  Send, Inbox, Check, X, Search, Filter, AlertCircle, RefreshCw,
  Image as ImageIcon, MapPin, Building2, PlusCircle
} from 'lucide-react';
import { ALL_NEWS_ARTICLES, BREAKING_NEWS_TICKERS } from '../data/newsData';
import { STATES_DATA } from '../data/statesData';
import { NewsArticle, CategoryType, SubmittedNews, StateInfo } from '../types';

interface AdminPanelProps {
  onBackToPortal: () => void;
  articlesList?: NewsArticle[];
  onAddArticle?: (article: NewsArticle) => void;
  onUpdateArticle?: (article: NewsArticle) => void;
  onDeleteArticle?: (id: string) => void;
  submittedList?: SubmittedNews[];
  onApproveSubmission?: (submission: SubmittedNews) => void;
  onRejectSubmission?: (id: string) => void;
  tickerList?: string[];
  onAddTicker?: (text: string) => void;
  onDeleteTicker?: (index: number) => void;
  onResetDefaults?: () => void;
  statesList?: StateInfo[];
  onUpdateStatesList?: (states: StateInfo[]) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onBackToPortal,
  articlesList = ALL_NEWS_ARTICLES,
  onAddArticle,
  onUpdateArticle,
  onDeleteArticle,
  submittedList = [],
  onApproveSubmission,
  onRejectSubmission,
  tickerList = BREAKING_NEWS_TICKERS.ticker1,
  onAddTicker,
  onDeleteTicker,
  onResetDefaults,
  statesList = STATES_DATA,
  onUpdateStatesList
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'articles' | 'add_edit' | 'submitted' | 'tickers' | 'states' | 'adsense'>('overview');
  const [newTickerText, setNewTickerText] = useState('');
  
  // Search & Filter State in Article List
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Image Upload Preview in Admin Form
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // States Manager Form State
  const [newStateHi, setNewStateHi] = useState('');
  const [newStateEn, setNewStateEn] = useState('');
  const [selectedStateForDistrict, setSelectedStateForDistrict] = useState<string>('');
  const [newDistrictName, setNewDistrictName] = useState('');

  // Article Edit State
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [articleForm, setArticleForm] = useState({
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

  // Preview Article Modal State
  const [previewArticle, setPreviewArticle] = useState<NewsArticle | null>(null);

  const resetForm = () => {
    setEditingArticleId(null);
    setImagePreview(null);
    setArticleForm({
      title: '',
      subtitle: '',
      category: 'राज्य',
      summary: '',
      content: '',
      imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200',
      location: 'लखनऊ',
      isBreaking: false,
      isTopStory: true,
      authorName: 'विशेष संवाददाता',
      authorRole: 'ब्यूरो चीफ'
    });
  };

  const handleAdminImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('चित्र का आकार 10MB से अधिक नहीं होना चाहिए।');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setArticleForm(prev => ({ ...prev, imageUrl: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartEdit = (art: NewsArticle) => {
    setEditingArticleId(art.id);
    setImagePreview(art.imageUrl);
    setArticleForm({
      title: art.title,
      subtitle: art.subtitle || '',
      category: art.category,
      summary: art.summary,
      content: art.content,
      imageUrl: art.imageUrl,
      location: art.location,
      isBreaking: !!art.isBreaking,
      isTopStory: !!art.isTopStory,
      authorName: art.author.name,
      authorRole: art.author.role
    });
    setActiveTab('add_edit');
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingArticleId) {
      // UPDATE EXISTING ARTICLE
      const target = articlesList.find(a => a.id === editingArticleId);
      const updated: NewsArticle = {
        ...target!,
        title: articleForm.title,
        subtitle: articleForm.subtitle,
        category: articleForm.category,
        summary: articleForm.summary,
        content: articleForm.content,
        imageUrl: articleForm.imageUrl,
        location: articleForm.location,
        isBreaking: articleForm.isBreaking,
        isTopStory: articleForm.isTopStory,
        author: {
          ...target!.author,
          name: articleForm.authorName,
          role: articleForm.authorRole
        }
      };
      if (onUpdateArticle) {
        onUpdateArticle(updated);
      }
      alert('खबर का विवरण सफलतापूर्वक लाइव अपडेट कर दिया गया!');
    } else {
      // CREATE NEW ARTICLE
      const created: NewsArticle = {
        id: `art-${Date.now()}`,
        title: articleForm.title,
        subtitle: articleForm.subtitle,
        category: articleForm.category,
        summary: articleForm.summary,
        content: articleForm.content,
        imageUrl: articleForm.imageUrl,
        location: articleForm.location,
        publishedAt: new Date().toISOString(),
        readingTimeMinutes: 3,
        views: 10,
        likes: 0,
        commentsCount: 0,
        isBreaking: articleForm.isBreaking,
        isTopStory: articleForm.isTopStory,
        author: {
          id: `auth-${Date.now()}`,
          name: articleForm.authorName,
          role: articleForm.authorRole,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'
        },
        tags: [articleForm.category, articleForm.location, 'वर्ल्ड वाइड न्यूज़']
      };
      if (onAddArticle) {
        onAddArticle(created);
      }
      alert('नई खबर सफलतापूर्वक प्रकाशित हुई और लाइव पोर्टल पर जोड़ दी गई!');
    }

    resetForm();
    setActiveTab('articles');
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('क्या आप निश्चित रूप से इस खबर को हटाना चाहते हैं?')) {
      if (onDeleteArticle) {
        onDeleteArticle(id);
      }
    }
  };

  const handleApproveSubmissionClick = (submission: SubmittedNews) => {
    if (onApproveSubmission) {
      onApproveSubmission(submission);
      alert(`"${submission.headline}" को स्वीकृत करके मुख्य पोर्टल पर लाइव प्रकाशित कर दिया गया है!`);
    }
  };

  const handleRejectSubmissionClick = (id: string) => {
    if (onRejectSubmission) {
      onRejectSubmission(id);
    }
  };

  const handleAddTickerForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTickerText.trim()) return;
    if (onAddTicker) {
      onAddTicker(newTickerText.trim());
    }
    setNewTickerText('');
  };

  // State Management Handlers
  const handleAddNewState = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStateHi.trim()) return;
    
    const stateObj: StateInfo = {
      id: `state-${Date.now()}`,
      nameHi: newStateHi.trim(),
      nameEn: newStateEn.trim() || newStateHi.trim(),
      districts: []
    };

    const updated = [...statesList, stateObj];
    if (onUpdateStatesList) {
      onUpdateStatesList(updated);
    }
    setNewStateHi('');
    setNewStateEn('');
    alert(`नया राज्य "${stateObj.nameHi}" सफलतापूर्वक जोड़ दिया गया!`);
  };

  const handleAddNewDistrict = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStateForDistrict || !newDistrictName.trim()) return;

    const updated = statesList.map(s => {
      if (s.id === selectedStateForDistrict || s.nameHi === selectedStateForDistrict) {
        if (!s.districts.includes(newDistrictName.trim())) {
          return { ...s, districts: [...s.districts, newDistrictName.trim()] };
        }
      }
      return s;
    });

    if (onUpdateStatesList) {
      onUpdateStatesList(updated);
    }
    setNewDistrictName('');
    alert(`नया जिला "${newDistrictName.trim()}" जोड़ा गया!`);
  };

  const handleDeleteDistrict = (stateId: string, distName: string) => {
    if (confirm(`क्या आप जिला "${distName}" को हटाना चाहते हैं?`)) {
      const updated = statesList.map(s => {
        if (s.id === stateId) {
          return { ...s, districts: s.districts.filter(d => d !== distName) };
        }
        return s;
      });
      if (onUpdateStatesList) {
        onUpdateStatesList(updated);
      }
    }
  };

  const handleDeleteState = (stateId: string, stateName: string) => {
    if (confirm(`क्या आप राज्य "${stateName}" और इसके सभी जिलों को हटाना चाहते हैं?`)) {
      const updated = statesList.filter(s => s.id !== stateId);
      if (onUpdateStatesList) {
        onUpdateStatesList(updated);
      }
    }
  };

  // Filtered Articles List
  const filteredArticles = articlesList.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || art.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const pendingSubmissionsCount = submittedList.filter(s => s.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* CMS Top Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between sticky top-0 z-40 shadow-xl gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C60000] text-white flex items-center justify-center font-black text-xl shadow">
            WWS
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold font-heading text-white flex items-center gap-2">
              <span>वर्ल्ड वाइड समाचार सीएमएस (एडमिन पैनल)</span>
              <span className="text-[10px] bg-amber-500 text-black px-2 py-0.5 rounded font-mono font-bold">
                PRO CMS
              </span>
            </h1>
            <p className="text-xs text-slate-400">संपादकीय प्रबंधन, रियल-टाइम खबरें, राज्य व जिला सिस्टम, इमेज अपलोड</p>
          </div>
        </div>

        <button
          onClick={onBackToPortal}
          className="bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs px-4 py-2 rounded-lg transition-colors border border-slate-700 flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>मुख्य पोर्टल पर वापस जाएं</span>
        </button>
      </header>

      {/* Main Grid Container */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-1 space-y-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
              activeTab === 'overview' ? 'bg-[#C60000] text-white font-bold' : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4" />
              <span>डैशबोर्ड ओवरव्यू</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
              activeTab === 'articles' ? 'bg-[#C60000] text-white font-bold' : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4" />
              <span>प्रबंधित ख़बरें</span>
            </div>
            <span className="bg-slate-800 text-amber-300 px-2 py-0.5 rounded-full text-[10px] font-mono">
              {articlesList.length}
            </span>
          </button>

          <button
            onClick={() => {
              resetForm();
              setActiveTab('add_edit');
            }}
            className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
              activeTab === 'add_edit' ? 'bg-[#C60000] text-white font-bold' : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Plus className="w-4 h-4" />
              <span>{editingArticleId ? 'खबर संपादित करें' : 'नई खबर लिखें'}</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('submitted')}
            className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
              activeTab === 'submitted' ? 'bg-[#C60000] text-white font-bold' : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Inbox className="w-4 h-4 text-sky-400" />
              <span>प्राप्त यूज़र समाचार</span>
            </div>
            {pendingSubmissionsCount > 0 && (
              <span className="bg-amber-500 text-black px-2 py-0.5 rounded-full text-[10px] font-bold animate-pulse">
                {pendingSubmissionsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('states')}
            className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
              activeTab === 'states' ? 'bg-[#C60000] text-white font-bold' : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>राज्य व जिला प्रबंधक</span>
            </div>
            <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full text-[10px] font-mono border border-emerald-800">
              {statesList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('tickers')}
            className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
              activeTab === 'tickers' ? 'bg-[#C60000] text-white font-bold' : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>ब्रेकिंग टिकर प्रबंधक</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('adsense')}
            className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
              activeTab === 'adsense' ? 'bg-[#C60000] text-white font-bold' : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>गूगल एडसेंस सेटिंग्स</span>
            </div>
          </button>
        </aside>

        {/* Main Content Workspace */}
        <main className="lg:col-span-4 bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-2xl">
          
          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-3 gap-2">
                <h2 className="text-xl font-bold font-heading text-white">
                  संपादकीय विश्लेषिकी व स्थिति (Editorial Dashboard)
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-emerald-400 font-mono font-bold">● पोर्टल एक्टिव</span>
                  {onResetDefaults && (
                    <button
                      onClick={onResetDefaults}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-2.5 py-1 rounded flex items-center gap-1 font-medium transition-colors"
                      title="डिफ़ॉल्ट स्थिति में रीसेट करें"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                      <span>डिफ़ॉल्ट डेटा रीसेट</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block font-semibold">कुल प्रकाशित ख़बरें</span>
                  <span className="text-3xl font-black text-amber-400 mt-1 block font-mono">{articlesList.length}</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block font-semibold">कुल राज्य व जिले</span>
                  <span className="text-3xl font-black text-emerald-400 mt-1 block font-mono">{statesList.length} राज्य</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block font-semibold">लंबित नागरिक समाचार</span>
                  <span className="text-3xl font-black text-sky-400 mt-1 block font-mono">{pendingSubmissionsCount}</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block font-semibold">सक्रिय टिकर संदेश</span>
                  <span className="text-3xl font-black text-purple-400 mt-1 block font-mono">{tickerList.length}</span>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[#C60000]" />
                    <span>त्वरित खबर प्रकाशन (Direct Image Upload)</span>
                  </h3>
                  <p className="text-slate-400 text-xs">पोर्टल पर कंप्यूटर या मोबाइल से सीधी फोटो अपलोड करके नई खबर तुरंत प्रकाशित करें।</p>
                  <button
                    onClick={() => {
                      resetForm();
                      setActiveTab('add_edit');
                    }}
                    className="bg-[#C60000] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-700 transition-colors cursor-pointer"
                  >
                    + नई खबर लिखें
                  </button>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    <span>राज्य व जिला डायनेमिक प्रबंधन</span>
                  </h3>
                  <p className="text-slate-400 text-xs">नए राज्य या जिले (जैसे उत्तर प्रदेश → बाराबंकी) जोड़ें ताकि यूजर जिला चुनकर खबर देख सकें।</p>
                  <button
                    onClick={() => setActiveTab('states')}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    राज्य/जिला जोड़ें
                  </button>
                </div>
              </div>

              {/* Recent Articles */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h3 className="font-bold text-sm text-white mb-3">हाल ही में प्रकाशित ख़बरें</h3>
                <div className="space-y-2 text-xs">
                  {articlesList.slice(0, 5).map((a) => (
                    <div key={a.id} className="flex items-center justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <div className="flex items-center gap-3 truncate">
                        <img src={a.imageUrl} alt="" className="w-8 h-8 rounded object-cover shrink-0" />
                        <span className="font-semibold text-slate-200 truncate">{a.title}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-slate-400 font-mono text-[11px] bg-slate-800 px-2 py-0.5 rounded">{a.category}</span>
                        <button
                          onClick={() => handleStartEdit(a)}
                          className="p-1 text-amber-400 hover:text-amber-300 cursor-pointer"
                          title="संपादित करें"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. ALL ARTICLES TAB (MANAGE, EDIT, DELETE, SEARCH) */}
          {activeTab === 'articles' && (
            <div className="space-y-4">
              <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-3 gap-2">
                <h2 className="text-xl font-bold font-heading text-white">
                  प्रबंधित ख़बरें ({filteredArticles.length} / {articlesList.length})
                </h2>
                <button
                  onClick={() => {
                    resetForm();
                    setActiveTab('add_edit');
                  }}
                  className="bg-[#C60000] hover:bg-red-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>नई खबर लिखें</span>
                </button>
              </div>

              {/* Search & Filter Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="sm:col-span-2 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="शीर्षक या स्थान से खबर खोजें..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-white outline-none focus:border-[#C60000]"
                  />
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                </div>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white outline-none"
                >
                  <option value="all">सभी श्रेणियाँ</option>
                  <option value="राज्य">राज्य</option>
                  <option value="राष्ट्रीय">राष्ट्रीय</option>
                  <option value="राजनीति">राजनीति</option>
                  <option value="खेल">खेल</option>
                  <option value="मनोरंजन">मनोरंजन</option>
                  <option value="टेक्नोलॉजी">टेक्नोलॉजी</option>
                  <option value="कृषि एवं किसान">कृषि एवं किसान</option>
                </select>
              </div>

              {/* Articles List Table */}
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {filteredArticles.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    कोई खबर उपलब्ध नहीं है।
                  </div>
                ) : (
                  filteredArticles.map((a) => (
                    <div
                      key={a.id}
                      className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-3 overflow-hidden flex-1 min-w-[240px]">
                        <img src={a.imageUrl} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0" />
                        <div className="truncate space-y-1">
                          <h4 className="font-bold text-slate-100 truncate text-sm">{a.title}</h4>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 flex-wrap">
                            <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-amber-300 font-semibold">{a.category}</span>
                            <span>📍 {a.location}</span>
                            <span>• {a.author.name}</span>
                            {a.isBreaking && (
                              <span className="bg-red-950 text-red-400 border border-red-800 px-1.5 py-0.5 rounded text-[10px] font-bold">
                                ब्रेकिंग
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons: Edit, Delete, Preview */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setPreviewArticle(a)}
                          className="p-2 bg-slate-900 hover:bg-slate-800 text-sky-400 rounded-lg border border-slate-800 font-semibold flex items-center gap-1 cursor-pointer"
                          title="देखें"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">देखें</span>
                        </button>

                        <button
                          onClick={() => handleStartEdit(a)}
                          className="p-2 bg-slate-900 hover:bg-slate-800 text-amber-300 rounded-lg border border-slate-800 font-semibold flex items-center gap-1 cursor-pointer"
                          title="संपादित करें"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">संपादित करें</span>
                        </button>

                        <button
                          onClick={() => handleDeleteArticle(a.id)}
                          className="p-2 bg-red-950/80 hover:bg-red-900 text-red-400 rounded-lg border border-red-800 font-semibold flex items-center gap-1 cursor-pointer"
                          title="हटाएं"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">हटाएं</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* 3. ADD / EDIT ARTICLE FORM WITH DIRECT IMAGE UPLOAD */}
          {activeTab === 'add_edit' && (
            <form onSubmit={handleSaveArticle} className="space-y-4 text-xs">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h2 className="text-xl font-bold font-heading text-white">
                  {editingArticleId ? 'खबर का संपादन करें (Edit Article)' : 'नई खबर का प्रकाशन (Publish News)'}
                </h2>
                {editingArticleId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    <span>संपादन रद्द करें</span>
                  </button>
                )}
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">खबर का शीर्षक (Headline / Title) *</label>
                <input
                  type="text"
                  required
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                  placeholder="मुख्य शीर्षक दर्ज करें"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-white text-sm outline-none focus:border-[#C60000]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">श्रेणी (Category) *</label>
                  <select
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value as CategoryType })}
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
                    <option value="धर्म एवं संस्कृति">धर्म एवं संस्कृति</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">स्थान / ज़िला *</label>
                  <input
                    type="text"
                    required
                    value={articleForm.location}
                    onChange={(e) => setArticleForm({ ...articleForm, location: e.target.value })}
                    placeholder="उदाहरण: लखनऊ, बाराबंकी, दिल्ली"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              {/* Direct Image File Upload & URL Input */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-3">
                <label className="block font-bold text-amber-300">खबर की मुख्य फोटो (Direct Image Upload or URL) *</label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <label className="border border-dashed border-slate-700 hover:border-[#C60000] bg-slate-900 rounded-xl p-3 text-center cursor-pointer transition-colors block">
                    <ImageIcon className="w-5 h-5 text-[#C60000] mx-auto mb-1" />
                    <span className="font-bold text-slate-200 block text-xs">डिवाइस से फोटो चुनें (Upload Photo)</span>
                    <span className="text-[10px] text-slate-400">JPG, PNG, WEBP</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAdminImageUpload}
                      className="hidden"
                    />
                  </label>

                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">या वेब लिंक (URL) दर्ज करें:</span>
                    <input
                      type="text"
                      value={articleForm.imageUrl}
                      onChange={(e) => {
                        setArticleForm({ ...articleForm, imageUrl: e.target.value });
                        setImagePreview(e.target.value);
                      }}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs outline-none"
                    />
                  </div>
                </div>

                {(imagePreview || articleForm.imageUrl) && (
                  <div className="flex items-center gap-3 pt-2">
                    <img src={imagePreview || articleForm.imageUrl} alt="Preview" className="w-20 h-16 rounded-lg object-cover border border-slate-700" />
                    <span className="text-[11px] text-emerald-400 font-semibold">✓ फोटो सबमिट हेतु तैयार है</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">संपादक / रिपोर्टर का नाम</label>
                  <input
                    type="text"
                    value={articleForm.authorName}
                    onChange={(e) => setArticleForm({ ...articleForm, authorName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">पद / डेजिग्नेशन</label>
                  <input
                    type="text"
                    value={articleForm.authorRole}
                    onChange={(e) => setArticleForm({ ...articleForm, authorRole: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">संक्षिप्त सारांश (Short Summary) *</label>
                <textarea
                  rows={2}
                  required
                  value={articleForm.summary}
                  onChange={(e) => setArticleForm({ ...articleForm, summary: e.target.value })}
                  placeholder="2-3 पंक्तियों में संक्षेप लिखें..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white outline-none focus:border-[#C60000]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">विस्तृत खबर कंटेंट (Full Article Content) *</label>
                <textarea
                  rows={6}
                  required
                  value={articleForm.content}
                  onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                  placeholder="पूरा समाचार विवरण यहाँ लिखें..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white outline-none focus:border-[#C60000]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 bg-slate-950 p-3 rounded-lg border border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-amber-300">
                  <input
                    type="checkbox"
                    checked={articleForm.isBreaking}
                    onChange={(e) => setArticleForm({ ...articleForm, isBreaking: e.target.checked })}
                    className="w-4 h-4 rounded text-[#C60000]"
                  />
                  <span>ब्रेकिंग न्यूज़ बनाएं</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-emerald-300">
                  <input
                    type="checkbox"
                    checked={articleForm.isTopStory}
                    onChange={(e) => setArticleForm({ ...articleForm, isTopStory: e.target.checked })}
                    className="w-4 h-4 rounded text-[#C60000]"
                  />
                  <span>टॉप स्टोरी कैरोसेल में दिखाएं</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#C60000] hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg text-sm cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{editingArticleId ? 'खबर अपडेट करें' : 'खबर तुरंत प्रकाशित करें'}</span>
              </button>
            </form>
          )}

          {/* 4. STATES & DISTRICTS DYNAMIC MANAGER TAB */}
          {activeTab === 'states' && (
            <div className="space-y-6 text-xs">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-400" />
                  <span>राज्य एवं जिला डायनेमिक प्रबंधक (States & Districts Manager)</span>
                </h2>
                <p className="text-slate-400 mt-1">
                  यहाँ से आप बिना कोड बदले नए राज्य और उनके जिले जोड़ या हटा सकते हैं। बदलाव तुरंत लाइव वेबसाइट पर प्रभावी होंगे!
                </p>
              </div>

              {/* Form 1: Add New State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form onSubmit={handleAddNewState} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <PlusCircle className="w-4 h-4 text-emerald-400" />
                    <span>नया राज्य जोड़ें (Add New State)</span>
                  </h3>
                  <div>
                    <label className="block text-slate-400 mb-1">राज्य का नाम (हिंदी) *</label>
                    <input
                      type="text"
                      required
                      placeholder="उदाहरण: हिमाचल प्रदेश"
                      value={newStateHi}
                      onChange={(e) => setNewStateHi(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">राज्य का नाम (अंग्रेज़ी)</label>
                    <input
                      type="text"
                      placeholder="उदाहरण: Himachal Pradesh"
                      value={newStateEn}
                      onChange={(e) => setNewStateEn(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    + नया राज्य शामिल करें
                  </button>
                </form>

                {/* Form 2: Add New District to Selected State */}
                <form onSubmit={handleAddNewDistrict} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>राज्य में नया जिला जोड़ें (Add District)</span>
                  </h3>
                  <div>
                    <label className="block text-slate-400 mb-1">राज्य का चयन करें *</label>
                    <select
                      required
                      value={selectedStateForDistrict}
                      onChange={(e) => setSelectedStateForDistrict(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white outline-none"
                    >
                      <option value="">-- राज्य चुनें --</option>
                      {statesList.map(s => (
                        <option key={s.id} value={s.id}>{s.nameHi} ({s.districts.length} जिले)</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">जिले का नाम (हिंदी) *</label>
                    <input
                      type="text"
                      required
                      placeholder="उदाहरण: बाराबंकी"
                      value={newDistrictName}
                      onChange={(e) => setNewDistrictName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white outline-none focus:border-amber-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    + जिला जोड़ें
                  </button>
                </form>
              </div>

              {/* List of Existing States & Districts */}
              <div className="space-y-4 pt-2">
                <h3 className="font-bold text-sm text-white">मौजूदा राज्य व उनके जिले:</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {statesList.map((state) => (
                    <div key={state.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-white text-base">{state.nameHi}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({state.nameEn})</span>
                        </div>
                        
                        <button
                          onClick={() => handleDeleteState(state.id, state.nameHi)}
                          className="text-red-400 hover:text-red-300 p-1 text-xs font-semibold cursor-pointer"
                        >
                          राज्य हटाएं
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {state.districts.map((d) => (
                          <span
                            key={d}
                            className="bg-slate-900 border border-slate-800 text-slate-200 px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1.5"
                          >
                            <span>📍 {d}</span>
                            <button
                              onClick={() => handleDeleteDistrict(state.id, d)}
                              className="text-red-400 hover:text-white font-bold ml-1 cursor-pointer"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 5. SUBMITTED NEWS TAB */}
          {activeTab === 'submitted' && (
            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                    <span>प्राप्त उपयोगकर्ता समाचार (User Submissions)</span>
                    <span className="text-xs bg-sky-500 text-white px-2 py-0.5 rounded font-mono font-bold">
                      {submittedList.length} कुल
                    </span>
                  </h2>
                  <p className="text-slate-400 text-xs mt-0.5">पाठकों व सिटीजन रिपोर्टर्स द्वारा भेजी गई खबरें</p>
                </div>
              </div>

              <div className="space-y-4">
                {submittedList.length === 0 ? (
                  <div className="text-center py-10 text-slate-500">कोई सबमिशन प्राप्त नहीं हुआ है।</div>
                ) : (
                  submittedList.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-900 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{item.headline}</span>
                          <span className="bg-slate-800 text-amber-300 px-2 py-0.5 rounded text-[10px] font-semibold">
                            {item.category}
                          </span>
                        </div>
                        
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          item.status === 'pending' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                          item.status === 'approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                          'bg-red-950 text-red-400 border border-red-800'
                        }`}>
                          {item.status === 'pending' ? 'लंबित (Pending)' : item.status === 'approved' ? 'स्वीकृत व प्रकाशित' : 'अस्वीकृत'}
                        </span>
                      </div>

                      <p className="text-slate-300 leading-relaxed text-xs">{item.description}</p>

                      <div className="flex flex-wrap items-center justify-between gap-3 text-slate-400 text-[11px] bg-slate-900 p-2.5 rounded-lg">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span>👤 प्रेषक: <strong className="text-white">{item.name}</strong></span>
                          <span>📱 मोबाइल: <strong className="text-white">{item.mobile}</strong></span>
                          <span>📍 स्थान: <strong className="text-white">{item.location}</strong></span>
                          <span>🕒 समय: {item.submittedAt}</span>
                        </div>

                        {item.status === 'pending' && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleApproveSubmissionClick(item)}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>स्वीकृत व प्रकाशित करें</span>
                            </button>
                            <button
                              onClick={() => handleRejectSubmissionClick(item.id)}
                              className="bg-red-950 hover:bg-red-900 text-red-400 border border-red-800 font-bold px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>अस्वीकृत</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* 6. TICKERS MANAGER TAB */}
          {activeTab === 'tickers' && (
            <div className="space-y-4 text-xs">
              <h2 className="text-xl font-bold font-heading text-white border-b border-slate-800 pb-3">
                ब्रेकिंग न्यूज़ टिकर प्रबंधक
              </h2>

              <form onSubmit={handleAddTickerForm} className="flex gap-2">
                <input
                  type="text"
                  value={newTickerText}
                  onChange={(e) => setNewTickerText(e.target.value)}
                  placeholder="नया ब्रेकिंग टिकर संदेश लिखें..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white outline-none focus:border-[#C60000]"
                />
                <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-4 rounded-lg cursor-pointer">
                  जोड़ें
                </button>
              </form>

              <div className="space-y-2">
                {tickerList.map((t, idx) => (
                  <div key={idx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-200">★ {t}</span>
                    <button
                      onClick={() => onDeleteTicker && onDeleteTicker(idx)}
                      className="text-red-400 hover:text-red-300 p-1 font-bold cursor-pointer"
                    >
                      हटाएं
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. ADSENSE SETTINGS TAB */}
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
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-amber-300 font-mono"
                  />
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-emerald-400 font-bold">
                  <span>Google AdSense Status: Active & Serving Banner Ads</span>
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Preview Article Modal */}
      {previewArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 text-gray-900">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setPreviewArticle(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="bg-[#C60000] text-white text-[10px] font-bold px-2.5 py-0.5 rounded uppercase">
              {previewArticle.category}
            </span>

            <h2 className="text-xl font-bold font-heading text-gray-900">{previewArticle.title}</h2>
            
            <img src={previewArticle.imageUrl} alt="" className="w-full h-48 object-cover rounded-xl" />

            <p className="text-xs text-gray-700 leading-relaxed font-sans">{previewArticle.content}</p>

            <div className="pt-3 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setPreviewArticle(null)}
                className="bg-gray-200 hover:bg-gray-300 font-bold text-xs px-4 py-2 rounded-lg cursor-pointer"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
