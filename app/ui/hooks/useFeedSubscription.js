import { useEffect, useState } from "react";

import { createConsumer } from "@rails/actioncable";

export function useFeedSubscription() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const consumer = createConsumer(`ws://localhost:5100/cable`);

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
