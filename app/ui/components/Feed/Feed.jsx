export function Feed({ messages }) {
  return (
    <div>
      <h1>Messages:</h1>

      {messages.map((message) => (
        <div key={message.id}>{message.text}</div>
      ))}
    </div>
  );
}
