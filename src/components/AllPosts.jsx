import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../client.js";
import "../App.css";

export default function AllPosts() {
  const [allPostsData, setAllPosts] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"]{
        title,
        slug,
        mainImage{
          asset->{
          _id,
          url
        }
      }
    }`
      )
      .then((data) => {
        setAllPosts(data);
        setFilteredPosts(data);
      })
      .catch(console.error);
  }, []);

  function search(e) {
    const query = e.target.value.toLowerCase();
    const filtered = allPostsData.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
    setFilteredPosts(filtered);
  }

  return (
    <div className="blog">
      <h2 className="blog-title">Blog Posts</h2>
      <h3 className="blog-subtitle">Welcome to my blog posts page!</h3>
      <div className="blog-search">
        <input
          placeholder="type title here"
          onChange={search}
          className="blog-search"
          type="search"
        />
      </div>

      <div className="allposts">
        {filteredPosts &&
          filteredPosts.map((post, index) => (
            <Link
              to={"/React-blog-app/" + post.slug.current}
              key={post.slug.current}
              className="allposts-card"
            >
              <span key={index}>
                <img
                  src={post.mainImage.asset.url}
                  alt=""
                  className="allposts-img"
                />
                <span className="allposts-title-border">
                  <h2 className="allposts-title">{post.title}</h2>
                </span>
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}
