import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Projects from './pages/Projects';
import Team from './pages/Team';
import Settings from './pages/Settings';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('Dashboard');

  return (
    <Router>
      <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            pageTitle={currentPage}
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          />

          <main className="flex-1 overflow-auto bg-gray-900 px-8 py-6">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {setCurrentPage('Dashboard')}
                    <Dashboard />
                  </>
                }
              />
              <Route
                path="/analytics"
                element={
                  <>
                    {setCurrentPage('Analytics')}
                    <Analytics />
                  </>
                }
              />
              <Route
                path="/projects"
                element={
                  <>
                    {setCurrentPage('Projects')}
                    <Projects />
                  </>
                }
              />
              <Route
                path="/team"
                element={
                  <>
                    {setCurrentPage('Team')}
                    <Team />
                  </>
                }
              />
              <Route
                path="/settings"
                element={
                  <>
                    {setCurrentPage('Settings')}
                    <Settings />
                  </>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
