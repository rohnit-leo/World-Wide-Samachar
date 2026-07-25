import React, { useState } from 'react';
import { X, Newspaper, ChevronLeft, ChevronRight, Download, Printer, ZoomIn, ZoomOut, Calendar } from 'lucide-react';

interface EPaperModalProps {
  onClose: () => void;
}

export const EPaperModal: React.FC<EPaperModalProps> = ({ onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const totalPages = 12;

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-2 sm:p-4 text-white">
      {/* Header Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500 text-black flex items-center justify-center font-extrabold">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold font-heading text-amber-300">
              वर्ल्ड वाइड ई-पेपर (Digital E-Paper Edition)
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>आज का संस्करण • {new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <button onClick={() => setZoomLevel((z) => Math.max(75, z - 25))} className="hover:text-amber-300 p-1">
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-mono px-1 font-bold">{zoomLevel}%</span>
            <button onClick={() => setZoomLevel((z) => Math.min(175, z + 25))} className="hover:text-amber-300 p-1">
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700"
            title="प्रिंट पृष्ठ"
          >
            <Printer className="w-4 h-4 text-amber-400" />
          </button>

          <a
            href="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1600"
            download="WWS_EPaper_Today.jpg"
            target="_blank"
            rel="noreferrer"
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">पीडीएफ डाउनलोड</span>
          </a>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* E-Paper Viewer Stage */}
      <div className="flex-1 overflow-auto my-3 flex items-center justify-center relative bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div
          className="bg-white text-gray-900 rounded-xl shadow-2xl overflow-hidden border-4 border-amber-500/40 transition-transform duration-300 max-w-4xl w-full p-6 sm:p-10 font-serif"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        >
          {/* Paper Masthead */}
          <div className="border-b-4 border-black pb-4 mb-6 text-center">
            <div className="flex justify-between items-center text-xs text-gray-600 font-sans border-b border-gray-300 pb-2 mb-2">
              <span>वर्ष 11 • अंक 245</span>
              <span>लखनऊ, उत्तर प्रदेश</span>
              <span>मूल्य: ₹5.00</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black font-heading tracking-tight text-[#222222]">
              वर्ल्ड वाइड समाचार
            </h1>
            <p className="text-xs sm:text-sm font-bold text-[#C60000] tracking-widest mt-1 uppercase font-sans">
              सच्ची खबर • निष्पक्ष पत्रकारिता • सबसे पहले
            </p>
          </div>

          {/* Simulated E-Paper Page Layout */}
          <div className="space-y-6">
            <div className="border-b border-gray-300 pb-4">
              <span className="bg-[#C60000] text-white text-xs font-bold px-2 py-0.5 font-sans">
                पृष्ठ {currentPage} • प्रथम मुख्य समाचार
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-black mt-2 leading-tight">
                {currentPage === 1
                  ? 'नोएडा में 22 हजार करोड़ रुपये की लागत से बने सेमीकंडक्टर प्लांट का भव्य उद्घाटन'
                  : currentPage === 2
                  ? 'उत्तर भारत में मानसून की भारी बारिश: किसानों के लिए विशेष अलर्ट जारी'
                  : 'अंतरराष्ट्रीय शिखर सम्मेलन में भारत के पर्यावरण मॉडल की सराहना'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm text-gray-800 leading-relaxed">
              <div>
                <p className="first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2">
                  उत्तर प्रदेश के नोएडा में भारत के पहले मेगा सेमीकंडक्टर चिप विनिर्माण परिसर का भव्य शुभारंभ हुआ। इस ऐतिहासिक अवसर पर केंद्रीय मंत्रियों तथा प्रमुख उद्योगपतियों की मौजूदगी रही।
                </p>
                <p className="mt-2">
                  परिसर की कुल लागत 22,000 करोड़ रुपये से अधिक है। इस संयंत्र से न केवल घरेलू स्मार्टफोन, इलेक्ट्रिक वाहन तथा रक्षा उपकरणों के लिए सिलिकॉन चिप्स का उत्पादन होगा, बल्कि 50,000 से अधिक रोजगार मिलेंगे।
                </p>
              </div>

              <div className="bg-gray-100 p-4 border border-gray-300 rounded">
                <img
                  src={
                    currentPage === 1
                      ? 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800'
                      : 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800'
                  }
                  alt="E-Paper News Image"
                  className="w-full aspect-video object-cover rounded mb-2"
                />
                <span className="text-[11px] text-gray-500 font-sans block italic">
                  चित्र: सेमीकंडक्टर लैब परिसर नोएडा (डब्ल्यूडब्ल्यूएस फोटो)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Page Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 flex items-center justify-between text-xs">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="bg-slate-800 hover:bg-amber-500 hover:text-black disabled:opacity-40 text-white font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>पिछला पृष्ठ</span>
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`w-7 h-7 rounded font-bold ${
                currentPage === p ? 'bg-amber-500 text-black' : 'bg-slate-800 hover:bg-slate-700 text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="bg-slate-800 hover:bg-amber-500 hover:text-black disabled:opacity-40 text-white font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
        >
          <span>अगला पृष्ठ</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
