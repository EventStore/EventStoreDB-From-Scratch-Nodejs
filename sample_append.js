// import the client library and jsonEvent 
import { EventStoreDBClient } from "@eventstore/db-client";
import { jsonEvent } from '@eventstore/db-client';

// Create a connection
const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

// Write to a stream called "SampleStream"
// an event of type "SampleEventType"
// with the data payload of "event"
// will be written to the local eventstoredb instance
// connect to the webui at http://127.0.0.1:2113/
// open up the stream browser and view the "SampleStream" stream
// You should see some content there

const eventType = "SampleEventType"
const event = jsonEvent({
  type: eventType,
  data: {
    "id":"100", "importantData":"some value"
  },
});

const eventStream = "SampleStream";
await client.appendToStream(eventStream, event);

console.log("************************");
console.log("🎉 Congratulations, you have written an event!");
console.log("Stream: " + eventStream);
console.log("Event Type: " + eventType);
console.log("Event Body: {\"id\":\"1\",\"importantData\":\"some value\"}");
console.log("************************");

client.dispose();