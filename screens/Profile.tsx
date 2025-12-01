
import React, { useState } from 'react';
import { User, Mail, Phone, LogOut, Save, Camera, Shield } from 'lucide-react';

interface ProfileProps {
  onLogout?: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onLogout }) => {
  const [formData, setFormData] = useState({
    name: 'Kyle',
    email: 'kyle@hq.os',
    phone: '555-0192'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 max-w-2xl mx-auto h-full justify-center">
      <header>
        <h2 className="text-4xl md:text-5xl font-sans font-bold uppercase tracking-tight text-white flex items-center gap-3">
          Player<span className="text-hq-green">.Profile</span>
        </h2>
        <p className="font-mono text-xs md:text-sm text-zinc-500">EDIT YOUR CHARACTER</p>
      </header>

      <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 flex flex-col gap-8 relative overflow-hidden shadow-2xl">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Shield className="w-48 h-48 text-zinc-700" />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-hq-green to-transparent" />

        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4 z-10">
            <div className="relative group cursor-pointer">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-hq-green p-1 bg-zinc-950">
                    <img
                        src="https://picsum.photos/id/1005/200/200"
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all"
                    />
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white w-8 h-8" />
                </div>
            </div>
            <div className="text-center">
                <div className="font-mono text-xs text-hq-green uppercase tracking-widest mb-1 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-hq-green rounded-full animate-pulse"></span>
                    Online
                </div>
                <div className="font-sans text-xl font-bold uppercase text-white">{formData.name}</div>
            </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 z-10">
            <div className="space-y-1">
                <label className="font-mono text-xs text-zinc-500 uppercase flex items-center gap-2">
                    <User className="w-3 h-3" /> Display Name
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black border border-zinc-700 p-3 font-mono text-white focus:border-hq-green focus:outline-none transition-colors"
                />
            </div>

             <div className="space-y-1">
                <label className="font-mono text-xs text-zinc-500 uppercase flex items-center gap-2">
                    <Mail className="w-3 h-3" /> Email
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-black border border-zinc-700 p-3 font-mono text-white focus:border-hq-green focus:outline-none transition-colors"
                />
            </div>

             <div className="space-y-1">
                <label className="font-mono text-xs text-zinc-500 uppercase flex items-center gap-2">
                    <Phone className="w-3 h-3" /> Phone Number
                </label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-black border border-zinc-700 p-3 font-mono text-white focus:border-hq-green focus:outline-none transition-colors"
                />
            </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-zinc-800 z-10">
            <button className="w-full bg-hq-green text-black font-mono font-bold py-3 flex items-center justify-center gap-2 hover:bg-white transition-colors uppercase tracking-wider">
                <Save className="w-4 h-4" /> Save
            </button>

            <button 
              onClick={onLogout}
              className="w-full bg-zinc-950 border border-red-500/50 text-red-500 font-mono font-bold py-3 flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all uppercase tracking-wider group"
            >
                <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> Log Out
            </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;
