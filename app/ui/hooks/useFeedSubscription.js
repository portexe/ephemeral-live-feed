import { useEffect, useState } from "react";

import { createConsumer } from "@rails/actioncable";

export function useFeedSubscription(clientId) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!clientId) return;

    const consumer = createConsumer(
      `ws://localhost:5100/cable?client=${clientId}`
    );

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
  }, [clientId]);

  return messages;
}
