import { useEffect, useState } from "react";

import { createConsumer } from "@rails/actioncable";

const consumer = createConsumer("ws://localhost:5100/cable");

export function useFeedSubscription() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    consumer.subscriptions.create(
      { channel: "FeedChannel" },
      {
        connected: () => {
          console.log("Connected");
        },

        received: (data) => {
          if (!data?.body) return;
          setMessages((m) => [...m, data.body]);
        },
      }
    );
  }, []);

  return messages;
}
