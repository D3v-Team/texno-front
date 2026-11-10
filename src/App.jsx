import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

export default function App() {
  return (
    <HelmetProvider>
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
                <Route path="*" element={<NotFound />} />
              </Route>
          </Routes>
        </BrowserRouter>
      </LangProvider>
    </HelmetProvider>
  );
}
