import React, { useState, useEffect } from 'react';
import {
  Header,
  NewsTicker,
  CricketStockBar,
  HeroCarousel,
  ArticleCard,
  StateNewsSection,
  VideoSection,
  PhotoGallerySection,
  OpinionSection,
  FactCheckSection,
  HoroscopeSection,
  RightSidebar,
  Footer,
  AdSenseBanner,
  NewsDetailModal,
  LiveTVModal,
  EPaperModal,
  SubmitNewsModal,
  SearchModal,
  AuthModal,
  SEOMetadataModal,
  LoadingScreen,
  AdminPanel,
  MandatoryPages
} from './components/index';

import { ALL_NEWS_ARTICLES } from './data/newsData';
import { NewsArticle, CategoryType, ViewPage } from './types';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('होम');
  const [currentPage, setCurrentPage] = useState<ViewPage>('home');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Modals state
  const [isLiveTVOpen, setIsLiveTVOpen] = useState(false);
  const [isEPaperOpen, setIsEPaperOpen] = useState(false);
  const [isSubmitNewsOpen, setIsSubmitNewsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectCategory = (category: CategoryType) => {
    setActiveCategory(category);
    setCurrentPage('home');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleNavigatePage = (page: ViewPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Admin CMS Full Page View
  if (currentPage === 'admin') {
    return <AdminPanel onBackToPortal={() => setCurrentPage('home')} />;
  }

  // Filter Articles based on selected navigation category
  const filteredCategoryArticles = ALL_NEWS_ARTICLES.filter((article) => {
    if (activeCategory === 'होम') return true;
    if (activeCategory === 'टॉप न्यूज़') return article.isTopStory;
    if (activeCategory === 'राज्य') return article.category === 'राज्य' || !!article.state;
    if (activeCategory === 'वीडियो') return article.isVideo;
    if (activeCategory === 'फोटो गैलरी') return article.isPhotoGallery;
    if (activeCategory === 'राशिफल') return article.category === 'राशिफल' || article.tags.includes('राशिफल');
    return article.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#222222] font-sans antialiased selection:bg-[#C60000] selection:text-white">
      {/* 1. MAIN HEADER & MEGA NAVIGATION */}
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

      {/* 2. CONTINUOUS SCROLLING BREAKING NEWS TICKERS */}
      <NewsTicker onSelectArticle={setSelectedArticle} />

      {/* 3. CRICKET & STOCK MARKET LIVE BAR */}
      <CricketStockBar />

      {/* 4. MAIN BODY ROUTING (HOME vs MANDATORY COMPLIANCE PAGES) */}
      {currentPage !== 'home' ? (
        <MandatoryPages
          currentPage={currentPage}
          onNavigate={handleNavigatePage}
          onOpenSubmitNews={() => setIsSubmitNewsOpen(true)}
        />
      ) : (
        <main className="max-w-7xl mx-auto px-4 py-4 space-y-6">
          
          {/* Top Leaderboard Ad Banner */}
          <AdSenseBanner type="leaderboard" />

          {/* Featured Hero News Carousel */}
          {activeCategory === 'होम' && (
            <HeroCarousel
              articles={ALL_NEWS_ARTICLES}
              onSelectArticle={setSelectedArticle}
            />
          )}

          {/* Main 2-Column Responsive Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 8-Columns: Primary News Feed */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Active Category Heading */}
              {activeCategory !== 'होम' && (
                <div className="border-b-4 border-[#C60000] pb-2 flex items-center justify-between">
                  <h2 className="text-2xl font-bold font-heading text-gray-900 flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#C60000] rounded-full"></span>
                    <span>{activeCategory} की ताज़ा ख़बरें</span>
                  </h2>
                  <span className="text-xs text-gray-500 font-semibold">
                    {filteredCategoryArticles.length} ख़बरें उपलब्ध
                  </span>
                </div>
              )}

              {/* Dynamic State & District News Selector Section */}
              {(activeCategory === 'होम' || activeCategory === 'राज्य') && (
                <StateNewsSection onSelectArticle={setSelectedArticle} />
              )}

              {/* Category Filtered Primary News Grid */}
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b-2 border-gray-200 pb-2">
                  <h3 className="text-xl font-bold font-heading text-gray-900">
                    {activeCategory === 'होम' ? 'मुख्य राष्ट्रीय एवं प्रादेशिक समाचार' : `${activeCategory} स्पेशल`}
                  </h3>
                  <span className="text-xs bg-red-100 text-[#C60000] px-2.5 py-0.5 rounded font-bold">
                    लाइव अपडेट्स
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredCategoryArticles.slice(0, 8).map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onSelect={setSelectedArticle}
                      variant="grid"
                    />
                  ))}
                </div>
              </section>

              {/* In-Feed Ad Banner */}
              <AdSenseBanner type="in-article" />

              {/* Video News Section */}
              <VideoSection onSelectArticle={setSelectedArticle} />

              {/* Editorial & Opinion Columnists */}
              <OpinionSection onSelectArticle={setSelectedArticle} />

              {/* Fact Check & Verification Section */}
              <FactCheckSection onSelectArticle={setSelectedArticle} />

              {/* Photo Gallery Section */}
              <PhotoGallerySection onSelectArticle={setSelectedArticle} />

              {/* Rashifal & Horoscope Interactive Cards */}
              <HoroscopeSection />

            </div>

            {/* Right 4-Columns: Sidebar Widgets */}
            <div className="lg:col-span-4">
              <RightSidebar onSelectArticle={setSelectedArticle} />
            </div>

          </div>
        </main>
      )}

      {/* 5. PROFESSIONAL FOOTER */}
      <Footer
        onNavigate={handleNavigatePage}
        onSelectCategory={handleSelectCategory}
        onOpenSubmitNews={() => setIsSubmitNewsOpen(true)}
      />

      {/* 6. OVERLAYS & MODALS */}
      {selectedArticle && (
        <NewsDetailModal
          article={selectedArticle}
          allArticles={ALL_NEWS_ARTICLES}
          onClose={() => setSelectedArticle(null)}
          onSelectArticle={setSelectedArticle}
          onOpenSchemaModal={() => setIsSchemaModalOpen(true)}
        />
      )}

      {isLiveTVOpen && (
        <LiveTVModal onClose={() => setIsLiveTVOpen(false)} />
      )}

      {isEPaperOpen && (
        <EPaperModal onClose={() => setIsEPaperOpen(false)} />
      )}

      {isSubmitNewsOpen && (
        <SubmitNewsModal onClose={() => setIsSubmitNewsOpen(false)} />
      )}

      {isSearchOpen && (
        <SearchModal
          onClose={() => setIsSearchOpen(false)}
          onSelectArticle={setSelectedArticle}
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
