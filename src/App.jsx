import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LangProvider } from './i18n/LangContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

const Business = lazy(() => import('./pages/Business'));
const Challenges = lazy(() => import('./pages/Challenges'));
const Startups = lazy(() => import('./pages/Startups'));
const Infrastructure = lazy(() => import('./pages/Infrastructure'));
const Investors = lazy(() => import('./pages/Investors'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Directions = lazy(() => import('./pages/Directions'));
const Direction = lazy(() => import('./pages/Direction'));
const InnoX = lazy(() => import('./pages/InnoX'));

export default function App() {
  // gh
  return (
    <HelmetProvider>
      {/* Helkll= */}
      <LangProvider>
        <BrowserRouter>
          <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="biznes" element={<Business />} />
                <Route path="muammolar" element={<Challenges />} />
                <Route path="startaplar" element={<Startups />} />
                <Route path="infratuzilma" element={<Infrastructure />} />
                <Route path="investorlar" element={<Investors />} />
                <Route path="haqida" element={<About />} />
                <Route path="yonalishlar" element={<Directions />} />
                <Route path="yonalishlar/:slug" element={<Direction />} />
                <Route path="malumotlar-banki" element={<Navigate to="/yonalishlar#taqvim" replace />} />
                <Route path="innox" element={<InnoX />} />
                <Route path="*" element={<NotFound />} />
              </Route>
          </Routes>
        </BrowserRouter>
      </LangProvider>
    </HelmetProvider>
  );
}
