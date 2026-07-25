import React from 'react';
import {
  Mail, MapPin, Phone, Globe, ShieldCheck, Newspaper, Send,
  Facebook, Twitter, Instagram, Youtube, ArrowUp, Rss, Layers
} from 'lucide-react';
import { ViewPage, CategoryType } from '../types';

interface FooterProps {
  onNavigate: (page: ViewPage) => void;
  onSelectCategory: (category: CategoryType) => void;
  onOpenSubmitNews: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectCategory,
  onOpenSubmitNews
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1a1a1a] text-gray-300 pt-12 pb-6 border-t-4 border-[#C60000]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Section: Logo, About, Address & Google Maps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-gray-800">
          {/* Col 1: Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="w-12 h-12 rounded-xl bg-[#C60000] text-white flex flex-col items-center justify-center font-black shadow-md border border-red-500">
                <span className="text-xl font-heading leading-none">WWS</span>
                <span className="text-[7px] text-yellow-300 font-mono">NEWS</span>
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-white font-heading">वर्ल्ड वाइड समाचार</h2>
                <p className="text-xs text-amber-400 font-semibold font-heading">
                  सच्ची खबर • निष्पक्ष पत्रकारिता • सबसे पहले
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              वर्ल्ड वाइड समाचार (wordwidesamachar.com) भारत का उभरता हुआ डिजिटल समाचार पोर्टल है। हम सत्य, निष्पक्षता और जनहित की पत्रकारिता के लिए प्रतिबद्ध हैं।
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenSubmitNews}
                className="bg-[#C60000] hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>अपनी खबर हमें भेजें</span>
              </button>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h3 className="text-white font-bold text-sm font-heading border-b-2 border-[#C60000] pb-2 mb-3 inline-block">
              मुख्य श्रेणियां (Categories)
            </h3>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {[
                'होम', 'टॉप न्यूज़', 'राज्य', 'राष्ट्रीय', 'अंतरराष्ट्रीय', 'राजनीति',
                'अपराध', 'शिक्षा', 'स्वास्थ्य', 'कृषि एवं किसान', 'व्यापार एवं अर्थव्यवस्था',
                'रोजगार', 'टेक्नोलॉजी', 'खेल', 'मनोरंजन', 'धर्म एवं संस्कृति', 'लाइफस्टाइल', 'राशिफल'
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat as CategoryType)}
                  className="text-left text-gray-400 hover:text-white hover:translate-x-1 transition-all py-1"
                >
                  • {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3: Mandatory Policy & Compliance Links */}
          <div>
            <h3 className="text-white font-bold text-sm font-heading border-b-2 border-amber-500 pb-2 mb-3 inline-block">
              महत्वपूर्ण नीतियां (Policies & Guidelines)
            </h3>
            <div className="space-y-1.5 text-xs">
              <button onClick={() => onNavigate('about')} className="block text-gray-400 hover:text-amber-300 transition-colors">हमारे बारे में (About Us)</button>
              <button onClick={() => onNavigate('contact')} className="block text-gray-400 hover:text-amber-300 transition-colors">संपर्क करें (Contact Us)</button>
              <button onClick={() => onNavigate('editorial-policy')} className="block text-gray-400 hover:text-amber-300 transition-colors">संपादकीय नीति (Editorial Policy)</button>
              <button onClick={() => onNavigate('fact-checking-policy')} className="block text-gray-400 hover:text-amber-300 transition-colors">फैक्ट चेक पॉलिसी (Fact Check Policy)</button>
              <button onClick={() => onNavigate('correction-policy')} className="block text-gray-400 hover:text-amber-300 transition-colors">सुधार नीति (Correction Policy)</button>
              <button onClick={() => onNavigate('privacy-policy')} className="block text-gray-400 hover:text-amber-300 transition-colors">गोपनीयता नीति (Privacy Policy)</button>
              <button onClick={() => onNavigate('terms')} className="block text-gray-400 hover:text-amber-300 transition-colors">नियम एवं शर्तें (Terms & Conditions)</button>
              <button onClick={() => onNavigate('disclaimer')} className="block text-gray-400 hover:text-amber-300 transition-colors">अस्वीकरण (Disclaimer)</button>
              <button onClick={() => onNavigate('cookie-policy')} className="block text-gray-400 hover:text-amber-300 transition-colors">कुकी नीति (Cookie Policy)</button>
              <button onClick={() => onNavigate('advertise')} className="block text-gray-400 hover:text-amber-300 transition-colors">विज्ञापन दें (Advertise With Us)</button>
              <button onClick={() => onNavigate('code-of-ethics')} className="block text-gray-400 hover:text-amber-300 transition-colors">आचार संहिता (Code of Ethics)</button>
              <button onClick={() => onNavigate('our-team')} className="block text-gray-400 hover:text-amber-300 transition-colors">हमारी टीम (Our Team)</button>
            </div>
          </div>

          {/* Col 4: Contact & Office Location */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm font-heading border-b-2 border-emerald-500 pb-2 mb-3 inline-block">
              कार्यालय व संपर्क (Office Address)
            </h3>

            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C60000] shrink-0 mt-0.5" />
                <span>विमल नगर, कामता, लखनऊ, उत्तर प्रदेश - 226028</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:wordwidesamachar6393@gmail.com" className="hover:underline text-gray-200">
                  wordwidesamachar6393@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>wordwidesamachar.com</span>
              </div>
            </div>

            {/* Google Maps Embed Placeholder */}
            <div className="mt-3 bg-gray-800 rounded-lg p-2.5 border border-gray-700 text-xs">
              <div className="flex items-center justify-between mb-1.5 font-semibold text-gray-200">
                <span>📍 गूगल मैप्स (लखनऊ ऑफिस)</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                  सत्यापित पता
                </span>
              </div>
              <div className="w-full h-20 bg-slate-900 rounded flex flex-col items-center justify-center text-center p-2 text-[11px] text-gray-400 border border-gray-700">
                <span className="font-bold text-amber-300">विमल नगर, कामता, लखनऊ</span>
                <span className="text-[10px]">उत्तर प्रदेश - 226028</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Quick Navigation Utilities & RSS */}
        <div className="py-6 border-b border-gray-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-gray-400">
            <button onClick={() => onNavigate('admin')} className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#C60000]" /> एडमिन सीएमएस (Admin CMS)</button>
            <button onClick={() => onNavigate('careers')} className="hover:text-white">करियर (Careers)</button>
            <button onClick={() => onNavigate('become-reporter')} className="hover:text-white">पत्रकार बनें (Become Reporter)</button>
            <button onClick={() => onNavigate('rss')} className="hover:text-white flex items-center gap-1"><Rss className="w-3.5 h-3.5 text-amber-500" /> RSS फीड</button>
            <button onClick={() => onNavigate('sitemap')} className="hover:text-white flex items-center gap-1"><Layers className="w-3.5 h-3.5 text-sky-400" /> साइटमैप</button>
            <button onClick={() => onNavigate('archives')} className="hover:text-white">आर्काइव्स (Archives)</button>
            <button onClick={() => onNavigate('faq')} className="hover:text-white">सवाल-जवाब (FAQ)</button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-[11px]">सोशल मीडिया पर जुड़ें:</span>
            <div className="flex items-center gap-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-gray-800 hover:bg-blue-600 text-white flex items-center justify-center transition-colors">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-gray-800 hover:bg-sky-500 text-white flex items-center justify-center transition-colors">
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-gray-800 hover:bg-pink-600 text-white flex items-center justify-center transition-colors">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-gray-800 hover:bg-red-600 text-white flex items-center justify-center transition-colors">
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} <span className="font-bold text-gray-300">World Wide Samachar</span> (wordwidesamachar.com). सर्वाधिकार सुरक्षित।
          </div>

          <div className="flex items-center gap-4">
            <span>डिजिटल मीडिया आचार संहिता का पूर्ण अनुपालन</span>
            <button
              onClick={scrollToTop}
              className="p-2 bg-[#C60000] hover:bg-red-700 text-white rounded-full transition-colors shadow"
              title="ऊपर जाएं"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
