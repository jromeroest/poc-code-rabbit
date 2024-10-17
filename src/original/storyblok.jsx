// pages/index.js

import { useState, useEffect } from "react";
import StoryblokClient from "storyblok-js-client";
import Link from "next/link";

const Storyblok = new StoryblokClient({
  accessToken: "your-token-here",
});

const HomePage = () => {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Storyblok.get("cdn/stories/home", {})
      .then((response) => {
        setStory(response.data.story);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const renderContent = (content) => {
    return content.map((blok, index) => {
      if (blok.component === "text") {
        return <p key={index}>{blok.content}</p>;
      }
      if (blok.component === "image") {
        return <img key={index} src={blok.image} alt={blok.alt} />;
      }
      return null;
    });
  };

  return (
    <div
      style={{
        padding: "50px",
        backgroundColor: "#f0f0f0",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ color: "blue", fontSize: "36px", textAlign: "center" }}>
        Welcome to the Storyblok + Next.js Page
      </h1>

      <div>
        <Link href="/about">
          <a>About Us</a>
        </Link>
        <br />
        <Link href="/contact">
          <a>Contact</a>
        </Link>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error loading the story!</p>}

      {story && (
        <div>
          <h2>{story.name}</h2>
          {renderContent(story.content.body)}
        </div>
      )}

      <footer
        style={{
          padding: "20px",
          backgroundColor: "black",
          color: "white",
          marginTop: "50px",
        }}
      >
        <p>This is a messy footer</p>
        <p>All rights reserved. 2024</p>
      </footer>
    </div>
  );
};

export default HomePage;
