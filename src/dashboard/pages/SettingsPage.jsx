import React, { useState } from 'react';
import { User, Mail, Lock, Bell, Sun, Moon, Shield, Upload, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className }) => (
  <div className={`bg-white/40 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 ${className}`}>
    {children}
  </div>
);

const SettingsInput = ({ icon, ...props }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
      {icon}
    </div>
    <input
      {...props}
      className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
    />
  </div>
);

const ToggleSwitch = ({ label, enabled, setEnabled }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-700">{label}</span>
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${enabled ? 'bg-indigo-600' : 'bg-gray-300'}`}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </button>
  </div>
);

function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    newMessages: true,
    weeklyReports: false,
    securityAlerts: true,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      },
    }),
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 min-h-screen" style={{ backgroundImage: 'linear-gradient(to top right, #e0f2fe, #dbeafe, #ede9fe)' }}>
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Settings</h1>
        <p className="mt-2 text-lg text-gray-600">Manage your account and preferences.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Settings */}
          <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariants}>
            <GlassCard>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><User className="mr-3 text-indigo-500" /> Profile Information</h2>
              <div className="flex items-center space-x-6 mb-8">
                <div className="relative">
                  <img src="https://img.freepik.com/premium-photo/3d-animation-character-cartoon_113255-10704.jpg" alt="Admin" className="w-24 h-24 rounded-full object-cover ring-4 ring-white/80" />
                  <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full shadow-md hover:bg-indigo-700 transition">
                    <Upload size={16} />
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Admin User</h3>
                  <p className="text-gray-600">Administrator</p>
                </div>
              </div>
              <div className="space-y-4">
                <SettingsInput icon={<User size={18} />} type="text" placeholder="Full Name" defaultValue="Admin User" />
                <SettingsInput icon={<Mail size={18} />} type="email" placeholder="Email Address" defaultValue="admin@gmail.com" />
              </div>
            </GlassCard>
          </motion.div>

          {/* Change Password */}
          <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants}>
            <GlassCard>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><Lock className="mr-3 text-red-500" /> Change Password</h2>
              <div className="space-y-4">
                <SettingsInput icon={<Lock size={18} />} type="password" placeholder="Current Password" />
                <SettingsInput icon={<Lock size={18} />} type="password" placeholder="New Password" />
                <SettingsInput icon={<Lock size={18} />} type="password" placeholder="Confirm New Password" />
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-8">
          {/* Interface Settings */}
          <motion.div custom={2} initial="hidden" animate="visible" variants={cardVariants}>
            <GlassCard>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                {isDarkMode ? <Moon className="mr-3 text-indigo-500" /> : <Sun className="mr-3 text-yellow-500" />}
                Interface
              </h2>
              <ToggleSwitch label="Dark Mode" enabled={isDarkMode} setEnabled={setIsDarkMode} />
            </GlassCard>
          </motion.div>

          {/* Notification Settings */}
          <motion.div custom={3} initial="hidden" animate="visible" variants={cardVariants}>
            <GlassCard>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><Bell className="mr-3 text-green-500" /> Notifications</h2>
              <div className="space-y-4">
                <ToggleSwitch
                  label="New Messages"
                  enabled={notifications.newMessages}
                  setEnabled={() => setNotifications(p => ({ ...p, newMessages: !p.newMessages }))}
                />
                <ToggleSwitch
                  label="Weekly Reports"
                  enabled={notifications.weeklyReports}
                  setEnabled={() => setNotifications(p => ({ ...p, weeklyReports: !p.weeklyReports }))}
                />
                <ToggleSwitch
                  label="Security Alerts"
                  enabled={notifications.securityAlerts}
                  setEnabled={() => setNotifications(p => ({ ...p, securityAlerts: !p.securityAlerts }))}
                />
              </div>
            </GlassCard>
          </motion.div>

          {/* Security Settings */}
          <motion.div custom={4} initial="hidden" animate="visible" variants={cardVariants}>
            <GlassCard>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><Shield className="mr-3 text-blue-500" /> Security</h2>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600">Status: Disabled</p>
                </div>
                <button className="px-4 py-2 text-sm font-semibold bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition">
                  Enable
                </button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-12 flex justify-end"
      >
        <button className="flex items-center space-x-2 px-8 py-3 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105">
          <Save size={20} />
          <span>Save All Changes</span>
        </button>
      </motion.div>
    </div>
  );
}

export default SettingsPage;
