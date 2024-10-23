import { BACKWARDS, EventStoreDBClient, FORWARDS, START } from "@eventstore/db-client";

////////////////////////////////////////////////////////
//
// Step 1. Create client and connect it to EventStoreDB
//
////////////////////////////////////////////////////////

// Create an instance of EventStoreDBClient, connecting to the EventStoreDB at localhost without TLS
const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

///////////////////////////////////////////
//
// Step 2. Read all events from the stream
//
///////////////////////////////////////////

// Read events from the SampleStream
const stream_name = "SampleStream";  // Define the name of the stream to read from
let events = client.readStream(      // Read events from stream
  stream_name,                       // Specify the stream name
  {                                  //
    fromRevision: START,             // Read from the start of the stream
    direction: FORWARDS,             // Read events forward in time
    maxCount: 20                     // Read at most 20 events
  }
);

///////////////////////////////////////
//
// Step 3. Print each event to console
//
///////////////////////////////////////

for await (const resolvedEvent of events) {                                 // For each event found in SampleStream               
  console.log("************************");                                  //
  console.log("You have read an event!");                                   //
  console.log("Stream: " + resolvedEvent.event?.streamId);                  // Print the stream name of the event 
  console.log("Event Type: " + resolvedEvent.event?.type);                  // Print the type of the event
  console.log("Event Body: " + JSON.stringify(resolvedEvent.event?.data));  // Print the body of the event as a string
  console.log("************************");
}

client.dispose(); // Close the client connection