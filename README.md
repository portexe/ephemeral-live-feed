A simple Pub/Sub app made entirely for fun.

# Overview

The idea is very simple and pointless (but fun). A user signs in and selects from 4 topics to listen to. They will be directed to a live feed where they can view messages in real time as they are broadcasted. The feed is ephemeral. So once the user refreshes, all of the messages are gone. In the long term this could be an interesting mechanism to play around with as a unique social media app.

### Backend:

The backend is a Ruby on Rails app that serves up a React UI via `vite-rails`. The backend also serves as an API for the client.

### Frontend

The frontend is a React app using Vite.

### Authentication

As of now the app is using session authentication with Devise. I chose not to go with JWT here just to keep things simple.

### Broadcasting

I am using the `Faker` gem to produce random messages to broadcast to a random topic every 10 seconds.

### Real time messages

The client connects to the server via Web Sockets (`ActionCable`) to subscribe to the appropriate topic channels and receive messages in real time.
