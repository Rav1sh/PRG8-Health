import { ChatOpenAI } from "@langchain/openai"
import "dotenv/config"
import express from "express"
import cors from "cors"

const app = express()

const model = new ChatOpenAI({
    temperature: 0.0,
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
})

app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
    const { question } = req.body;

    try {
        const answer = await model.invoke(question);
        res.json({ answer: answer.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to process the question' });
    }
});

app.get('/', async (req, res) => {
    const { title } = req.query;

    if (title) {
        // Handle the case where a title is provided
        console.log('1:', title);
        try {
            const joke = await generateJokeWithRepeatTitle(title);
            res.json({ joke: joke.content });
        } catch (error) {
            console.error('Error generating joke:', error);
            res.status(500).json({ error: 'Failed to generate joke' });
        }
    } else {
        res.status(400).json({ error: 'Title is required' });
    }
});

async function generateJokeWithRepeatTitle(title) {
    // Generate and send a joke to the client
    try {
        console.log('2:', title);
        const joke = await model.invoke(`Give me a summary of helpful information for individuals that work on their health and are focussing on eating healthy meals about ${title}`);
        return joke;
    } catch (error) {
        throw error;
    }
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});