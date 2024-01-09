import { Navigate, Route, Routes } from 'react-router-dom';

import { Navbar } from '../../ui';
import { Dc, Hero, Marvel, Search } from '../pages';

export const HeroesRoutes = () => {
  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Marvel />} />
          <Route path="marvel" element={<Marvel />} />
          <Route path="dc" element={<Dc />} />

          <Route path="search" element={<Search />} />
          <Route path="hero/:id" element={<Hero />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
};
