import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import './tailwind.css';

// Pages
import HomePage from './pages/HomePage';
import ActivityPage from './pages/ActivityPage';
import CategoryPage from './pages/CategoryPage';
import NotFoundPage from './pages/NotFoundPage';

// Context
import { ActivityProvider } from './context/ActivityContext';
import { CategoryProvider } from './context/CategoryContext';

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Components
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';

function App() {
  return (
    <ErrorBoundary>
      <ActivityProvider>
        <CategoryProvider>
          <Router>
            <div className="app min-h-screen flex flex-col">
              <Header />
              <main className="main-content flex-grow container mx-auto px-4 py-8">
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/activities" element={<ActivityPage />} />
                    <Route path="/categories" element={<CategoryPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </Router>
        </CategoryProvider>
      </ActivityProvider>
    </ErrorBoundary>
  );
}

export default App;