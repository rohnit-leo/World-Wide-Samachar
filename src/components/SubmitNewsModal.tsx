import React, { useState } from 'react';
import { X, Send, Upload, CheckCircle2, Image as ImageIcon, Film, MapPin } from 'lucide-react';

interface SubmitNewsModalProps {
  onClose: () => void;
}

export const SubmitNewsModal: React.FC<SubmitNewsModalProps> = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    location: '',
    category: 'राज्य',
    headline: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 text-gray-900">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 border-b border-gray-200 pb-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-amber-500 text-black flex items-center justify-center font-bold">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-heading text-gray-900">
              अपनी खबर भेजें (Submit Your News)
            </h2>
            <p className="text-xs text-gray-500">आपकी खबर हमारे संपादकीय विभाग द्वारा समीक्षा के बाद प्रकाशित होगी</p>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold font-heading text-gray-900">
              खबर सफलतापूर्वक प्राप्त हुई!
            </h3>
            <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
              धन्यवाद {formData.name}! आपकी खबर की जांच हमारी एडिटोरियल टीम कर रही है। सत्यापन के बाद इसे वर्ल्ड वाइड समाचार पोर्टल पर स्थान दिया जाएगा।
            </p>
            <button
              onClick={onClose}
              className="bg-[#C60000] text-white font-bold text-xs px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors"
            >
              ठीक है
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">आपका नाम *</label>
                <input
                  type="text"
                  required
                  placeholder="पूरा नाम दर्ज करें"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#C60000]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">मोबाइल नंबर *</label>
                <input
                  type="tel"
                  required
                  placeholder="10 अंकों का मोबाइल नंबर"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#C60000]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">स्थान / शहर / जिला *</label>
                <input
                  type="text"
                  required
                  placeholder="उदाहरण: लखनऊ, यूपी"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#C60000]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">श्रेणी (Category) *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#C60000]"
                >
                  <option value="राज्य">राज्य एवं शहर</option>
                  <option value="अपराध">अपराध</option>
                  <option value="राजनीति">राजनीति</option>
                  <option value="कृषि एवं किसान">कृषि एवं किसान</option>
                  <option value="मौसम">मौसम</option>
                  <option value="पर्यावरण">पर्यावरण</option>
                  <option value="रोजगार">रोजगार व शिक्षा</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">खबर का शीर्षक (Headline) *</label>
              <input
                type="text"
                required
                placeholder="खबर की मुख्य बात संक्षेप में लिखें"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#C60000]"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">खबर का विस्तृत विवरण *</label>
              <textarea
                required
                rows={4}
                placeholder="घटना कब, कहां और कैसे हुई? पूरा विवरण लिखें..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 outline-none focus:border-[#C60000]"
              />
            </div>

            {/* Photo & Video Upload Mock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="border border-dashed border-gray-300 rounded-lg p-3 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
                <ImageIcon className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                <span className="font-semibold text-gray-700 block">तस्वीरें जोड़ें (Photos)</span>
                <span className="text-[10px] text-gray-400">JPG, PNG (अधिकतम 5MB)</span>
              </div>

              <div className="border border-dashed border-gray-300 rounded-lg p-3 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
                <Film className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                <span className="font-semibold text-gray-700 block">वीडियो क्लिप जोड़ें</span>
                <span className="text-[10px] text-gray-400">MP4 (अधिकतम 50MB)</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100"
              >
                रद्द करें
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#C60000] hover:bg-red-700 text-white rounded-lg font-bold flex items-center gap-1.5 shadow"
              >
                <Upload className="w-4 h-4" />
                <span>खबर सबमिट करें</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
