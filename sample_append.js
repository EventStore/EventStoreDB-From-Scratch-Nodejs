// import the client library and jsonEvent 
import { EventStoreDBClient } from "@eventstore/db-client";
import { jsonEvent } from '@eventstore/db-client';

// Create a connection
const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

// Write to a stream called "Sample Data"
// an event of type "Sample_type"
// with the data payload of "SampleContent"
// will be written to the local eventstoredb instance
// connect to the webui at http://127.0.0.1:2113/
// open up the stream browser and view the "Sample Data" stream
// You should see some content there

const stream_name = "SampleContent";

const event = jsonEvent({
  type: "Sample_Type",
  data: {
    "id":"100", "data":"some data"
   },
});

await client.appendToStream(stream_name, event);
client.dispose();

