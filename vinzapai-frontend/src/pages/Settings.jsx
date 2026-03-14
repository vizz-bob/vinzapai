import React from 'react';
import { Settings as SettingsIcon, ExternalLink } from 'lucide-react';

function Settings() {
  return (
    <div className="space-y-8 max-w-4xl">
      {/* App Information */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <SettingsIcon size={28} className="text-indigo-400" />
          Application Settings
        </h2>

        <div className="space-y-6">
          {/* Version Info */}
          <div className="pb-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Version Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <p className="text-gray-400 text-sm mb-2">Application Version</p>
                <p className="text-2xl font-bold text-white">1.0.0</p>
                <p className="text-gray-500 text-xs mt-2">Latest: 1.0.0</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <p className="text-gray-400 text-sm mb-2">Last Updated</p>
                <p className="text-lg font-semibold text-white">March 2025</p>
                <p className="text-gray-500 text-xs mt-2">All systems up to date</p>
              </div>
            </div>
          </div>

          {/* System Info */}
          <div className="pb-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold mb-4">System Information</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                <span className="text-gray-300">Platform</span>
                <span className="font-semibold text-white">Windows / macOS / Linux</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                <span className="text-gray-300">Architecture</span>
                <span className="font-semibold text-white">x64</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                <span className="text-gray-300">Database</span>
                <span className="font-semibold text-white">SQLite3</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                <span className="text-gray-300">API Status</span>
                <span className="font-semibold text-green-400">Connected</span>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="pb-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Technology Stack</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-indigo-400 mb-3">Backend</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Django 5.2</li>
                  <li>Django REST Framework</li>
                  <li>Waitress</li>
                  <li>SQLite3</li>
                </ul>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-purple-400 mb-3">Frontend</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>React 19</li>
                  <li>Tailwind CSS</li>
                  <li>Recharts</li>
                  <li>Lucide React</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Admin Panel Access */}
          <div className="pb-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Administration</h3>
            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-lg p-6">
              <p className="text-gray-300 mb-4">Access the full Django admin panel to manage application data and system settings.</p>
              <a
                href="/admin/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/20"
              >
                <span>Open Admin Panel</span>
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* API Documentation */}
          <div className="pb-6">
            <h3 className="text-lg font-semibold mb-4">API Documentation</h3>
            <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
              <p className="text-gray-300 mb-4">VinzapAI provides a comprehensive REST API for integration with third-party applications.</p>
              <div className="space-y-3 text-sm text-gray-300 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-indigo-400">▸</span>
                  <span><strong>Base URL:</strong> http://127.0.0.1:8000/api/</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-indigo-400">▸</span>
                  <span><strong>Authentication:</strong> Session + Basic Auth</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-indigo-400">▸</span>
                  <span><strong>Format:</strong> JSON</span>
                </div>
              </div>
              <details className="bg-gray-600/50 rounded p-3">
                <summary className="cursor-pointer font-medium text-indigo-400">Available Endpoints</summary>
                <div className="mt-3 space-y-2 text-xs text-gray-300">
                  <p>/api/metrics/ - KPI Metrics</p>
                  <p>/api/activities/ - Activity Logs</p>
                  <p>/api/insights/ - AI Insights</p>
                  <p>/api/revenue/ - Revenue Data</p>
                  <p>/api/user-growth/ - User Growth Analytics</p>
                  <p>/api/traffic-sources/ - Traffic Source Data</p>
                  <p>/api/projects/ - Project Management</p>
                  <p>/api/team/ - Team Members</p>
                </div>
              </details>
            </div>
          </div>

          {/* Support */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Support & Resources</h3>
            <div className="space-y-3">
              <p className="text-gray-300">For issues, feature requests, or documentation:</p>
              <a
                href="https://github.com/yourusername/vinzapai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium"
              >
                <span>GitHub Repository</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
