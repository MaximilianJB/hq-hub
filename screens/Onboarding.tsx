import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Phone, Shield, ArrowRight, Image as ImageIcon } from 'lucide-react';

const Onboarding: React.FC = () => {
  const { user, completeOnboarding } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.user_metadata) {
      setFullName(user.user_metadata.full_name || '');
      setAvatarUrl(user.user_metadata.avatar_url?.replace('W=s96', 'W=s1080') || '');
    }
  }, [user]);

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length === 0) return '';
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    if (formatted.replace(/\D/g, '').length <= 10) {
      setPhone(formatted);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!fullName.trim()) {
      setError('Display Name is required');
      setLoading(false);
      return;
    }

    const rawPhone = phone.replace(/\D/g, '');
    if (!rawPhone || rawPhone.length < 10) {
      setError('Please enter a valid 10-digit phone number');
      setLoading(false);
      return;
    }

    try {
      await completeOnboarding({
        full_name: fullName,
        phone: rawPhone,
        avatar_url: avatarUrl || user?.user_metadata?.avatar_url || '',
      });
    } catch (err) {
      console.error('Failed to onboard:', err);
      setError('Failed to request access. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-hq-black text-white font-sans flex items-center justify-center p-4 relative overflow-hidden">
       {/* Background Grid Texture */}
       <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
             style={{ 
               backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
               backgroundSize: '40px 40px',
             }} 
        />

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden relative group animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Shield className="w-32 h-32 text-zinc-700" />
        </div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-hq-green to-transparent" />

        <div className="p-8 relative z-10">
          <header className="mb-8">
            <h2 className="text-3xl font-sans font-bold uppercase tracking-tight text-white mb-2">
              Welcome<span className="text-hq-green">.NewUser</span>
            </h2>
            <p className="font-mono text-xs text-zinc-400">COMPLETE YOUR PROFILE INITIALIZATION</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="font-mono text-xs text-zinc-500 uppercase flex items-center gap-2">
                <User className="w-3 h-3" /> Display Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-black border border-zinc-700 p-3 font-mono text-white focus:border-hq-green focus:outline-none transition-colors placeholder:text-zinc-700"
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-xs text-zinc-500 uppercase flex items-center gap-2">
                <Phone className="w-3 h-3" /> Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                className="w-full bg-black border border-zinc-700 p-3 font-mono text-white focus:border-hq-green focus:outline-none transition-colors placeholder:text-zinc-700"
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-xs text-zinc-500 uppercase flex items-center gap-2">
                <ImageIcon className="w-3 h-3" /> Profile Photo <span className="text-zinc-600">(Optional)</span>
              </label>
              
              {avatarUrl && !isEditingAvatar ? (
                <div className="flex items-center gap-4 p-3 border border-zinc-800 bg-black mt-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-zinc-700 shrink-0">
                    <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <button 
                    type="button"
                    onClick={() => setIsEditingAvatar(true)}
                    className="text-xs font-mono text-hq-green hover:underline uppercase tracking-wide"
                  >
                    Change Photo
                  </button>
                </div>
              ) : (
                <div className="space-y-2 mt-2">
                  <input
                    type="url"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    className="w-full bg-black border border-zinc-700 p-3 font-mono text-white focus:border-hq-green focus:outline-none transition-colors placeholder:text-zinc-700"
                    placeholder="https://example.com/photo.jpg"
                    autoFocus={isEditingAvatar}
                  />
                  {avatarUrl && (
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-zinc-700">
                      <img 
                        src={avatarUrl} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                        onError={(e) => (e.currentTarget.style.display = 'none')} 
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-3 rounded text-red-500 text-xs font-mono">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-hq-green text-black font-mono font-bold py-3 flex items-center justify-center gap-2 hover:bg-white transition-colors uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed mt-8"
            >
              {loading ? (
                <span className="animate-pulse">Processing...</span>
              ) : (
                <>
                  Request Access <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
