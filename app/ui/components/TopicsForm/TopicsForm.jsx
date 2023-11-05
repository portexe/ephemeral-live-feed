import React, { useState } from "react";

import styles from "./styles.module.css";

export function TopicsForm({ onSubmitComplete }) {
  const [error, setError] = useState("");

  async function submitTopics(topicCheckboxes) {
    const allChecked = Array.from(topicCheckboxes).filter(
      (checkbox) => checkbox.checked
    );

    const namesOnly = allChecked.map((checkbox) => checkbox.name);

    if (namesOnly.length) {
      try {
        const apiResponse = await fetch(
          "http://localhost:5100/api/select_topics",
          {
            method: "POST",
            body: JSON.stringify({
              topics: namesOnly,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => res.json());

        setError(apiResponse.error || "");

        if (!apiResponse.error) {
          onSubmitComplete();
        }
      } catch (error) {
        setError("Server error. Please try again soon.");
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
          <input type="checkbox" name="general" />
          General
        </label>

        <label>
          <input type="checkbox" name="food" />
          Food
        </label>

        <label>
          <input type="checkbox" name="music" />
          Music
        </label>

        <label>
          <input type="checkbox" name="movies" />
          Movies & TV
        </label>

        <label>
          <input type="checkbox" name="tech" />
          Tech
        </label>

        <button type="submit">Submit</button>

        {error && <div className={styles.error}>{error}</div>}
      </form>
    </>
  );
}
