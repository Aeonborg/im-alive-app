import React, { useState, useEffect } from 'react';
import { Heart, Clock, Mail, AlertCircle, CheckCircle } from 'lucide-react';

export default function AliveChecker() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [checkInterval, setCheckInterval] = useState(30);
  const [isRegistered, setIsRegistered] = useState(false);
  const [lastCheckIn, setLastCheckIn] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [missedUsers, setMissedUsers] = useState([
    'John Smith - Last seen 45 days ago',
    'Maria Garcia - Last seen 32 days ago',
    'David Chen - Last seen 67 days ago'
  ]);

  useEffect(() => {
    if (lastCheckIn && checkInterval) {
      const interval = setInterval(() => {
        const elapsed = Date.now() - lastCheckIn;
        const intervalMs = checkInterval * 24 * 60 * 60 * 1000;
        const remaining = intervalMs - elapsed;
        
        if (remaining > 0) {
          const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
          const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
          const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
          setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
        } else {
          setTimeRemaining('OVERDUE');
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [lastCheckIn, checkInterval]);

  const handleRegister = () => {
    if (name && email && contactEmail && checkInterval >= 1) {
      setIsRegistered(true);
      setLastCheckIn(Date.now());
    }
  };

  const handleCheckIn = () => {
    setLastCheckIn(Date.now());
  };

  if (!isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-green-500 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
              I'm Alive
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Regular wellness check-in system
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact Email
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="contact@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in Interval (days)
                </label>
                <input
                  type="number"
                  value={checkInterval}
                  onChange={(e) => setCheckInterval(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Minimum: 1 day. Default: 30 days.
                </p>
              </div>

              <button
                onClick={handleRegister}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200"
              >
                Register for Check-ins
              </button>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Missed Check-ins
            </h2>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-hidden">
              <div className="animate-scroll whitespace-nowrap">
                {missedUsers.join(' • ')} • {missedUsers.join(' • ')}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-12 h-12 text-green-500 animate-pulse" />
          </div>
          
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Welcome, {name}!
          </h1>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-gray-700">Next check-in due in:</span>
              </div>
              <span className={`text-2xl font-bold ${timeRemaining === 'OVERDUE' ? 'text-red-600' : 'text-green-600'}`}>
                {timeRemaining || 'Loading...'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <Mail className="w-4 h-4 inline mr-2" />
                Contact: {contactEmail}
              </div>
              <div>
                <Clock className="w-4 h-4 inline mr-2" />
                Interval: {checkInterval} days
              </div>
            </div>
          </div>

          <button
            onClick={handleCheckIn}
            className={`w-full ${timeRemaining === 'OVERDUE' ? 'bg-gradient-to-br from-gray-800 to-black' : 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'} text-white font-bold py-8 rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl transform hover:scale-105 active:scale-95`}
          >
            <Heart className={`w-16 h-16 fill-current transition-all duration-500 ${timeRemaining === 'OVERDUE' ? 'text-gray-400 animate-pulse' : 'text-red-200'}`} />
            <span className="text-3xl">{timeRemaining === 'OVERDUE' ? 'CHECK IN NOW!' : "I'M ALIVE"}</span>
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            If you don't check in within {checkInterval} days, an email will be sent to {contactEmail}
          </p>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            Public Missed Check-ins
          </h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-hidden">
            <div className="animate-scroll whitespace-nowrap">
              {missedUsers.join(' • ')} • {missedUsers.join(' • ')}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Names of users who haven't checked in appear here
          </p>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
