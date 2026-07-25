import React, { useState, useEffect } from 'react';
import {
  Header,
  NewsTicker,
  LatestNews,
  HeroCarousel,
  ArticleCard,
  PhotoGallerySection,
  OpinionSection,
  FactCheckSection,
  HoroscopeSection,
  RightSidebar,
  Footer,
  AdSenseBanner,
  LiveTVModal,
  EPaperModal,
  SubmitNewsModal,
  SearchModal,
  AuthModal,
  SEOMetadataModal,
  AdminPanel,
  MandatoryPages
} from './components/index';

import { StateDistrictView } from './components/StateDistrictView';
import { NewsDetailView } from './components/NewsDetailView';

import { ALL_NEWS_ARTICLES, BREAKING_NEWS_TICKERS, INITIAL_SUBMITTED_NEWS } from './data/newsData';
import { STATES_DATA } from './data/statesData';
import { NewsArticle, CategoryType, ViewPage, SubmittedNews, StateInfo } from './types';
import { ChevronRight, ArrowRight, Layers } from 'lucide-react';

// Chronological Sorting Helper (Newest First)
const sortArticlesByNewest = (list: NewsArticle[]) => {
  return [...list].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};

export const App: React.FC = () => {
  // Requirement 1: Open directly on home page without loading screen
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('होम');
  const [currentPage, setCurrentPage] = useState<ViewPage>('home');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Requirement: Admin Panel accessed via URL /admin
  useEffect(() => {
    const checkAdminPath = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (
        path === '/admin' ||
        path.endsWith('/admin') ||
        path.endsWith('/admin/') ||
        hash === '#admin' ||
        hash === '#/admin' ||
        hash === '#/admin/' ||
        search.includes('admin')
      ) {
        setCurrentPage('admin');
      }
    };

    checkAdminPath();

    window.addEventListener('popstate', checkAdminPath);
    window.addEventListener('hashchange', checkAdminPath);

    return () => {
      window.removeEventListener('popstate', checkAdminPath);
      window.removeEventListener('hashchange', checkAdminPath);
    };
  }, []);

  // Dynamic Global Realtime Data State
  const [articles, setArticles] = useState<NewsArticle[]>(() => {
    try {
      const saved = localStorage.getItem('wws_articles_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return sortArticlesByNewest(parsed);
      }
    } catch (e) {
      console.error('Error loading articles from storage:', e);
    }
    return sortArticlesByNewest(ALL_NEWS_ARTICLES);
  });

  const [submittedNews, setSubmittedNews] = useState<SubmittedNews[]>(() => {
    try {
      const saved = localStorage.getItem('wws_submitted_news_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error loading submitted news from storage:', e);
    }
    return INITIAL_SUBMITTED_NEWS;
  });

  const [tickers, setTickers] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('wws_tickers_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading tickers from storage:', e);
    }
    return BREAKING_NEWS_TICKERS.ticker1;
  });

  // Realtime States & Districts Data State
  const [statesList, setStatesList] = useState<StateInfo[]>(() => {
    try {
      const saved = localStorage.getItem('wws_states_data_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading states data:', e);
    }
    return STATES_DATA;
  });

  // Auto-Save Persistence
  useEffect(() => {
    try {
      localStorage.setItem('wws_articles_v3', JSON.stringify(articles));
    } catch (e) {
      console.error('Failed to save articles', e);
    }
  }, [articles]);

  useEffect(() => {
    try {
      localStorage.setItem('wws_submitted_news_v3', JSON.stringify(submittedNews));
    } catch (e) {
      console.error('Failed to save submitted news', e);
    }
  }, [submittedNews]);

  useEffect(() => {
    try {
      localStorage.setItem('wws_tickers_v3', JSON.stringify(tickers));
    } catch (e) {
      console.error('Failed to save tickers', e);
    }
  }, [tickers]);

  useEffect(() => {
    try {
      localStorage.setItem('wws_states_data_v1', JSON.stringify(statesList));
    } catch (e) {
      console.error('Failed to save states data', e);
    }
  }, [statesList]);

  // Real-Time Handler Functions for Admin & User Actions
  const handleAddArticle = (newArt: NewsArticle) => {
    const artWithTimestamp: NewsArticle = {
      ...newArt,
      publishedAt: newArt.publishedAt || new Date().toISOString()
    };
    setArticles(prev => sortArticlesByNewest([artWithTimestamp, ...prev]));
  };

  const handleUpdateArticle = (updatedArt: NewsArticle) => {
    setArticles(prev => prev.map(a => a.id === updatedArt.id ? updatedArt : a));
    if (selectedArticle && selectedArticle.id === updatedArt.id) {
      setSelectedArticle(updatedArt);
    }
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
    if (selectedArticle && selectedArticle.id === id) {
      setSelectedArticle(null);
    }
  };

  const handleSubmitUserNews = (submissionData: {
    name: string;
    mobile: string;
    email?: string;
    location: string;
    category: CategoryType;
    headline: string;
    description: string;
    imageUrl?: string;
  }) => {
    const newSub: SubmittedNews = {
      id: `sub-${Date.now()}`,
      name: submissionData.name,
      mobile: submissionData.mobile,
      email: submissionData.email,
      location: submissionData.location,
      category: submissionData.category,
      headline: submissionData.headline,
      description: submissionData.description,
      submittedAt: new Date().toLocaleString('hi-IN'),
      status: 'pending'
    };
    setSubmittedNews(prev => [newSub, ...prev]);
  };

  const handleApproveSubmission = (submission: SubmittedNews) => {
    const newArt: NewsArticle = {
      id: `art-sub-${Date.now()}`,
      title: submission.headline,
      subtitle: `नागरिक पत्रकार रिपोर्ट (${submission.location})`,
      category: submission.category,
      summary: submission.description.slice(0, 140) + '...',
      content: submission.description,
      imageUrl: submission.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200',
      location: submission.location,
      publishedAt: new Date().toISOString(),
      readingTimeMinutes: 2,
      views: 1,
      likes: 0,
      commentsCount: 0,
      isBreaking: true,
      isTopStory: true,
      author: {
        id: `auth-${submission.id}`,
        name: `${submission.name} (सिटीजन रिपोर्टर)`,
        role: 'नागरिक रिपोर्टर',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200'
      },
      tags: [submission.category, submission.location, 'यूज़र रिपोर्ट']
    };

    setArticles(prev => sortArticlesByNewest([newArt, ...prev]));
    setSubmittedNews(prev => prev.map(item => item.id === submission.id ? { ...item, status: 'approved' } : item));
  };

  const handleRejectSubmission = (id: string) => {
    setSubmittedNews(prev => prev.map(item => item.id === id ? { ...item, status: 'rejected' } : item));
  };

  const handleAddTicker = (text: string) => {
    setTickers(prev => [text, ...prev]);
  };

  const handleDeleteTicker = (index: number) => {
    setTickers(prev => prev.filter((_, i) => i !== index));
  };

  const handleResetDefaults = () => {
    if (confirm('क्या आप निश्चित रूप से पोर्टल का पूरा डेटा डिफ़ॉल्ट स्थिति में रीसेट करना चाहते हैं?')) {
      setArticles(sortArticlesByNewest(ALL_NEWS_ARTICLES));
      setSubmittedNews(INITIAL_SUBMITTED_NEWS);
      setTickers(BREAKING_NEWS_TICKERS.ticker1);
      setStatesList(STATES_DATA);
      localStorage.removeItem('wws_articles_v3');
      localStorage.removeItem('wws_submitted_news_v3');
      localStorage.removeItem('wws_tickers_v3');
      localStorage.removeItem('wws_states_data_v1');
      alert('पोर्टल डिफ़ॉल्ट डेटा पर सफलतापूर्वक रीसेट कर दिया गया!');
    }
  };

  // Modals state
  const [isLiveTVOpen, setIsLiveTVOpen] = useState(false);
  const [isEPaperOpen, setIsEPaperOpen] = useState(false);
  const [isSubmitNewsOpen, setIsSubmitNewsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false);

  const handleSelectCategory = (category: CategoryType) => {
    setActiveCategory(category);
    setCurrentPage('home');
    setSelectedArticle(null);
    window.scrollTo({ top: 250, behavior: 'smooth' });
  };

  const handleNavigatePage = (page: ViewPage) => {
    if (page === 'admin') {
      window.history.pushState({}, '', '/admin');
    }
    setCurrentPage(page);
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin CMS Full Page View
  if (currentPage === 'admin') {
    return (
      <AdminPanel
        onBackToPortal={() => {
          if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
            window.history.pushState({}, '', '/');
          }
          setCurrentPage('home');
        }}
        articlesList={articles}
        onAddArticle={handleAddArticle}
        onUpdateArticle={handleUpdateArticle}
        onUpdateArticlesList={(updatedList) => setArticles(sortArticlesByNewest(updatedList))}
        onDeleteArticle={handleDeleteArticle}
        submittedList={submittedNews}
        onApproveSubmission={handleApproveSubmission}
        onRejectSubmission={handleRejectSubmission}
        tickerList={tickers}
        onAddTicker={handleAddTicker}
        onDeleteTicker={handleDeleteTicker}
        onResetDefaults={handleResetDefaults}
        statesList={statesList}
        onUpdateStatesList={setStatesList}
      />
    );
  }

  // Categories list for home page category-wise sections
  const homepageCategories: CategoryType[] = [
    'राष्ट्रीय',
    'राजनीति',
    'राज्य',
    'अपराध',
    'खेल',
    'मनोरंजन',
    'टेक्नोलॉजी',
    'कृषि एवं किसान',
    'धर्म एवं संस्कृति'
  ];

  // Filter Articles based on active category
  const filteredCategoryArticles = articles.filter((article) => {
    if (activeCategory === 'होम') return true;
    if (activeCategory === 'टॉप न्यूज़') return article.isTopStory;
    if (activeCategory === 'राज्य') return article.category === 'राज्य' || !!article.state;
    if (activeCategory === 'फोटो गैलरी') return article.isPhotoGallery;
    if (activeCategory === 'राशिफल') return article.category === 'राशिफल' || article.tags.includes('राशिफल');
    return article.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#222222] font-sans antialiased selection:bg-[#C60000] selection:text-white">
      {/* 1. MAIN HEADER & NAVIGATION */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        onNavigate={handleNavigatePage}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={(mode) => {
          setAuthMode(mode);
          setIsAuthOpen(true);
        }}
        onOpenLiveTV={() => setIsLiveTVOpen(true)}
        onOpenEPaper={() => setIsEPaperOpen(true)}
        onOpenSubmitNews={() => setIsSubmitNewsOpen(true)}
      />

      {/* 2. CLICKABLE BREAKING NEWS TICKER */}
      <NewsTicker
        tickers={tickers}
        articles={articles}
        onSelectArticle={(art) => {
          setSelectedArticle(art);
          setCurrentPage('home');
          window.scrollTo({ top: 150, behavior: 'smooth' });
        }}
      />

      {/* 3. MAIN BODY CONTENT */}
      {currentPage !== 'home' ? (
        <MandatoryPages
          currentPage={currentPage}
          onNavigate={handleNavigatePage}
          onOpenSubmitNews={() => setIsSubmitNewsOpen(true)}
        />
      ) : (
        <main className="max-w-7xl mx-auto px-4 py-4 space-y-6">
          
          {/* Header Ad Banner */}
          <AdSenseBanner type="leaderboard" />

          {/* REQUIREMENT 11 & 12: ARTICLE FULL PAGE VIEW WHEN SELECTED */}
          {selectedArticle ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <NewsDetailView
                  article={selectedArticle}
                  allArticles={articles}
                  onBackToHome={() => setSelectedArticle(null)}
                  onSelectArticle={setSelectedArticle}
                  onOpenSchemaModal={() => setIsSchemaModalOpen(true)}
                />
              </div>

              <div className="lg:col-span-4">
                <RightSidebar
                  articles={articles}
                  onSelectArticle={setSelectedArticle}
                />
              </div>
            </div>
          ) : (
            <>
              {/* Featured Top Story Carousel on Home */}
              {activeCategory === 'होम' && (
                <HeroCarousel
                  articles={articles}
                  onSelectArticle={setSelectedArticle}
                />
              )}

              {/* Latest News Section on Home instead of Hero Carousel */}
              {activeCategory === 'होम' && (
                <LatestNews
                  articles={articles}
                  onSelectArticle={setSelectedArticle}
                />
              )}

              {/* REQUIREMENT 5 & 6: STATE -> DISTRICT -> NEWS SYSTEM VIEW */}
              {activeCategory === 'राज्य' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8">
                    <StateDistrictView
                      states={statesList}
                      articles={articles}
                      onSelectArticle={setSelectedArticle}
                      onBackToHome={() => handleSelectCategory('होम')}
                    />
                  </div>
                  <div className="lg:col-span-4">
                    <RightSidebar
                      articles={articles}
                      onSelectArticle={setSelectedArticle}
                    />
                  </div>
                </div>
              )}

              {/* REQUIREMENT 10: CATEGORY-WISE NEWS LAYOUT ON HOME PAGE */}
              {activeCategory === 'होम' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left Column: Category-by-Category Sections */}
                  <div className="lg:col-span-8 space-y-10">
                    
                    {homepageCategories.map((catName) => {
                      const categoryArticles = articles
                        .filter((a) => a.category === catName || (catName === 'राज्य' && a.state))
                        .slice(0, 3); // 2 to 3 articles per category

                      if (categoryArticles.length === 0) return null;

                      return (
                        <section key={catName} className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-2xs space-y-4">
                          {/* Category Header */}
                          <div className="flex items-center justify-between border-b-2 border-red-600 pb-2">
                            <h3 className="text-xl font-bold font-heading text-gray-900 flex items-center gap-2">
                              <span className="w-3 h-3 bg-[#C60000] rounded-full"></span>
                              <span>{catName} समाचार</span>
                            </h3>

                            {/* View All Button strictly for this category */}
                            <button
                              onClick={() => handleSelectCategory(catName)}
                              className="text-xs bg-red-50 hover:bg-[#C60000] hover:text-white text-[#C60000] font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <span>सभी खबरें देखें</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>

                          {/* 2-3 News Articles Grid for this category */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {categoryArticles.map((art) => (
                              <ArticleCard
                                key={art.id}
                                article={art}
                                onSelect={setSelectedArticle}
                                variant="grid"
                              />
                            ))}
                          </div>

                          {/* Bottom "View All {Cat}" Button */}
                          <div className="pt-2 text-center border-t border-gray-100">
                            <button
                              onClick={() => handleSelectCategory(catName)}
                              className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold text-xs py-2 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <span>{catName} वर्ग की सभी खबरें देखें →</span>
                            </button>
                          </div>
                        </section>
                      );
                    })}

                    {/* In-Feed Banner Ad */}
                    <AdSenseBanner type="in-article" />

                    {/* Photo Gallery Section */}
                    <PhotoGallerySection onSelectArticle={setSelectedArticle} />

                    {/* Editorial & Columnists */}
                    <OpinionSection onSelectArticle={setSelectedArticle} />

                    {/* Fact Check Section */}
                    <FactCheckSection onSelectArticle={setSelectedArticle} />

                    {/* Rashifal Horoscope */}
                    <HoroscopeSection />

                  </div>

                  {/* Right Column Sidebar */}
                  <div className="lg:col-span-4">
                    <RightSidebar
                      articles={articles}
                      onSelectArticle={setSelectedArticle}
                    />
                  </div>
                </div>
              )}

              {/* SPECIFIC SINGLE CATEGORY FILTER VIEW (When a user clicks 'View All' or Category menu) */}
              {activeCategory !== 'होम' && activeCategory !== 'राज्य' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8 space-y-6">
                    <div className="border-b-4 border-[#C60000] pb-2 flex items-center justify-between">
                      <h2 className="text-2xl font-bold font-heading text-gray-900 flex items-center gap-2">
                        <span className="w-3 h-3 bg-[#C60000] rounded-full"></span>
                        <span>{activeCategory} श्रेणी की सभी ख़बरें</span>
                      </h2>
                      <span className="text-xs text-gray-500 font-semibold">
                        {filteredCategoryArticles.length} ख़बरें उपलब्ध
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {filteredCategoryArticles.map((art) => (
                        <ArticleCard
                          key={art.id}
                          article={art}
                          onSelect={setSelectedArticle}
                          variant="grid"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4">
                    <RightSidebar
                      articles={articles}
                      onSelectArticle={setSelectedArticle}
                    />
                  </div>
                </div>
              )}
            </>
          )}

        </main>
      )}

      {/* 4. FOOTER */}
      <Footer
        onNavigate={handleNavigatePage}
        onSelectCategory={handleSelectCategory}
        onOpenSubmitNews={() => setIsSubmitNewsOpen(true)}
      />

      {/* 5. OVERLAYS & MODALS */}
      {isLiveTVOpen && (
        <LiveTVModal onClose={() => setIsLiveTVOpen(false)} />
      )}

      {isEPaperOpen && (
        <EPaperModal onClose={() => setIsEPaperOpen(false)} />
      )}

      {isSubmitNewsOpen && (
        <SubmitNewsModal
          onClose={() => setIsSubmitNewsOpen(false)}
          onSubmitNews={handleSubmitUserNews}
        />
      )}

      {isSearchOpen && (
        <SearchModal
          articles={articles}
          onClose={() => setIsSearchOpen(false)}
          onSelectArticle={(art) => {
            setSelectedArticle(art);
            setIsSearchOpen(false);
          }}
        />
      )}

      {isAuthOpen && (
        <AuthModal
          initialMode={authMode}
          onClose={() => setIsAuthOpen(false)}
        />
      )}

      {isSchemaModalOpen && (
        <SEOMetadataModal
          article={selectedArticle || undefined}
          onClose={() => setIsSchemaModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
