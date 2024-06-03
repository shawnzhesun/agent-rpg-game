import express, { json } from 'express';
import z from 'zod';
import { AgentExecutor, createOpenAIToolsAgent } from 'langchain/agents';
import { ChatOpenAI } from '@langchain/openai';
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { DynamicTool, DynamicStructuredTool } from '@langchain/core/tools';


const app = express();
const port = 3000;

app.use(json());

const agents = {};

const llm = new ChatOpenAI({
  model: "gpt-3.5-turbo-1106",
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});


const tools = [
  new DynamicTool({
    name: "FOO",
    description:
      "call this to get the value of foo. input should be an empty string.",
    func: async () => "baz",
  }),
  new DynamicStructuredTool({
    name: "random-number-generator",
    description: "generates a random number between two input numbers",
    schema: z.object({
      low: z.number().describe("The lower bound of the generated number"),
      high: z.number().describe("The upper bound of the generated number"),
    }),
    func: async ({ low, high }) =>
      (Math.random() * (high - low) + low).toString(),
  }),
];

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant"],
  new MessagesPlaceholder("chat_history"),
  ["human", "{input}"],
  new MessagesPlaceholder("agent_scratchpad"),
]);

// Initiate 3 default agents
const defaultAgents = ['doc-agent', 'eng-agent', 'data-agent'];
(async () => {
  for (const agentId of defaultAgents) {
    const agent = await createOpenAIToolsAgent({
      llm,
      tools,
      prompt,
    });
    const executor = new AgentExecutor({
      agent,
      tools,
    });
    agents[agentId] = {
      agent: agent,
      executor: executor,
      history: [],
    };
  }
})();

app.post('/create-agent', async (req, res) => {
  const { id } = req.body;

  if (agents[id]) {
    return res.status(400).json({ error: 'Agent with this ID already exists' });
  }

  try {
    const agent = await createOpenAIToolsAgent({
      llm,
      tools,
      prompt,
    });
    const executor = new AgentExecutor({
      agent,
      tools,
    });
    agents[id] = {
      agent: agent,
      executor: executor,
      history: [],
    };
    res.status(201).json({ message: 'Agent created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/chat/:agentId', async (req, res) => {
  const { agentId } = req.params;
  const { message } = req.body;
  const agent = agents[agentId];
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }

  if (!message) {
    return res.status(500).json({ error: 'Empty message received' });
  }

  const executor = agent.executor;

  try {
    const responseMessage = await executor.invoke({
      input: message,
      chat_history: agent.history,
    });

    console.log(responseMessage);

    agent.history.push(new HumanMessage({content: message}));
    agent.history.push(new AIMessage({content: responseMessage.output}));

    res.status(200).json({ response: responseMessage.output });
  } catch (error) {
    res.status(500).json({ error: error.message });
    throw error;
  }
});

app.get('/history/:agentId', (req, res) => {
  const { agentId } = req.params;
  const agent = agents[agentId];

  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }

  try {
    const history = agent.history;
    res.status(200).json({ history });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
