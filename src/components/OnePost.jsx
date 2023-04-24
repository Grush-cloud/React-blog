// src/components/OnePost.js

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import "../App.css";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

export default function OnePost() {
  const [postData, setPostData] = useState(null);
  const [publishedAt, setPublishedAt] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    client
      .fetch(
        `*[slug.current == $slug]{
          title,
          slug,
          mainImage{
            asset->{
              _id,
              url
             }
           },
         body,
        "name": author->name,
        "authorImage": author->image,
        "bio": author->bio,
        publishedAt,
       
      
        
       }`,
        { slug }
      )
      .then((data) => {
        setPostData(data[0]);
        setPublishedAt(data[0].publishedAt); // set the publishedAt state variable
      })
      .catch(console.error);
  }, [slug]);

  if (!postData) return <div className="spinner"></div>;

  return (
    <>
      <header className="onepost-header">
        <h2 className="onepost-title">{postData.title}</h2>
        <p className="onepost-date">
          {`Published on:
           ${publishedAt && new Date(publishedAt).toLocaleDateString()}`}
        </p>
      </header>

      <div className="onepost">
        <div className="onepost-ctn">
          <div className="onepost-body">
            <BlockContent
              blocks={postData.body}
              projectId={client.projectId}
              dataset={client.dataset}
            />
          </div>
        </div>
      </div>
      <div className="author-section">
        <h3>About Author</h3>
        <div className="author-card">
          <div className="author">
            <h2 className="author-name">{postData.name}</h2>
            <img
              src={urlFor(postData.authorImage).url()}
              className="author-img"
            />
            <div className="author-bio">
              <BlockContent
                blocks={postData.bio}
                projectId={client.projectId}
                dataset={client.dataset}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
