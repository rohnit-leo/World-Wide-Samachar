import React, { useState } from 'react';
import {
  Clock, Eye, Share2, Heart, MessageSquare, Volume2, VolumeX,
  Type, Facebook, Twitter, Send, Copy, Check, Tag, Sparkles, ArrowLeft, User
} from 'lucide-react';
import { NewsArticle, CommentItem } from '../types';
import { ArticleCard } from './ArticleCard';
import { AdSenseBanner } from './AdSenseBanner';

interface NewsDetailViewProps {
  article: NewsArticle;
  allArticles: NewsArticle[];
  onBackToHome: () => void;
  onSelectArticle: (article: NewsArticle) => void;
  onOpenSchemaModal?: () => void;
}

export const NewsDetailView: React.FC<NewsDetailViewProps> = ({
  article,
  allArticles,
  onBackToHome,
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
        const textToRead = `${article.title}. ${article.summary}. ${article.content.slice(0, 400)}`;
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

  // Strictly filter related posts from SAME category (4 to 6 items)
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 6);

  const getFontSizeClass = () => {
    if (fontSize === 'large') return 'text-lg leading-relaxed';
    if (fontSize === 'xlarge') return 'text-xl leading-loose';
    return 'text-base leading-relaxed';
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-8 shadow-sm space-y-8 font-sans my-4">
      
      {/* Article Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <button
          onClick={onBackToHome}
          className="bg-gray-100 hover:bg-[#C60000] hover:text-white text-gray-800 text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>मुख्य पृष्ठ पर वापस जाएं</span>
        </button>

        <div className="flex items-center gap-3 text-xs">
          <span className="bg-[#C60000] text-white font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {article.category}
          </span>
          {article.location && (
            <span className="bg-gray-100 text-gray-700 font-semibold px-2.5 py-1 rounded-full border border-gray-200">
              📍 {article.location}
            </span>
          )}

          {onOpenSchemaModal && (
            <button
              onClick={onOpenSchemaModal}
              className="bg-[#222222] text-amber-300 font-bold px-3 py-1 rounded-full flex items-center gap-1 hover:bg-black transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>SEO स्कीमा</span>
            </button>
          )}
        </div>
      </div>

      {/* 1. HEADLINE / TITLE */}
      <div className="space-y-3">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-gray-900 leading-tight">
          {article.title}
        </h1>
        {article.subtitle && (
          <p className="text-base sm:text-lg text-gray-600 font-semibold border-l-4 border-[#C60000] pl-3 py-0.5">
            {article.subtitle}
          </p>
        )}
      </div>

      {/* Reading Tools: Voice Reader & Font Resizer */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-amber-50/80 border border-amber-200/80 p-3 rounded-xl text-xs">
        <button
          onClick={handleSpeechToggle}
          className={`flex items-center gap-2 font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            isSpeechPlaying
              ? 'bg-red-600 text-white animate-pulse'
              : 'bg-amber-500 hover:bg-amber-600 text-black'
          }`}
        >
          {isSpeechPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span>{isSpeechPlaying ? 'ऑडियो रोकें' : 'खबर सुनें (Audio Article)'}</span>
        </button>

        <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-gray-200 shadow-2xs">
          <Type className="w-3.5 h-3.5 text-gray-500 ml-1" />
          <span className="text-[11px] text-gray-500 mr-1">फॉन्ट साइज़:</span>
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

      {/* 2. MAIN PHOTO IMMEDIATELY BELOW HEADLINE */}
      <div className="space-y-2">
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-md bg-gray-100 border border-gray-200">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 3. PHOTO CAPTION BELOW PHOTO */}
        <div className="text-xs text-gray-600 italic bg-gray-50 p-2.5 rounded-xl border border-gray-200 text-center font-medium">
          📸 {article.caption || `फोटो: ${article.title}`}
        </div>
      </div>

      {/* 4. COMPLETE ARTICLE CONTENT WITHOUT INTERRUPTIONS */}
      <div className={`text-gray-800 space-y-5 font-devanagari ${getFontSizeClass()} pt-2`}>
        <div className="font-semibold text-gray-900 leading-relaxed bg-red-50/60 p-4 rounded-xl border-l-4 border-[#C60000]">
          {article.summary}
        </div>

        {article.content.split('\n\n').map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

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

      {/* Social Like & Share Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <button
          onClick={handleLikeToggle}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-xs transition-colors border cursor-pointer ${
            hasLiked
              ? 'bg-rose-600 text-white border-rose-600'
              : 'bg-white text-gray-700 hover:bg-rose-50 border-gray-300'
          }`}
        >
          <Heart className={`w-4 h-4 ${hasLiked ? 'fill-white' : 'text-rose-600'}`} />
          <span>{likesCount} पसंद</span>
        </button>

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
            className="p-2 bg-gray-800 hover:bg-black text-white rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            title="कॉपी लिंक"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* STEP 1: PUBLISHED BY - EDITOR, DATE & TIME */}
      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs text-gray-700 space-y-2">
        <div className="font-bold text-gray-900 text-sm flex items-center gap-2">
          <User className="w-4 h-4 text-[#C60000]" />
          <span>Published By: {article.author.name} ({article.author.role})</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-gray-600">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            प्रकाशन की तारीख एवं समय: {new Date(article.publishedAt).toLocaleDateString('hi-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}, {new Date(article.publishedAt).toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-gray-400" />
            कुल पाठक: {article.views.toLocaleString('hi-IN')}
          </span>
        </div>
      </div>

      {/* STEP 2: RELATED POSTS (संबंधित खबरें) - 4 to 6 items strictly from same category */}
      {relatedArticles.length > 0 && (
        <div className="pt-6 border-t border-gray-200 space-y-4">
          <h3 className="text-xl font-bold font-heading text-gray-900 border-l-4 border-[#C60000] pl-3">
            संबंधित खबरें (Related Articles in {article.category})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => (
              <ArticleCard
                key={rel.id}
                article={rel}
                onSelect={(a) => {
                  onSelectArticle(a);
                  window.scrollTo({ top: 100, behavior: 'smooth' });
                }}
                variant="grid"
              />
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: COMMENTS (टिप्पणियाँ) */}
      <div className="pt-6 border-t border-gray-200 space-y-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#C60000]" />
          <h3 className="text-xl font-bold font-heading text-gray-900">
            पाठकों की प्रतिक्रियाएं (Comments - {comments.length})
          </h3>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleAddComment} className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <input
              type="text"
              placeholder="आपका नाम (Name)..."
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              required
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#C60000]"
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
            className="bg-[#C60000] hover:bg-red-700 text-white font-bold text-xs px-5 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
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

      {/* STEP 4: ADVERTISEMENT BOX AT THE VERY END */}
      <div className="pt-6 border-t border-gray-200">
        <AdSenseBanner type="leaderboard" />
      </div>

    </div>
  );
};
