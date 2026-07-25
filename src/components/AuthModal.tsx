import React, { useState } from 'react';
import { X, User, Lock, Phone, Mail, CheckCircle2, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  initialMode?: 'login' | 'register';
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ initialMode = 'login', onClose }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [step, setStep] = useState<'form' | 'otp' | 'success'>('form');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [name, setName] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneOrEmail) return;
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 text-gray-900">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Branding Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#C60000] text-white font-extrabold flex items-center justify-center mx-auto mb-2 text-xl shadow">
            WWS
          </div>
          <h2 className="text-xl font-bold font-heading text-gray-900">
            {mode === 'login' ? 'वर्ल्ड वाइड समाचार में लॉगिन' : 'नया खाता बनाएं (Register)'}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            ताज़ा ख़बरों, ई-पेपर एवं वीडियो बुलेटिन तक पहुंच बनाएं
          </p>
        </div>

        {step === 'success' ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold font-heading text-gray-900">
              स्वागत है! आप लॉगिन हो चुके हैं।
            </h3>
            <p className="text-xs text-gray-600">
              अब आप पसंदीदा ख़बरें सेव कर सकते हैं और ई-पेपर पढ़ सकते हैं।
            </p>
            <button
              onClick={onClose}
              className="w-full bg-[#C60000] text-white font-bold text-xs py-2.5 rounded-lg hover:bg-red-700 transition-colors"
            >
              आगे बढ़ें
            </button>
          </div>
        ) : step === 'otp' ? (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-amber-900 text-center">
              ओटीपी {phoneOrEmail} पर भेजा गया है।
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">4-अंकों का ओटीपी (OTP) दर्ज करें</label>
              <input
                type="text"
                required
                maxLength={4}
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value)}
                placeholder="1 2 3 4"
                className="w-full bg-gray-50 border border-gray-300 text-center font-mono text-xl tracking-widest rounded-lg py-2.5 outline-none focus:border-[#C60000]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#C60000] hover:bg-red-700 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>ओटीपी सत्यापित करें</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleSendOtp} className="space-y-4 text-xs">
            {mode === 'register' && (
              <div>
                <label className="block font-bold text-gray-700 mb-1">आपका नाम (Full Name)</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="पूरा नाम दर्ज करें"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[#C60000]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block font-bold text-gray-700 mb-1">मोबाइल नंबर या ईमेल</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  placeholder="10 अंकों का मोबाइल या ईमेल"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[#C60000]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#C60000] hover:bg-red-700 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow"
            >
              <span>ओटीपी प्राप्त करें (Send OTP)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-3 border-t border-gray-200">
              {mode === 'login' ? (
                <p className="text-gray-600">
                  खाता नहीं है?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('register')}
                    className="text-[#C60000] font-bold hover:underline"
                  >
                    नया खाता बनाएं
                  </button>
                </p>
              ) : (
                <p className="text-gray-600">
                  पहले से खाता है?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-[#C60000] font-bold hover:underline"
                  >
                    लॉगिन करें
                  </button>
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
