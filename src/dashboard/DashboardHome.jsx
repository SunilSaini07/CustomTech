import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight, TrendingUp, Mail, Zap, Users, BarChart2 } from 'lucide-react'; 
import { Link } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// --- 1. Reusable Glass Container (The unique element) ---
const GlassContainer = ({ children, className }) => (
  <div
    className={`
      bg-white/40 backdrop-blur-md rounded-3xl p-8 
      shadow-xl shadow-gray-200 border border-white/50
      ${className || ''}
    `}
  >
    {children}
  </div>
);

// --- 2. Live Clock Component ---
const LiveClock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };

    const formattedTime = currentTime.toLocaleTimeString('en-US', timeOptions);
    const formattedDate = currentTime.toLocaleDateString('en-US', dateOptions);

    return (
        <div className="flex items-center space-x-3 text-lg font-semibold text-indigo-700">
            <Clock className="w-5 h-5 text-indigo-500" />
            <span>{formattedTime}</span>
            <span className="text-gray-500 font-normal">| {formattedDate}</span>
        </div>
    );
};


// --- 3. Main Dashboard Component ---
function DashboardHome() {
  const [recentMessages, setRecentMessages] = useState([]);
  const [stats, setStats] = useState({ visitors: 0, messages: 0 });
  const [loading, setLoading] = useState(true);

  const initialActivity = [];
    
  const [lastActivity, setLastActivity] = useState([
    { id: 1, action: "Admin Panel login successful", time: "Just now", color: "text-green-500" },
    { id: 2, action: "Database backup initiated", time: "15 mins ago", color: "text-indigo-500" },
    { id: 3, action: "Configuration files updated", time: "2 hours ago", color: "text-red-500" },
  ]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://customtectlab-backend.up.railway.app/api/contacts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const messages = await response.json();
        // Sort messages by ID descending to get the latest ones and take the top 3
        const sortedMessages = messages.sort((a, b) => b.msgid - a.msgid);
        setRecentMessages(sortedMessages.slice(0, 3));
        setStats({ visitors: Math.floor(Math.random() * 500) + 100, messages: messages.length }); // Mock visitors
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setRecentMessages(initialActivity); // Fallback to initial data on error
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Simulate a live activity update
    const activityInterval = setInterval(() => {
        setLastActivity(prev => [{ id: Date.now(), action: "Admin Panel login successful", time: "Just now" }, ...prev.slice(0, 4)]);
    }, 30000); // Every 30 seconds

    return () => clearInterval(activityInterval);
  }, []);

  // --- Mock Data for Charts ---
  const visitorData = [
    { name: 'Mon', visitors: 410 },
    { name: 'Tue', visitors: 520 },
    { name: 'Wed', visitors: 380 },
    { name: 'Thu', visitors: 610 },
    { name: 'Fri', visitors: 790 },
    { name: 'Sat', visitors: 950 },
    { name: 'Sun', visitors: 820 },
  ];

  const messageInflowData = [
    { name: 'Jan', messages: 21 },
    { name: 'Feb', messages: 35 },
    { name: 'Mar', messages: 28 },
    { name: 'Apr', messages: 45 },
    { name: 'May', messages: 51 },
    { name: 'Jun', messages: 62 },
    { name: 'Jul', messages: 20 },
    { name: 'Aug', messages: 40 },
    { name: 'Oct', messages: 50 },
    { name: 'Nov', messages: 62 },
    { name: 'Dec', messages: stats.messages }, // Use live data for current month
  ];


  return (
    // Unique Background Gradient for Glassmorphism
    <div className="min-h-screen p-10" style={{ backgroundImage: 'linear-gradient(to top right, #e0f2fe, #dbeafe, #ede9fe)' }}>
      
      {/* 1. Header Section - Welcome Message, Live Time, Go to Live Button */}
      <header className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl shadow-indigo-100 border border-white/70">
        
        {/* Welcome and Time */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-wider">
            Welcome Back, <span className="text-indigo-600">Admin</span>!
          </h1>
          <p className="text-gray-600 mt-1">Your control center awaits.</p>
          <LiveClock />
        </div>

        {/* Action Button */}
        <Link to="/" target="_blank" rel="noopener noreferrer">
            <button className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.05]">
            <span>Go to Live Site</span>
            <ArrowRight className="w-5 h-5" />
            </button>
        </Link>
      </header>

      {/* Main Content Area (Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Charts) - Takes 2/3 width */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassContainer>
                <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center"><Users className="w-5 h-5 mr-2 text-indigo-500"/> Total Visitors</h3>
                {loading ? <div className="h-10 bg-gray-200 rounded animate-pulse"></div> : <p className="text-4xl font-bold text-gray-900">{stats.visitors}</p>}
                <p className="text-sm text-green-600 mt-1">+5.2% this month</p>
            </GlassContainer>
            <GlassContainer>
                <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center"><Mail className="w-5 h-5 mr-2 text-green-500"/> Total Messages</h3>
                {loading ? <div className="h-10 bg-gray-200 rounded animate-pulse"></div> : <p className="text-4xl font-bold text-gray-900">{stats.messages}</p>}
                <Link to="/admin/users-messages" className="text-sm text-indigo-600 hover:underline mt-1 inline-block">View all messages</Link>
            </GlassContainer>
          </div>

          {/* 2. Visitors Chart (Unique, Multi-Period Selector) */}
          <GlassContainer>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b border-indigo-200/50 pb-3 flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-indigo-500" />
                <span>Website Visitor Analysis</span>
            </h3>
            
            {/* Period Selector */}
            <div className="flex space-x-4 mb-4 text-sm font-medium">
                {['Today', 'Last 7 Days', 'Last 17 Days', 'Last Month'].map(period => (
                    <button 
                        key={period} 
                        className={`px-4 py-1 rounded-full transition duration-150 ${period === 'Last 7 Days' ? 'bg-indigo-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-indigo-50'}`}
                    >
                        {period}
                    </button>
                ))}
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitorData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                  <XAxis dataKey="name" stroke="#6366f1" fontSize={12} />
                  <YAxis stroke="#6366f1" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)', borderRadius: '10px', border: '1px solid #e0e7ff' }} />
                  <Legend wrapperStyle={{ fontSize: '14px' }} />
                  <Line type="monotone" dataKey="visitors" name="Unique Visitors" stroke="#4f46e5" strokeWidth={3} activeDot={{ r: 8 }} dot={{ fill: '#818cf8' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassContainer>

          {/* 3. Messages Received Chart */}
          <GlassContainer>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b border-indigo-200/50 pb-3 flex items-center space-x-2">
                <BarChart2 className="w-6 h-6 text-green-500" />
                <span>User Message Inflow</span>
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={messageInflowData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#dcfce7" />
                  <XAxis dataKey="name" stroke="#16a34a" fontSize={12} />
                  <YAxis stroke="#16a34a" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)', borderRadius: '10px', border: '1px solid #dcfce7' }} cursor={{fill: 'rgba(34, 197, 94, 0.1)'}} />
                  <Bar dataKey="messages" name="Messages Received" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassContainer>

        </div>
        
        {/* Right Column (Activity & Messages) - Takes 1/3 width */}
        <div className="lg:col-span-1 space-y-8">
            
            {/* 4. Last Activity Box */}
            <GlassContainer className="h-auto">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-300/50 pb-3 flex items-center space-x-2">
                    <Zap className="w-6 h-6 text-red-500" />
                    <span>Last System Activity</span>
                </h3>
                <ul className="space-y-4">
                    {lastActivity.map(item => (
                        <li key={item.id} className="flex flex-col p-3 rounded-xl bg-white/70 hover:bg-white/90 transition duration-150 border-l-4 border-red-400">
                            <span className="text-sm font-medium text-gray-800">{item.action}</span>
                            <span className="text-xs text-gray-500 mt-1">{item.time}</span>
                        </li>
                    ))}
                </ul>
            </GlassContainer>
            
            {/* 5. Recent Messages Card Box */}
            <GlassContainer className="h-auto">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-300/50 pb-3 flex justify-between items-center">
                    <span>Recent Messages</span>
                    <Link to="/admin/users-messages" className="text-sm text-indigo-500 font-semibold cursor-pointer hover:underline">View All</Link>
                </h3>
                <ul className="space-y-3">
                    {loading ? (
                        [...Array(3)].map((_, i) => (
                            <li key={i} className="p-4 rounded-xl bg-white/80 animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                            </li>
                        ))
                    ) : (
                        recentMessages.map(msg => (
                            <li key={msg.msgid} className="flex flex-col p-4 rounded-xl bg-white/80 hover:bg-white/95 transition duration-150 cursor-pointer shadow-sm">
                                <span className="text-base font-semibold text-gray-800">{msg.fullname}</span>
                                <span className="text-sm text-gray-600 truncate">{msg.message}</span>
                            </li>
                        ))
                    )}
                </ul>
            </GlassContainer>
        </div>
      </div>
      
      {/* Footer-like element */}
      <footer className="mt-16 text-center text-gray-600 text-sm opacity-70">
        Admin Panel v3.0 | Modern Glass UI
      </footer>
    </div>
  );
}

export default DashboardHome;