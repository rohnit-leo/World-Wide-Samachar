import React, { useState } from 'react';
import {
  X, Eye, Clock, User, Share2, Bookmark, Heart, MessageSquare,
  Volume2, VolumeX, Type, Facebook, Twitter, Send, Copy, Check,
  ChevronLeft, ChevronRight, ShieldCheck, Tag, Sparkles
} from 'lucide-react';
import { NewsArticle, CommentItem } from '../types';
import { ArticleCard } from './ArticleCard';
import { AdSenseBanner } from './AdSenseBanner';

interface NewsDetailModalProps {
  article: NewsArticle;
  allArticles: NewsArticle[];
  onClose: () => void;
  onSelectArticle: (article: NewsArticle) => void;
  onOpenSchemaModal?: () => void;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({
  article,
  allArticles,
  onClose,
  onSelectArticle,
  onOpenSchemaModal
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isSpeechPlaying, setIsSpeechPlaying] = useState(false);
  const [likesCount, setLikesCount] = useState(article.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: 'c1',
      articleId: article.id,
      userName: 'रमेश चंद्र यादव',
      text: 'बहुत ही सटीक और सामयिक खबर। जनहित के मुद्दों को उजागर करने के लिए धन्यवाद।',
      timestamp: '1 घंटे पहले',
      likes: 12
    },
    {
      id: 'c2',
      articleId: article.id,
      userName: 'डॉ. अनीता शर्मा',
      text: 'इस विषय पर सरकार को कड़े कदम उठाने की आवश्यकता है। निष्पक्ष पत्रकारिता की मिसाल है वर्ल्ड वाइड समाचार।',
      timestamp: '30 मिनट पहले',
      likes: 8
    }
  ]);
  const [newCommentText, setNewCommentText] = useState('');
  const [commentName, setCommentName] = useState('');

  const handleLikeToggle = () => {
    if (hasLiked) {
      setLikesCount((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const handleSpeechToggle = () => {
    if ('speechSynthesis' in window) {
      if (isSpeechPlaying) {
        window.speechSynthesis.cancel();
        setIsSpeechPlaying(false);
      } else {
        const textToRead = `${article.title}. ${article.summary}. ${article.content.slice(0, 300)}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'hi-IN';
        utterance.onend = () => setIsSpeechPlaying(false);
        utterance.onerror = () => setIsSpeechPlaying(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeechPlaying(true);
      }
    } else {
      alert('आपके ब्राउज़र में वॉयस रीडर समर्थित नहीं है।');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !commentName.trim()) return;

    const newC: CommentItem = {
      id: Date.now().toString(),
      articleId: article.id,
      userName: commentName,
      text: newCommentText,
      timestamp: 'अभी-अभी',
      likes: 0
    };

    setComments([newC, ...comments]);
    setNewCommentText('');
  };

  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && (a.category === article.category || a.tags.some((t) => article.tags.includes(t))))
    .slice(0, 3);

  const getFontSizeClass = () => {
    if (fontSize === 'large') return 'text-lg leading-relaxed';
    if (fontSize === 'xlarge') return 'text-xl leading-loose';
    return 'text-base leading-relaxed';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto p-2 sm:p-4 flex justify-center">
      <div className="bg-white rounded-2xl max-w-4xl w-full my-auto shadow-2xl border border-gray-200 overflow-hidden relative animate-in fade-in zoom-in duration-200 text-gray-900">
        
        {/* Sticky Article Header Bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-gray-200 px-4 py-3 flex items-center justify-between z-30 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="bg-[#C60000] text-white text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wide">
              {article.category}
            </span>
            {article.state && (
              <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded font-medium">
                {article.state}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onOpenSchemaModal && (
              <button
                onClick={onOpenSchemaModal}
                className="text-xs bg-[#222222] text-amber-300 font-semibold px-2.5 py-1 rounded flex items-center gap-1 hover:bg-black"
                title="Schema.org JSON-LD SEO Data"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">SEO स्कीमा डेटा</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white transition-colors"
              title="बंद करें"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-8 space-y-6">
          
          {/* Article Title & Subtitle */}
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-gray-900 leading-tight">
              {article.title}
            </h1>
            {article.subtitle && (
              <p className="text-sm sm:text-base text-gray-600 font-semibold mt-2 border-l-4 border-[#C60000] pl-3 py-0.5">
                {article.subtitle}
              </p>
            )}
          </div>

          {/* Author & Publication Info Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-gray-50 rounded-xl border border-gray-200/80 text-xs text-gray-600">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-300 shadow-sm"
              />
              <div>
                <span className="font-bold text-gray-900 block text-sm">{article.author.name}</span>
                <span className="text-gray-500">{article.author.role}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 font-medium">
              <span>📍 {article.location}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                {new Date(article.publishedAt).toLocaleDateString('hi-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-gray-400" />
                {article.views.toLocaleString('hi-IN')} पाठक
              </span>
            </div>
          </div>

          {/* Reading Utilities: Voice Reader & Font Resizer */}
          <div className="flex items-center justify-between bg-amber-50/80 border border-amber-200/80 p-3 rounded-xl text-xs">
            {/* Audio Speech Reader */}
            <button
              onClick={handleSpeechToggle}
              className={`flex items-center gap-2 font-bold px-3 py-1.5 rounded-lg transition-colors ${
                isSpeechPlaying
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-amber-500 hover:bg-amber-600 text-black'
              }`}
            >
              {isSpeechPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeechPlaying ? 'ऑडियो रोकें' : 'खबर सुनें (Listen Article)'}</span>
            </button>

            {/* Font Resizer */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
              <Type className="w-3.5 h-3.5 text-gray-500 ml-1" />
              <span className="text-[11px] text-gray-500 mr-1">फॉन्ट:</span>
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 rounded text-xs font-bold ${fontSize === 'normal' ? 'bg-[#C60000] text-white' : 'hover:bg-gray-100'}`}
              >
                अ
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded text-xs font-bold ${fontSize === 'large' ? 'bg-[#C60000] text-white' : 'hover:bg-gray-100'}`}
              >
                अ+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-0.5 rounded text-xs font-bold ${fontSize === 'xlarge' ? 'bg-[#C60000] text-white' : 'hover:bg-gray-100'}`}
              >
                अ++
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden shadow-md bg-gray-100">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            {article.caption && (
              <div className="bg-black/80 text-white text-xs p-2 text-center backdrop-blur-sm">
                📸 {article.caption}
              </div>
            )}
          </div>

          {/* Top In-Article Ad Banner */}
          <AdSenseBanner type="in-article" />

          {/* Full Article Text */}
          <div className={`text-gray-800 space-y-4 font-devanagari ${getFontSizeClass()}`}>
            <p className="font-semibold text-gray-900 leading-relaxed bg-red-50/50 p-4 rounded-xl border border-red-100">
              {article.summary}
            </p>

            {article.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Middle In-Article Ad Banner */}
          <AdSenseBanner type="rectangle" />

          {/* Tags Cloud */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-200">
            <Tag className="w-4 h-4 text-[#C60000]" />
            <span className="text-xs font-bold text-gray-700">टैग्स:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full border border-gray-200 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Social Share & Like Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2">
              <button
                onClick={handleLikeToggle}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-xs transition-colors border ${
                  hasLiked
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white text-gray-700 hover:bg-rose-50 border-gray-300'
                }`}
              >
                <Heart className={`w-4 h-4 ${hasLiked ? 'fill-white' : 'text-rose-600'}`} />
                <span>{likesCount} पसंद</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="text-gray-600">शेयर करें:</span>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                title="व्हाट्सएप पर शेयर करें"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
                title="ट्विटर (X) पर शेयर करें"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                title="फेसबुक पर शेयर करें"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <button
                onClick={handleCopyLink}
                className="p-2 bg-gray-800 hover:bg-black text-white rounded-lg transition-colors flex items-center gap-1"
                title="कॉपी लिंक"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-bold font-heading text-gray-900 border-b-2 border-[#C60000] pb-2 mb-4 inline-block">
                संबंधित ख़बरें (Related News)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <ArticleCard
                    key={rel.id}
                    article={rel}
                    onSelect={(a) => {
                      onSelectArticle(a);
                    }}
                    variant="grid"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-[#C60000]" />
              <h3 className="text-lg font-bold font-heading text-gray-900">
                पाठकों की प्रतिक्रियाएं ({comments.length})
              </h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="आपका नाम (Name)..."
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  required
                  className="bg-white border border-gray-300 text-xs rounded-lg px-3 py-2 outline-none focus:border-[#C60000]"
                />
              </div>
              <textarea
                placeholder="आपकी राय अथवा टिप्पणी लिखें..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                required
                rows={3}
                className="w-full bg-white border border-gray-300 text-xs rounded-lg p-3 outline-none focus:border-[#C60000]"
              />
              <button
                type="submit"
                className="bg-[#C60000] hover:bg-red-700 text-white font-bold text-xs px-5 py-2 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>टिप्पणी पोस्ट करें</span>
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-3">
              {comments.map((c) => (
                <div key={c.id} className="bg-gray-50 p-3 rounded-xl border border-gray-200/80 text-xs space-y-1">
                  <div className="flex items-center justify-between font-semibold text-gray-900">
                    <span>👤 {c.userName}</span>
                    <span className="text-[10px] text-gray-400">{c.timestamp}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
