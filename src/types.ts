export type CategoryType = 
  | 'होम'
  | 'टॉप न्यूज़'
  | 'राज्य'
  | 'राष्ट्रीय'
  | 'अंतरराष्ट्रीय'
  | 'राजनीति'
  | 'अपराध'
  | 'शिक्षा'
  | 'स्वास्थ्य'
  | 'कृषि एवं किसान'
  | 'मौसम'
  | 'व्यापार एवं अर्थव्यवस्था'
  | 'रोजगार'
  | 'टेक्नोलॉजी'
  | 'खेल'
  | 'मनोरंजन'
  | 'धर्म एवं संस्कृति'
  | 'लाइफस्टाइल'
  | 'पर्यावरण'
  | 'राशिफल'
  | 'वीडियो'
  | 'फोटो गैलरी'
  | 'लाइव टीवी'
  | 'ई-पेपर';

export interface NewsArticle {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  summary: string;
  category: CategoryType;
  state?: string;
  district?: string;
  imageUrl: string;
  caption?: string;
  author: {
    id?: string;
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readingTimeMinutes: number;
  views: number;
  likes: number;
  commentsCount: number;
  isBreaking?: boolean;
  isTopStory?: boolean;
  isEditorsPick?: boolean;
  isTrending?: boolean;
  isFactCheck?: boolean;
  isOpinion?: boolean;
  isVideo?: boolean;
  isPhotoGallery?: boolean;
  tags: string[];
  location: string;
  videoUrl?: string;
  galleryImages?: string[];
}

export interface StateInfo {
  id: string;
  nameHi: string;
  nameEn: string;
  districts: string[];
}

export interface WeatherInfo {
  city: string;
  temp: number;
  condition: string;
  high: number;
  low: number;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export interface StockInfo {
  symbol: string;
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface CricketMatch {
  team1: string;
  team1Score: string;
  team2: string;
  team2Score: string;
  status: string;
  tournament: string;
}

export interface ZodiacSign {
  id: string;
  nameHi: string;
  nameEn: string;
  symbol: string;
  datesHi: string;
  prediction: string;
  luckyNumber: number;
  luckyColor: string;
}

export interface PollData {
  id: string;
  question: string;
  options: { id: number; text: string; votes: number }[];
  totalVotes: number;
}

export interface CommentItem {
  id: string;
  articleId: string;
  userName: string;
  userAvatar?: string;
  text: string;
  timestamp: string;
  likes: number;
}

export interface SubmittedNews {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  location: string;
  category: CategoryType;
  headline: string;
  description: string;
  imageUrl?: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export type ViewPage = 
  | 'home'
  | 'article'
  | 'category'
  | 'state'
  | 'about'
  | 'contact'
  | 'privacy-policy'
  | 'terms'
  | 'disclaimer'
  | 'correction-policy'
  | 'editorial-policy'
  | 'fact-checking-policy'
  | 'cookie-policy'
  | 'advertise'
  | 'careers'
  | 'our-team'
  | 'rss'
  | 'archives'
  | 'sitemap'
  | 'submit-news'
  | 'become-reporter'
  | 'feedback'
  | 'faq'
  | 'dmca'
  | 'accessibility'
  | 'code-of-ethics'
  | 'user-guidelines'
  | 'search'
  | 'epaper'
  | 'livetv'
  | 'admin'
  | '404';
