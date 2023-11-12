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
        setTopics(topics.map((each) => each.name));
        setError("");
        setLoaded(true);
      })
      .catch(() => {
        setError("Something went wrong. Please refresh and try again.");
        setLoaded(true);
      });
  }, []);

  function logOut() {
    authenticatedFetch({
      method: "POST",
      url: "/api/log_out",
    }).then(() => {
      window.location.href = "/users/sign_in";
    });
  }

  if (!loaded) return <main>Loading...</main>;

  return (
    <main>
      <button onClick={logOut}>Log out</button>

      <TopicsForm
        topicsSelected={topics}
        onSubmitComplete={(topics) => setTopics(topics)}
      />

      {!!topics.length && <Feed />}

      {error && <div className={styles.error}>{error}</div>}
    </main>
  );
}
