# Installatie
Zorg ervoor dat je in de server folder bent
Vervolgens installeer het volgende vanuit je terminal:

npm install @langchain/openai

npm install langchain   

npm install express

npm install cors

npm install dotenv

# API Key
Maak vervolgens een .env bestand in de server folder en vul vervolgens de volgende informatie in:

OPENAI_API_TYPE=

OPENAI_API_VERSION=

OPENAI_API_BASE=

AZURE_OPENAI_API_KEY=

DEPLOYMENT_NAME=

ENGINE_NAME=

INSTANCE_NAME=

PORT=

# Applicatie runnen
Om de applicatie nu te runnen zorg ervoor dat je in de server folder zit en het volgende typt
npm run dev
Dit runt vervolgens node --env-file=.env --watch server.js

Nu kan je de index.html bekijken en uitproberen
