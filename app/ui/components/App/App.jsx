import React, { useEffect } from "react";

import { createConsumer } from "@rails/actioncable";

const consumer = createConsumer("ws://localhost:5100/cable");

export function App() {
  useEffect(() => {
    consumer.subscriptions.create(
      { channel: "FeedChannel" },
      {
        connected: () => {
          console.log("Connected");
        },

        received: (data) => {
          console.log("Data: ", data);
        },
      }
    );
  }, []);

  return <div>Hello, from React!</div>;
}
