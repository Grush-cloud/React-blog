// src/App.js

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllPosts from "./components/AllPosts";
import OnePost from "./components/OnePost";
import Author from "./components/author";
function App() {
  const router = createBrowserRouter([
    {
      path: "/React-blog-app",
      element: (
        <div>
          <AllPosts />
          <Author />
        </div>
      ),
    },
    {
      path: "/React-blog-app/:slug",
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
