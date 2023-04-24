// src/App.js

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllPosts from "./components/AllPosts";
import OnePost from "./components/OnePost";

import Footer from "./components/Footer";
function App() {
  const router = createBrowserRouter([
    {
      path: "/React-blog",
      element: (
        <div>
          <AllPosts />

          <Footer />
        </div>
      ),
    },
    {
      path: "/React-blog/:slug",
      element: (
        <div>
          <OnePost />

          <Footer />
        </div>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
