import React, { useState } from 'react';
import {
  ShieldCheck, FileText, Mail, MapPin, Phone, Globe, Send,
  CheckCircle2, Users, Rss, Layers, HelpCircle, AlertCircle,
  Briefcase, Award, Heart, BookOpen
} from 'lucide-react';
import { ViewPage } from '../types';

interface MandatoryPagesProps {
  currentPage: ViewPage;
  onNavigate: (page: ViewPage) => void;
  onOpenSubmitNews: () => void;
}

export const MandatoryPages: React.FC<MandatoryPagesProps> = ({ currentPage, onNavigate, onOpenSubmitNews }) => {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [reporterSubmitted, setReporterSubmitted] = useState(false);

  const officeDetails = {
    name: 'वर्ल्ड वाइड समाचार (World Wide Samachar)',
    domain: 'wordwidesamachar.com',
    email: 'wordwidesamachar6393@gmail.com',
    address: 'विमल नगर, कामता, लखनऊ, उत्तर प्रदेश - 226028'
  };

  // 1. ABOUT US PAGE
  if (currentPage === 'about') {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 space-y-6 text-gray-800 font-devanagari">
        <div className="border-b-2 border-[#C60000] pb-3">
          <h1 className="text-3xl font-extrabold font-heading text-gray-900">हमारे बारे में (About Us)</h1>
          <p className="text-sm text-[#C60000] font-semibold mt-1">सच्ची खबर • निष्पक्ष पत्रकारिता • सबसे पहले</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 leading-relaxed text-sm">
          <p className="text-base font-semibold text-gray-900 bg-red-50 p-4 rounded-xl border border-red-100">
            <strong>वर्ल्ड वाइड समाचार (World Wide Samachar - wordwidesamachar.com)</strong> भारत का एक प्रमुख स्वतंत्र और निष्पक्ष डिजिटल समाचार मीडिया संस्थान है।
          </p>

          <h3 className="text-lg font-bold font-heading text-gray-900 pt-2">हमारा उद्देश्य (Our Mission)</h3>
          <p>
            हमारा मूल ध्येय समाज के हर वर्ग तक बिना किसी पूर्वाग्रह के सत्य, निष्पक्ष और प्रमाणिक समाचार पहुंचाना है। हम देश-विदेश की ताज़ा घटनाओं, राजनीति, राज्य समाचार, अपराध, खेल, अर्थव्यवस्था, संस्कृति और जनहित के ज्वलंत मुद्दों पर गहन रिपोर्टिंग करते हैं।
          </p>

          <h3 className="text-lg font-bold font-heading text-gray-900 pt-2">हमारी मूल्य निष्ठा (Core Values)</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>सत्यता व निष्पक्षता:</strong> बिना किसी राजनीतिक या व्यापारिक दबाव के तथ्यपरक खबरें प्रकाशित करना।</li>
            <li><strong>जनहित प्रथम:</strong> आम जनता, किसानों, युवाओं और वंचित वर्गों की आवाज़ बनना।</li>
            <li><strong>डिजिटल गति:</strong> नवीनतम तकनीक का उपयोग कर सबसे पहले और सबसे तेज़ समाचार पहुंचाना।</li>
          </ul>

          <div className="pt-4 border-t border-gray-200 bg-gray-50 p-4 rounded-xl">
            <h4 className="font-bold text-gray-900 mb-2">कार्यालय व संपर्क जानकारी:</h4>
            <p><strong>स्थान:</strong> {officeDetails.address}</p>
            <p><strong>ईमेल:</strong> {officeDetails.email}</p>
            <p><strong>वेबसाइट:</strong> {officeDetails.domain}</p>
          </div>
        </div>
      </div>
    );
  }

  // 2. CONTACT US PAGE
  if (currentPage === 'contact') {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 space-y-6 text-gray-800 font-devanagari">
        <div className="border-b-2 border-[#C60000] pb-3">
          <h1 className="text-3xl font-extrabold font-heading text-gray-900">संपर्क करें (Contact Us)</h1>
          <p className="text-sm text-gray-600 mt-1">हमें संदेश भेजें अथवा लखनऊ कार्यालय में संपर्क करें</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Details & Google Maps Placeholder */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 text-xs">
            <h3 className="text-base font-bold font-heading text-gray-900 border-b border-gray-200 pb-2">
              कार्यालय विवरण (Office Address)
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-[#C60000] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-900 block">कार्यालय का पता:</span>
                  <span className="text-gray-700">{officeDetails.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <span className="font-bold text-gray-900 block">व्यावसायिक ईमेल:</span>
                  <a href={`mailto:${officeDetails.email}`} className="text-[#C60000] hover:underline">
                    {officeDetails.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                  <span className="font-bold text-gray-900 block">डोमेन:</span>
                  <span>{officeDetails.domain}</span>
                </div>
              </div>
            </div>

            {/* Google Maps Box */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">गूगल मैप्स स्थान (Google Maps):</h4>
              <div className="w-full h-40 bg-slate-900 text-white rounded-xl flex flex-col items-center justify-center p-4 border border-slate-700 text-center">
                <MapPin className="w-8 h-8 text-[#C60000] animate-bounce mb-1" />
                <span className="font-bold text-amber-300">वर्ल्ड वाइड समाचार मुख्यालय</span>
                <span className="text-[11px] text-gray-300 mt-1">विमल नगर, कामता, लखनऊ, उत्तर प्रदेश - 226028</span>
              </div>
            </div>
          </div>

          {/* Professional Contact Form */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-xs">
            <h3 className="text-base font-bold font-heading text-gray-900 border-b border-gray-200 pb-2 mb-4">
              ऑनलाइन संदेश फॉर्म (Send Message)
            </h3>

            {contactSubmitted ? (
              <div className="bg-emerald-50 text-emerald-800 p-6 rounded-xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base">संदेश प्राप्त हुआ!</h4>
                <p>धन्यवाद! हमारी टीम शीघ्र ही आपसे संपर्क करेगी।</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">आपका नाम *</label>
                  <input type="text" required placeholder="पूरा नाम दर्ज करें" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#C60000]" />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">मोबाइल नंबर *</label>
                  <input type="tel" required placeholder="10 अंकों का फोन नंबर" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#C60000]" />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">ईमेल पता *</label>
                  <input type="email" required placeholder="ईमेल आईडी" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#C60000]" />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">विषय (Subject) *</label>
                  <input type="text" required placeholder="संदेश का विषय" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#C60000]" />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">संदेश *</label>
                  <textarea required rows={4} placeholder="आपकी बात यहां लिखें..." className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 outline-none focus:border-[#C60000]" />
                </div>
                <button type="submit" className="w-full bg-[#C60000] hover:bg-red-700 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow">
                  <Send className="w-4 h-4" />
                  <span>संदेश भेजें</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3. PRIVACY POLICY
  if (currentPage === 'privacy-policy') {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 space-y-6 text-gray-800 font-devanagari">
        <div className="border-b-2 border-[#C60000] pb-3">
          <h1 className="text-3xl font-extrabold font-heading text-gray-900">गोपनीयता नीति (Privacy Policy)</h1>
          <p className="text-xs text-gray-500 mt-1">अंतिम अद्यतन: 2026 • Google AdSense compliant policy</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 text-xs leading-relaxed">
          <p>
            वर्ल्ड वाइड समाचार (wordwidesamachar.com) पर हम अपने पाठकों की निजता का पूर्ण सम्मान करते हैं। यह Privacy Policy स्पष्ट करती है कि हम आपकी जानकारी का संग्रहण और उपयोग किस प्रकार करते हैं।
          </p>

          <h3 className="text-sm font-bold text-gray-900">1. सूचना संग्रहण (Information Collection)</h3>
          <p>हम केवल आवश्यक न्यूनतम व्यक्तिगत जानकारी (जैसे न्यूज़लेटर के लिए ईमेल, खबर सबमिट करने पर नाम व मोबाइल नंबर) आपकी सहमति से एकत्र करते हैं।</p>

          <h3 className="text-sm font-bold text-gray-900">2. कुकीज़ एवं एडसेंस (Cookies & Google AdSense)</h3>
          <p>हमारी वेबसाइट तृतीय-पक्ष विज्ञापन भागीदारों (जैसे Google AdSense) द्वारा कुकीज़ का उपयोग कर सकती है ताकि उपयोगकर्ताओं की रुचि के अनुरूप विज्ञापन प्रदर्शित किए जा सकें। पाठक अपनी ब्राउज़र सेटिंग्स से कुकीज़ को बंद कर सकते हैं।</p>

          <h3 className="text-sm font-bold text-gray-900">3. डेटा सुरक्षा (Data Security)</h3>
          <p>हम आपके डेटा की सुरक्षा हेतु अत्याधुनिक सुरक्षा प्रोटोकॉल (SSL Encryption) का प्रयोग करते हैं। आपका डेटा किसी भी स्थिति में तृतीय पक्षों को बेचा नहीं जाता।</p>
        </div>
      </div>
    );
  }

  // 4. BECOME REPORTER (पत्रकार बनें)
  if (currentPage === 'become-reporter') {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4 space-y-6 text-gray-800 font-devanagari">
        <div className="border-b-2 border-[#C60000] pb-3">
          <h1 className="text-3xl font-extrabold font-heading text-gray-900">पत्रकार बनें (Become a Reporter)</h1>
          <p className="text-sm text-gray-600 mt-1">वर्ल्ड वाइड समाचार नेटवर्क से जुड़ें और अपने शहर की आवाज़ बनें</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 text-xs">
          {reporterSubmitted ? (
            <div className="bg-emerald-50 text-emerald-800 p-6 rounded-xl text-center space-y-2 border border-emerald-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold">आवेदन सफलतापूर्वक जमा हुआ!</h3>
              <p>हमारी ब्यूरो टीम आपके क्रेडेंशियल्स की जांच के पश्चात प्रेस कार्ड व लॉगिन जारी करेगी।</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setReporterSubmitted(true); }} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">आवेदक का नाम *</label>
                  <input type="text" required placeholder="पूरा नाम" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">फोन नंबर *</label>
                  <input type="tel" required placeholder="10 अंकों का नंबर" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">राज्य व ज़िला *</label>
                  <input type="text" required placeholder="उदा: लखनऊ, उत्तर प्रदेश" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">पत्रकारिता अनुभव (वर्षों में)</label>
                  <input type="number" placeholder="उदा: 2 वर्ष" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 outline-none" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">संक्षिप्त बायो (Brief Bio) *</label>
                <textarea required rows={3} placeholder="अपने अनुभव व क्षेत्रों के बारे में बताएं..." className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 outline-none" />
              </div>

              <button type="submit" className="w-full bg-[#C60000] hover:bg-red-700 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow">
                <Briefcase className="w-4 h-4" />
                <span>पत्रकार हेतु आवेदन सबमिट करें</span>
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // 5. ADVERTISE WITH US (मीडिया किट)
  if (currentPage === 'advertise') {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 space-y-6 text-gray-800 font-devanagari">
        <div className="border-b-2 border-amber-500 pb-3">
          <h1 className="text-3xl font-extrabold font-heading text-gray-900">हमारे साथ विज्ञापन दें (Advertise With Us)</h1>
          <p className="text-sm text-amber-700 font-semibold mt-1">वर्ल्ड वाइड समाचार मीडिया किट व विज्ञापन रेट्स</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center space-y-2">
            <h4 className="font-bold text-gray-900 text-sm">हेडर बैनर (Header Banner)</h4>
            <p className="text-gray-500">728x90 टॉप लीडरबोर्ड</p>
            <span className="font-bold text-[#C60000] text-base block">उच्च दृश्यता प्लेसमेंट</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center space-y-2">
            <h4 className="font-bold text-gray-900 text-sm">साइडबार विज्ञापन (Sidebar Ads)</h4>
            <p className="text-gray-500">300x250 व 336x280 रेक्टेंगल</p>
            <span className="font-bold text-[#C60000] text-base block">निरंतर एंगेजमेंट</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center space-y-2">
            <h4 className="font-bold text-gray-900 text-sm">प्रायोजित लेख (Sponsored Articles)</h4>
            <p className="text-gray-500">कस्टम एडिटोरियल कवरेज</p>
            <span className="font-bold text-[#C60000] text-base block">ब्रांड रीच विस्तार</span>
          </div>
        </div>

        <div className="bg-gray-900 text-white p-6 rounded-2xl border border-gray-800 space-y-3 text-xs">
          <h3 className="text-base font-bold text-amber-300 font-heading">विज्ञापन बुकिंग संपर्क:</h3>
          <p>सेल्स एवं ब्रांड पार्टनरशिप हेतु हमारे विज्ञापन विभाग से संपर्क करें:</p>
          <p className="font-bold text-sm">ईमेल: <a href={`mailto:${officeDetails.email}`} className="text-amber-400 hover:underline">{officeDetails.email}</a></p>
          <p>पता: {officeDetails.address}</p>
        </div>
      </div>
    );
  }

  // GENERAL FALLBACK COMPLIANCE PAGE (Editorial, Correction, Cookie, Disclaimer, RSS, Sitemap, FAQ, etc.)
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6 text-gray-800 font-devanagari">
      <div className="border-b-2 border-[#C60000] pb-3">
        <h1 className="text-3xl font-extrabold font-heading text-gray-900 capitalize">
          {currentPage.replace('-', ' ')} नीति व अनुपालन
        </h1>
        <p className="text-xs text-gray-500 mt-1">वर्ल्ड वाइड समाचार - आधिकारिक दस्तावेज़</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 text-xs leading-relaxed">
        <p className="text-sm font-semibold text-gray-900">
          वर्ल्ड वाइड समाचार (wordwidesamachar.com) भारत सरकार की डिजिटल मीडिया आचार संहिता तथा प्रेस काउंसिल ऑफ इंडिया के दिशानिर्देशों का पूर्णतः पालन करता है।
        </p>

        <h3 className="text-sm font-bold text-gray-900">मुख्य प्रावधान:</h3>
        <p>1. हमारी खबरें निष्पक्ष, तथ्यपरक तथा बहु-सत्यापित (Multi-verified) स्रोतों पर आधारित होती हैं।</p>
        <p>2. किसी भी प्रकार की अनजाने में हुई त्रुटि का संज्ञान होने पर हमारी टीम तत्काल सुधार नीति (Correction Policy) के तहत संशोधन प्रकाशित करती है।</p>
        <p>3. पाठकों की शिकायतों और फीडबैक हेतु हमारा शिकायत निवारण कक्ष 24 घंटे क्रियाशील है।</p>

        <div className="pt-4 border-t border-gray-200 text-gray-600">
          अधिक जानकारी या पूछताछ हेतु संपर्क करें: <strong className="text-gray-900">{officeDetails.email}</strong>
        </div>
      </div>
    </div>
  );
};
