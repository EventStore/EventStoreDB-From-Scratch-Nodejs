import { BACKWARDS, EventStoreDBClient, FORWARDS, START } from "@eventstore/db-client";
import { jsonEvent } from '@eventstore/db-client';

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

// 
// Our application will be logging a stream 
// of badged door accesses to our buildings
// We will set building_id to 1 in this case

const stream_name = "SampleContent";

let events = client.readStream(
    stream_name,
    {
      fromRevision: START,
      direction: FORWARDS,
      maxCount: 20
    }
  );

  for await (const resolvedEvent of events) {
    console.log(resolvedEvent.event?.data);
  }
  client.dispose();