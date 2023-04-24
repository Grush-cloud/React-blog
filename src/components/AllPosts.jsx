import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../client.js";
import "../App.css";

export default function AllPosts() {
  const [allPostsData, setAllPosts] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchBar, setSearchBar] = useState("");

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
    setSearchBar(e.target.value);
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
      <div className="blog-search-container">
        <input
          placeholder="type title here"
          onChange={search}
          className={searchBar ? "blog-search-inactive" : "blog-search-active"}
          type="search"
        />
      </div>

      <div className="allposts">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <Link
              to={"/React-blog/" + post.slug.current}
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
          ))
        ) : (
          <div>
            <h3>{`No results for "${searchBar}"`}</h3>
            <p>Search Help</p>
            <ul>
              <li>Please check for any typos in your search query.</li>
              <li>
                Please ensure that the search term matches the title of a blog
                post.
              </li>
              <li>
                The blog post you are trying to access may have been deleted.
              </li>
              <li>Please ensure that there are no misplaced spaces.</li>
              <li>Ensure you have internet connection</li>
              <li>Contact this...for further help.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
