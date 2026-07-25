import React, { useState, useEffect } from 'react';
import {
  Search, User, Newspaper, Mail, Globe, Radio, PhoneCall,
  ChevronDown, Send, Menu, X, Facebook, Twitter, Instagram,
  Youtube, Share2, Sparkles, ShieldCheck, Flame, Tv, Sun, MessageCircle
} from 'lucide-react';
import { CategoryType, ViewPage } from '../types';
import { STATES_DATA } from '../data/statesData';

interface HeaderProps {
  activeCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  onNavigate: (page: ViewPage) => void;
  onOpenSearch: () => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenLiveTV: () => void;
  onOpenEPaper: () => void;
  onOpenSubmitNews: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  onNavigate,
  onOpenSearch,
  onOpenAuth,
  onOpenLiveTV,
  onOpenEPaper,
  onOpenSubmitNews
}) => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDateHi, setCurrentDateHi] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('hi-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
      
      const dayNamesHi = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
      const monthNamesHi = ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];
      
      const dayStr = dayNamesHi[now.getDay()];
      const dateNum = now.getDate();
      const monthStr = monthNamesHi[now.getMonth()];
      const yearNum = now.getFullYear();
      
      setCurrentDateHi(`${dayStr}, ${dateNum} ${monthStr} ${yearNum}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onOpenSearch();
    }
  };

  // List without video as video sections are completely removed
  const categoriesList: { label: CategoryType; isHighlight?: boolean }[] = [
    { label: 'होम' },
    { label: 'टॉप न्यूज़' },
    { label: 'राज्य' },
    { label: 'राष्ट्रीय' },
    { label: 'अंतरराष्ट्रीय' },
    { label: 'राजनीति' },
    { label: 'अपराध' },
    { label: 'शिक्षा' },
    { label: 'स्वास्थ्य' },
    { label: 'कृषि एवं किसान' },
    { label: 'मौसम' },
    { label: 'व्यापार एवं अर्थव्यवस्था' },
    { label: 'रोजगार' },
    { label: 'टेक्नोलॉजी' },
    { label: 'खेल' },
    { label: 'मनोरंजन' },
    { label: 'धर्म एवं संस्कृति' },
    { label: 'लाइफस्टाइल' },
    { label: 'पर्यावरण' },
    { label: 'राशिफल' },
    { label: 'फोटो गैलरी' },
    { label: 'लाइव टीवी', isHighlight: true },
    { label: 'ई-पेपर', isHighlight: true }
  ];

  return (
    <div className="w-full flex flex-col font-sans select-none">
      {/* 1. TOP UTILITY HEADER */}
      <div className="bg-[#222222] text-white text-[10px] py-1 px-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-3 sm:gap-4">
          <span>{currentDateHi}</span>
          <button
            onClick={onOpenLiveTV}
            className="flex items-center gap-1 hover:text-[#C60000] transition-colors cursor-pointer"
          >
            <span className="w-2 h-2 bg-[#C60000] rounded-full animate-pulse"></span>
            <span>लाइव टीवी</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onOpenEPaper} className="hover:text-amber-300 transition-colors cursor-pointer">
            ई-पेपर
          </button>
          <span>|</span>
          <button onClick={() => onOpenAuth('login')} className="hover:text-amber-300 transition-colors cursor-pointer">
            लॉगिन
          </button>
          <span>|</span>
          <button onClick={() => onOpenAuth('register')} className="hover:text-amber-300 transition-colors cursor-pointer">
            रजिस्टर
          </button>
        </div>
      </div>

      {/* 2. MAIN BRAND HEADER */}
      <header className="bg-white border-b border-[#E5E5E5] px-4 sm:px-6 py-4 flex items-center justify-between shadow-sm gap-4">
        <div className="flex flex-col cursor-pointer" onClick={() => onNavigate('home')}>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#C60000] leading-none tracking-tight uppercase font-heading">
            WORLD WIDE SAMACHAR
          </h1>
          <p className="text-[11px] text-[#222222] tracking-widest mt-1 font-medium">
            सच्ची खबर • निष्पक्ष पत्रकारिता • सबसे पहले
          </p>
        </div>

        <div className="flex-1 max-w-md mx-2 sm:mx-8 hidden md:block">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="खबरें खोजें..."
              className="w-full border border-[#E5E5E5] rounded-full py-2 px-5 pr-10 text-sm bg-[#F8F9FA] text-[#222222] focus:outline-none focus:ring-1 focus:ring-[#C60000] transition-colors"
            />
            <button
              type="button"
              onClick={onOpenSearch}
              className="absolute right-4 text-gray-400 hover:text-[#C60000] transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSubmitNews}
            className="bg-[#C60000] hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors shadow-sm cursor-pointer"
          >
            खबर भेजें
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md bg-[#F8F9FA] border border-[#E5E5E5] text-[#222222] lg:hidden"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* 3. STICKY CATEGORY NAVIGATION BAR */}
      <nav className="bg-white border-b border-[#E5E5E5] px-4 sm:px-6 sticky top-0 z-40 shadow-xs">
        <ul className="flex gap-4 sm:gap-6 text-[13px] font-bold py-3 overflow-x-auto whitespace-nowrap scrollbar-none items-center text-[#222222]">
          {categoriesList.map((cat) => {
            const isActive = activeCategory === cat.label;
            
            if (cat.label === 'राज्य') {
              return (
                <li key={cat.label} className="relative group">
                  <button
                    onClick={() => onSelectCategory('राज्य')}
                    className={`flex items-center gap-1 cursor-pointer transition-colors ${
                      isActive ? 'text-[#C60000] border-b-2 border-[#C60000] pb-1' : 'hover:text-[#C60000]'
                    }`}
                  >
                    <span>राज्य (States & Districts)</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </li>
              );
            }

            if (cat.label === 'लाइव टीवी') {
              return (
                <li key={cat.label}>
                  <button
                    onClick={onOpenLiveTV}
                    className="bg-[#C60000] text-white text-xs px-2.5 py-1 rounded font-bold hover:bg-red-700 transition-colors flex items-center gap-1 animate-pulse cursor-pointer"
                  >
                    <Tv className="w-3.5 h-3.5" />
                    <span>लाइव टीवी</span>
                  </button>
                </li>
              );
            }

            if (cat.label === 'ई-पेपर') {
              return (
                <li key={cat.label}>
                  <button
                    onClick={onOpenEPaper}
                    className="border border-[#C60000] text-[#C60000] text-xs px-2.5 py-1 rounded font-bold hover:bg-red-50 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Newspaper className="w-3.5 h-3.5" />
                    <span>ई-पेपर</span>
                  </button>
                </li>
              );
            }

            return (
              <li
                key={cat.label}
                onClick={() => onSelectCategory(cat.label)}
                className={`cursor-pointer transition-colors ${
                  isActive ? 'text-[#C60000] border-b-2 border-[#C60000] pb-1' : 'hover:text-[#C60000]'
                }`}
              >
                {cat.label}
              </li>
            );
          })}
        </ul>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#E5E5E5] p-4 space-y-3 max-h-[75vh] overflow-y-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="खबरें खोजें..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-[#E5E5E5] rounded-full py-1.5 px-4 text-xs bg-[#F8F9FA] text-[#222222] outline-none"
              />
              <button onClick={onOpenSearch} className="absolute right-3 top-2 text-gray-400">
                <Search className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              {categoriesList.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => {
                    if (cat.label === 'लाइव टीवी') onOpenLiveTV();
                    else if (cat.label === 'ई-पेपर') onOpenEPaper();
                    else onSelectCategory(cat.label);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left p-2 rounded border border-[#E5E5E5] ${
                    activeCategory === cat.label
                      ? 'bg-[#C60000] text-white font-bold border-[#C60000]'
                      : 'bg-[#F8F9FA] text-[#222222] hover:bg-gray-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};
