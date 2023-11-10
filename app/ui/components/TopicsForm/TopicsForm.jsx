import React, { useState } from "react";

import styles from "./styles.module.css";
import { authenticatedFetch } from "../../utilities/fetch";

export function TopicsForm({ onSubmitComplete }) {
  const [error, setError] = useState("");

  async function submitTopics(topicCheckboxes) {
    const allChecked = Array.from(topicCheckboxes).filter(
      (checkbox) => checkbox.checked
    );

    const namesOnly = allChecked.map((checkbox) => checkbox.name);

    if (namesOnly.length) {
      try {
        const apiResponse = await authenticatedFetch({
          method: "POST",
          url: "http://localhost:5100/api/select_topics",
          body: JSON.stringify({
            topics: namesOnly,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        setError("");

        onSubmitComplete(apiResponse.session_id);
      } catch (error) {
        console.error(error);
        setError("Server error");
      }
    } else {
      setError("At least 1 must be selected");
    }
  }

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
          <input type="checkbox" name="games" />
          Games
        </label>

        <label>
          <input type="checkbox" name="music" />
          Music
        </label>

        <label>
          <input type="checkbox" name="movies" />
          Movies
        </label>

        <label>
          <input type="checkbox" name="Books" />
          Books
        </label>

        <button type="submit">Submit</button>

        {error && <div className={styles.error}>{error}</div>}
      </form>
    </>
  );
}
