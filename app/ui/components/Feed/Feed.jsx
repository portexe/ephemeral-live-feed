export function Feed({ messages }) {
  console.log(messages);

  return (
    <div>
      <h1>Messages:</h1>

      {messages.map((message) => (
        <div key={message.id}>
          <p>ID: {message.id}</p>
          <p>Message: {message.text}</p>
          <p>Topic: {message.topic}</p>
        </div>
      ))}
    </div>
  );
}
