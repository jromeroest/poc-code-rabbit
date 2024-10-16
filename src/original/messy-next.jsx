import React, { useState, useEffect } from "react";
import Link from "next/link";

const Home = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/data")
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div
      style={{ margin: "20px", padding: "10px", backgroundColor: "lightgray" }}
    >
      <h1 style={{ color: "red", fontFamily: "Comic Sans MS" }}>
        Messy Next.js Page
      </h1>
      <p>{new Date().toLocaleTimeString()}</p>

      <div>
        <button onClick={increaseCount} style={{ marginRight: "10px" }}>
          Increase Count
        </button>
        <button onClick={decreaseCount}>Decrease Count</button>
        <p>Current count is: {count}</p>
      </div>

      <div>
        <h2>Data from API</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>Error loading data.</p>
        ) : (
          <ul>
            {data &&
              data.length > 0 &&
              data.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        )}
      </div>

      <div>
        <h3>Navigation</h3>
        <ul>
          <li>
            <Link href="/about">
              <a>About Page</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a>Contact Page</a>
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h3>Form Example</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Form submitted");
          }}
        >
          <label>First Name:</label>
          <input type="text" name="fname" />
          <br />
          <br />
          <label>Last Name:</label>
          <input type="text" name="lname" />
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>

      <footer
        style={{
          marginTop: "50px",
          backgroundColor: "black",
          color: "white",
          padding: "20px",
        }}
      >
        <p>Footer with unnecessary styles</p>
      </footer>

      <script>console.log('This script is not necessary here');</script>
    </div>
  );
};

export default Home;
