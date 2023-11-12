import React, { useState } from "react";

import styles from "./styles.module.css";
import { authenticatedFetch } from "../../utilities/fetch";

export function TopicsForm({ onSubmitComplete, topicsSelected }) {
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(topicsSelected);

  async function submitTopics(topicCheckboxes) {
    const allChecked = Array.from(topicCheckboxes).filter(
      (checkbox) => checkbox.checked
    );

    const namesOnly = allChecked.map((checkbox) => checkbox.name);

    if (namesOnly.length) {
      try {
        const apiResponse = await authenticatedFetch({
          method: "POST",
          url: "/api/select_topics",
          body: JSON.stringify({
            topics: namesOnly,
          }),
          headers: {},
        });

        setError("");

        onSubmitComplete(apiResponse.topics);
      } catch (error) {
        console.error(error);
        setError("Server error");
      }
    } else {
      setError("At least 1 must be selected");
    }
  }

  function updateTopicsSelected(topic) {
    const alreadyChecked = selected.includes(topic);

    if (alreadyChecked) {
      setSelected((s) => s.filter((item) => item !== topic));
    } else {
      setSelected((s) => [...s, topic]);
    }
  }

  console.log(topicsSelected);

  return (
    <>
      <h1>Select from the following topics:</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitTopics(e.target);
        }}
      >
        <label>
          <input
            type="checkbox"
            name="games"
            checked={selected.includes("games")}
            onChange={() => updateTopicsSelected("games")}
          />
          Games
        </label>

        <label>
          <input
            type="checkbox"
            name="music"
            checked={selected.includes("music")}
            onChange={() => updateTopicsSelected("music")}
          />
          Music
        </label>

        <label>
          <input
            type="checkbox"
            name="movies"
            checked={selected.includes("movies")}
            onChange={() => updateTopicsSelected("movies")}
          />
          Movies
        </label>

        <label>
          <input
            type="checkbox"
            name="books"
            checked={selected.includes("books")}
            onChange={() => updateTopicsSelected("books")}
          />
          Books
        </label>

        <button type="submit">Submit</button>

        {error && <div className={styles.error}>{error}</div>}
      </form>
    </>
  );
}
