import React, { useState } from "react";

import { useFeedSubscription } from "../../hooks";
import { TopicsForm, Feed } from "../";

export function App() {
  const [topicsFormSubmitted, setTopicsFormSubmitted] = useState(false);

  const messages = useFeedSubscription();

  return (
    <main>
      {topicsFormSubmitted ? (
        <Feed messages={messages} />
      ) : (
        <TopicsForm onSubmitComplete={() => setTopicsFormSubmitted(true)} />
      )}
    </main>
  );
}
