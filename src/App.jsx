// src/App.js

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllPosts from "./components/AllPosts";
import OnePost from "./components/OnePost";
import Author from "./components/Author";
function App() {
  const router = createBrowserRouter([
    {
      path: "/React-blog",
      element: (
        <div>
          <AllPosts />
          <Author />
        </div>
      ),
    },
    {
      path: "/React-blog/:slug",
      element: (
        <div>
          <OnePost />
          <Author />
        </div>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
