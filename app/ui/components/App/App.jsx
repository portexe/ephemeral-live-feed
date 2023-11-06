import React, { useState } from "react";

import { TopicsForm, Feed } from "../";

export function App() {
  const [clientId, setClientId] = useState("");

  return (
    <main>
      {clientId ? (
        <Feed clientId={clientId} />
      ) : (
        <TopicsForm onSubmitComplete={(clientId) => setClientId(clientId)} />
      )}
    </main>
  );
}
