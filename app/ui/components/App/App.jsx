import React, { useState } from "react";

import { TopicsForm, Feed } from "../";

export function App() {
  const [topicsFormSubmitted, setTopicsFormSubmitted] = useState(false);

  return (
    <main>
      {topicsFormSubmitted ? (
        <Feed />
      ) : (
        <TopicsForm onSubmitComplete={() => setTopicsFormSubmitted(true)} />
      )}
    </main>
  );
}
