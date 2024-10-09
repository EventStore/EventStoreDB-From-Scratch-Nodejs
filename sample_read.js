import { BACKWARDS, EventStoreDBClient, FORWARDS, START } from "@eventstore/db-client";

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

// Read events from the SampleStream
const stream_name = "SampleStream";
let events = client.readStream(
  stream_name,
  {
    fromRevision: START,
    direction: FORWARDS,
    maxCount: 20
  }
);

// For each event found in SampleStream
for await (const resolvedEvent of events) {

  // print the string to console output                
  console.log("************************");
  console.log("You have read an event!");
  console.log("Stream: " + resolvedEvent.event?.streamId);
  console.log("Event Type: " + resolvedEvent.event?.type);
  console.log("Event Body: " + JSON.stringify(resolvedEvent.event?.data));
  console.log("************************");

}
client.dispose();