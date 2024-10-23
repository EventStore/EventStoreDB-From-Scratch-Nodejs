// import the client library and jsonEvent 
import { EventStoreDBClient } from "@eventstore/db-client";
import { jsonEvent } from '@eventstore/db-client';

////////////////////////////////////////////////////////
//
// Step 1. Create client and connect it to EventStoreDB
//
////////////////////////////////////////////////////////

// Create an instance of EventStoreDBClient, connecting to the EventStoreDB at localhost without TLS
const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

/////////////////////////////////////////////////////////////
//
// Step 2. Create new event object with a type and data body
//
/////////////////////////////////////////////////////////////

// Write to a stream called "SampleStream"
// an event of type "SampleEventType"
// with the data payload of "event"
// will be written to the local eventstoredb instance
// connect to the webui at http://127.0.0.1:2113/
// open up the stream browser and view the "SampleStream" stream
// You should see some content there

const eventType = "SampleEventType"            // Define the event type for the new event     
const event = jsonEvent({                      // Create a new event with a type and body           
  type: eventType,                             // Specify the event type             
  data: {                                      //                
    "id":"100", "importantData":"some value"   // Specify the event data body                           
  },
});

///////////////////////////////////////////////////
//
// Step 3. Append the event object into the stream
//
///////////////////////////////////////////////////

const eventStream = "SampleStream";
await client.appendToStream(eventStream, event);  // append the event to the stream

///////////////////////////////////////////////
//
// Step 4. Print the appended event to console
//
///////////////////////////////////////////////

console.log("************************");
console.log("🎉 Congratulations, you have written an event!");
console.log("Stream: " + eventStream);
console.log("Event Type: " + eventType);
console.log("Event Body: " + JSON.stringify(event.data));
console.log("************************");

client.dispose();