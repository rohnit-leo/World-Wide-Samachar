import React from 'react';
import { X, Code, CheckCircle2, Copy } from 'lucide-react';
import { NewsArticle } from '../types';

interface SEOMetadataModalProps {
  article?: NewsArticle;
  onClose: () => void;
}

export const SEOMetadataModal: React.FC<SEOMetadataModalProps> = ({ article, onClose }) => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://wordwidesamachar.com/news/${article?.id || 'main'}`
    },
    headline: article?.title || 'World Wide Samachar | देश और दुनिया की ताज़ा हिंदी ख़बरें',
    description: article?.summary || 'वर्ल्ड वाइड समाचार - भारत और दुनिया की सबसे तेज़ और निष्पक्ष हिंदी ख़बरें।',
    image: [article?.imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200'],
    datePublished: article?.publishedAt || '2026-07-24T10:30:00Z',
    dateModified: article?.publishedAt || '2026-07-24T10:30:00Z',
    author: {
      '@type': 'Person',
      name: article?.author.name || 'World Wide Samachar Reporter',
      jobTitle: article?.author.role || 'Senior Journalist'
    },
    publisher: {
      '@type': 'Organization',
      name: 'World Wide Samachar',
      url: 'https://wordwidesamachar.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://wordwidesamachar.com/logo.png'
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'विमल नगर, कामता',
        addressLocality: 'लखनऊ',
        addressRegion: 'उत्तर प्रदेश',
        postalCode: '226028',
        addressCountry: 'IN'
      },
      email: 'wordwidesamachar6393@gmail.com'
    }
  };

  const jsonLdString = JSON.stringify(schemaData, null, 2);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 text-white">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 hover:bg-red-600 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
          <Code className="w-6 h-6 text-amber-400" />
          <h2 className="text-xl font-bold font-heading text-amber-300">
            SEO Schema.org (JSON-LD Metadata)
          </h2>
        </div>

        <p className="text-xs text-slate-300 mb-3">
          गूगल न्यूज़ और सर्च इंजन इंडेक्सिंग (Google News Crawlers) के लिए उत्पन्न लाइव न्यूजआर्टिकल स्कीमा डेटा:
        </p>

        <div className="bg-black p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 max-h-80 overflow-y-auto">
          <pre>{jsonLdString}</pre>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
          <span className="text-slate-400">Google News & AdSense Ready ✓</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(jsonLdString);
              alert('स्कीमा कोड कॉपी हो गया!');
            }}
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-4 py-2 rounded-lg flex items-center gap-1.5"
          >
            <Copy className="w-4 h-4" />
            <span>कोड कॉपी करें</span>
          </button>
        </div>
      </div>
    </div>
  );
};
