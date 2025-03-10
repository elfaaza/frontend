import { useEffect } from 'react';
import './App.css';
import { Route, Routes, Outlet, useLocation } from 'react-router-dom';
import { Home, Blogs, Recipe, Event, Login, Register, DetailRecipe, DetailBlog, DetailEvent, CreateRecipe, UpdateRecipe, CreateEvent } from './Pages';
import ContentRoutes from './Routes/ContentRoutes';
import PrivaRoutes from './Routes/PrivaRoutes';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <Outlet />;
}

function App() {
  return (
    <Routes>
      <Route element={<ScrollToTop />}>
        <Route element={<PrivaRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ContentRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<DetailBlog />} />
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/recipe/create" element={<CreateRecipe />} />
          <Route path="/event/create" element={<CreateEvent />} />
          <Route path="/event" element={<Event />} />
          <Route path="/event/:id" element={<DetailEvent />} />
          <Route path="/recipe/:id" element={<DetailRecipe />} />
          <Route path="/recipe/edit/:id" element={<UpdateRecipe />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;