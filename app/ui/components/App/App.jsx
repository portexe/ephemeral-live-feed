import React, { useEffect, useState } from "react";

import { TopicsForm, Feed } from "../";
import { authenticatedFetch } from "../../utilities/fetch";

import styles from "./styles.module.css";

export function App() {
  const [loaded, setLoaded] = useState(false);
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    authenticatedFetch({
      url: "/api/get_user_topics",
    })
      .then(({ topics }) => {
        setTopics(topics);
        setError("");
        setLoaded(true);
      })
      .catch(() => {
        setError("Something went wrong. Please refresh and try again.");
        setLoaded(true);
      });
  }, []);

  if (!loaded) return <main>Loading...</main>;

  return (
    <main>
      {topics.length ? (
        <Feed />
      ) : (
        <TopicsForm onSubmitComplete={(topics) => setTopics(topics)} />
      )}

      {error && <div className={styles.error}>{error}</div>}
    </main>
  );
}
