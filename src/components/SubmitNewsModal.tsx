import React, { useState } from 'react';
import { X, Send, Upload, CheckCircle2, Image as ImageIcon, MapPin } from 'lucide-react';

interface SubmitNewsModalProps {
  onClose: () => void;
  onSubmitNews?: (submissionData: any) => void;
}

export const SubmitNewsModal: React.FC<SubmitNewsModalProps> = ({ onClose, onSubmitNews }) => {
  const [submitted, setSubmitted] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    location: '',
    category: 'राज्य',
    headline: '',
    description: '',
    imageUrl: ''
  });

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setFormData(prev => ({ ...prev, imageUrl: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmitNews) {
      onSubmitNews({
        ...formData,
        imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200'
      });
    }
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 text-gray-900 font-sans">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 border-b border-gray-200 pb-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-[#C60000] text-white flex items-center justify-center font-bold shadow-2xs">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-heading text-gray-900">
              अपनी खबर भेजें (Citizen Reporter)
            </h2>
            <p className="text-xs text-gray-500">आपकी रिपोर्टिंग संपादकीय समीक्षा के बाद प्रकाशित होगी</p>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold font-heading text-gray-900">
              खबर सफलतापूर्वक सबमिट हो गई!
            </h3>
            <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
              धन्यवाद {formData.name}! आपकी खबर की जांच हमारी एडिटोरियल टीम कर रही है। सत्यापन के बाद इसे वर्ल्ड वाइड समाचार पोर्टल पर प्रकाशित किया जाएगा।
            </p>
            <button
              onClick={onClose}
              className="bg-[#C60000] text-white font-bold text-xs px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
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
                <label className="block font-bold text-gray-700 mb-1">राज्य व जिला / स्थान *</label>
                <input
                  type="text"
                  required
                  placeholder="उदाहरण: बाराबंकी, उत्तर प्रदेश"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#C60000]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">श्रेणी (Category) *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
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

            {/* Direct Image File Upload Input */}
            <div className="space-y-2 pt-1">
              <label className="block font-bold text-gray-700">खबर की फोटो / तस्वीर संलग्न करें (Direct Image Upload)</label>
              
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <label className="w-full border-2 border-dashed border-gray-300 hover:border-[#C60000] rounded-xl p-4 text-center bg-gray-50 hover:bg-red-50/50 cursor-pointer transition-colors">
                  <ImageIcon className="w-6 h-6 text-[#C60000] mx-auto mb-1" />
                  <span className="font-bold text-gray-800 block">फ़ोटो अपलोड करें (Upload Image)</span>
                  <span className="text-[10px] text-gray-500">JPG, PNG, WEBP सेलेक्ट करें</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                </label>

                {imagePreview && (
                  <div className="w-28 h-24 rounded-xl overflow-hidden border border-gray-300 shrink-0 relative bg-gray-100">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData(prev => ({ ...prev, imageUrl: '' }));
                      }}
                      className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 text-[10px]"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                रद्द करें
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#C60000] hover:bg-red-700 text-white rounded-lg font-bold flex items-center gap-1.5 shadow cursor-pointer"
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
