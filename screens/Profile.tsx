import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, LogOut, Save, Camera, Shield, Home, MapPin, Users, Plus, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { signOut, user, userProfile } = useAuth();
  
  // User information state
  const [userData, setUserData] = useState({
    fullName: userProfile?.full_name || user?.user_metadata?.full_name || '',
    email: userProfile?.email || user?.email || '',
    phone: userProfile?.phone || user?.user_metadata?.phone || '',
  });

  // Sync with userProfile when it becomes available
  useEffect(() => {
    if (userProfile) {
      setUserData({
        fullName: userProfile.full_name,
        email: userProfile.email,
        phone: userProfile.phone || '',
      });
    }
  }, [userProfile]);

  // House settings state
  const [houseData, setHouseData] = useState({
    address: '1508 57th PL',
    city: 'Des Moines',
    state: 'IA',
    zipCode: '50311',
  });

  const [roommates, setRoommates] = useState<string[]>([]);
  const [newRoommateEmail, setNewRoommateEmail] = useState('');

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleHouseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHouseData({ ...houseData, [e.target.name]: e.target.value });
  };

  const handleAddRoommate = () => {
    if (newRoommateEmail.trim() && !roommates.includes(newRoommateEmail.trim())) {
      setRoommates([...roommates, newRoommateEmail.trim()]);
      setNewRoommateEmail('');
    }
  };

  const handleRemoveRoommate = (email: string) => {
    setRoommates(roommates.filter(r => r !== email));
  };

  const handleSave = async () => {
    // TODO: Implement save functionality with Supabase
    console.log('Saving user data:', userData);
    console.log('Saving house data:', houseData);
    console.log('Saving roommates:', roommates);
  };

  const handleSignOut = async () => {
    console.log('Profile: Sign out clicked');
    try {
        await signOut();
        console.log('Profile: Sign out successful');
    } catch (error) {
        console.error('Profile: Sign out failed', error);
        alert('Failed to sign out. Please try again.');
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 max-w-7xl mx-auto h-full">
      <header>
        <h2 className="text-4xl md:text-5xl font-sans font-bold uppercase tracking-tight text-white flex items-center gap-3">
          System<span className="text-hq-green">.Settings</span>
        </h2>
        <p className="font-mono text-xs md:text-sm text-zinc-500 mt-2">CONFIGURE USER & HOUSE INFORMATION</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 flex-1">
        {/* Left Column: User Information */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 flex flex-col gap-8 relative overflow-hidden shadow-2xl">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Shield className="w-48 h-48 text-zinc-700" />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-hq-green to-transparent" />

          <div className="z-10">
            <h3 className="text-2xl md:text-3xl font-sans font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-hq-green" />
              User Information
            </h3>

            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4 mb-6">
              <div className="relative group cursor-pointer">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-hq-green p-1 bg-zinc-950">
                  <img
                    src={userProfile?.avatar_url || user?.user_metadata?.avatar_url?.replace('W=s96', 'W=s1080') || 'https://picsum.photos/id/1005/200/200'}
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
                <div className="font-sans text-xl font-bold uppercase text-white">{userData.fullName || 'User'}</div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-mono text-xs text-zinc-500 uppercase flex items-center gap-2">
                  <User className="w-3 h-3" /> Display Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleUserChange}
                  className="w-full bg-black border border-zinc-700 p-3 font-mono text-white focus:border-hq-green focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-xs text-zinc-500 uppercase flex items-center gap-2">
                  <Mail className="w-3 h-3" /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleUserChange}
                  className="w-full bg-black border border-zinc-700 p-3 font-mono text-white focus:border-hq-green focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                  readOnly // Often email is not editable directly
                  title="Email cannot be changed"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-xs text-zinc-500 uppercase flex items-center gap-2">
                  <Phone className="w-3 h-3" /> Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleUserChange}
                  className="w-full bg-black border border-zinc-700 p-3 font-mono text-white focus:border-hq-green focus:outline-none transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: House Settings */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 flex flex-col gap-8 relative overflow-hidden shadow-2xl">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Home className="w-48 h-48 text-zinc-700" />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-hq-green to-transparent" />

          <div className="z-10 flex flex-col h-full">
            <h3 className="text-2xl md:text-3xl font-sans font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-2">
              <Home className="w-6 h-6 text-hq-green" />
              House Settings
            </h3>

            {/* Address Section */}
            <div className="space-y-4 mb-8">
              <div className="space-y-1">
                <label className="font-mono text-xs text-zinc-500 uppercase flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={houseData.address}
                  onChange={handleHouseChange}
                  className="w-full bg-black border border-zinc-700 p-3 font-mono text-white focus:border-hq-green focus:outline-none transition-colors"
                  placeholder="1508 57th PL"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-xs text-zinc-500 uppercase">City</label>
                  <input
                    type="text"
                    name="city"
                    value={houseData.city}
                    onChange={handleHouseChange}
                    className="w-full bg-black border border-zinc-700 p-3 font-mono text-white focus:border-hq-green focus:outline-none transition-colors"
                    placeholder="Des Moines"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-xs text-zinc-500 uppercase">State</label>
                  <input
                    type="text"
                    name="state"
                    value={houseData.state}
                    onChange={handleHouseChange}
                    className="w-full bg-black border border-zinc-700 p-3 font-mono text-white focus:border-hq-green focus:outline-none transition-colors"
                    placeholder="IA"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-xs text-zinc-500 uppercase">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={houseData.zipCode}
                  onChange={handleHouseChange}
                  className="w-full bg-black border border-zinc-700 p-3 font-mono text-white focus:border-hq-green focus:outline-none transition-colors"
                  placeholder="50311"
                />
              </div>
            </div>

            {/* Roommates Section */}
            <div className="flex-1 flex flex-col">
              <label className="font-mono text-xs text-zinc-500 uppercase flex items-center gap-2 mb-4">
                <Users className="w-3 h-3" /> Roommates
              </label>
              
              {/* Add Roommate Input */}
              <div className="flex gap-2 mb-4">
                <input
                  type="email"
                  value={newRoommateEmail}
                  onChange={(e) => setNewRoommateEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddRoommate()}
                  className="flex-1 bg-black border border-zinc-700 p-3 font-mono text-white focus:border-hq-green focus:outline-none transition-colors"
                  placeholder="roommate@example.com"
                />
                <button
                  onClick={handleAddRoommate}
                  className="bg-hq-green text-black font-mono font-bold px-4 py-3 hover:bg-white transition-colors uppercase tracking-wider flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>

              {/* Roommates List */}
              <div className="flex-1 overflow-y-auto space-y-2">
                {roommates.length === 0 ? (
                  <div className="text-center py-8 text-zinc-500 font-mono text-sm">
                    No roommates added yet
                  </div>
                ) : (
                  roommates.map((email, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-black border border-zinc-700 p-3 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                          <Users className="w-4 h-4 text-zinc-500" />
                        </div>
                        <span className="font-mono text-sm text-white">{email}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveRoommate(email)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/20 rounded"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Footer */}
      <div className="flex flex-col gap-3 pt-4 border-t border-zinc-800">
        <button
          onClick={handleSave}
          className="w-full bg-hq-green text-black font-mono font-bold py-3 flex items-center justify-center gap-2 hover:bg-white transition-colors uppercase tracking-wider"
        >
          <Save className="w-4 h-4" /> Save All Changes
        </button>

        <button
          onClick={handleSignOut}
          className="w-full bg-zinc-950 border border-red-500/50 text-red-500 font-mono font-bold py-3 flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all uppercase tracking-wider group"
        >
          <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
