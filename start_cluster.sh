#!/bin/bash
####
# Docker management script for Eventstore Training Classes
#####

####
# Check to see if instance is currently running
# If instance is running kill it and start fresh instance
########

#############
# Some bash notes for the curious
# ps --format returns just the names rather than the verbose table format
# grep -q is search in silent mode to prevent output to the terminal
# echo -e the -e allows echo of newline characters
#######


# Check to see if docker container is already running
# If yes, kill it and restart
# If no, download and start


if docker ps -a --format '{{.Names}}'| grep -q esdb;
then 
       echo -e '\nesdb docker container appears to be running\n';

       # Kill the container
       docker stop esdb-node

       ## Remove the instance
       docker rm esdb-node

       docker run -d --name esdb-node -it -p 2113:2113 -p 1113:1113 \
              eventstore/eventstore:lts --insecure --run-projections=All \
              --enable-external-tcp --enable-atom-pub-over-http

else
       docker run -d --name esdb-node -it -p 2113:2113 -p 1113:1113 \
              eventstore/eventstore:lts --insecure --run-projections=All \
              --enable-external-tcp --enable-atom-pub-over-http
fi

# Grab URL to EventStoreDB Admin UI
ESDB_URL=http://localhost:2113
if command -v gh &> /dev/null && [ "$CODESPACES" == "true" ]
then
       # Grab URL from github codespaces if script is ran from there
       ESDB_URL=https://"$CODESPACE_NAME"-2113.$GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN
fi

# Print URL to EventStoreDB Admin UI
echo ""
echo ""
echo -e "🚀 \e[32mEventStoreDB Server has started!!\e[0m 🚀" 
echo ""
echo -e "Browse the EventStoreDB Admin UI at 👉 \e[0m \e[34m$ESDB_URL\e[0m"
echo ""
echo ""
