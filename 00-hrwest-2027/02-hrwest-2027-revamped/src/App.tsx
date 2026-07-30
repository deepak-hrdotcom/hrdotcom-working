import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { SpeakersPage } from './pages/SpeakersPage';
import { AgendaPage } from './pages/AgendaPage';
import { SponsorHallPage } from './pages/SponsorHallPage';
import { WhySponsorPage } from './pages/WhySponsorPage';
import { TeamAttendPage } from './pages/TeamAttendPage';
import { ConvinceBossPage } from './pages/ConvinceBossPage';
import { LocationPage } from './pages/LocationPage';
import { VolunteerPage } from './pages/VolunteerPage';
import { RegisterPage } from './pages/RegisterPage';
import { TestimonialsPage } from './pages/TestimonialsPage';

export const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/speakers" element={<SpeakersPage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/sponsors" element={<SponsorHallPage />} />
          <Route path="/sponsor" element={<WhySponsorPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/attend/team" element={<TeamAttendPage />} />
          <Route path="/attend/convince-boss" element={<ConvinceBossPage />} />
          <Route path="/attend/location" element={<LocationPage />} />
          <Route path="/attend/volunteer" element={<VolunteerPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
