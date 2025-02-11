import 'jsr:@std/dotenv/load';
import OpenAI from 'npm:openai';

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
});

async function askGPT(question: string) {
  const completion = await openai.chat.completions.create({
    model: Deno.env.get('OPENAI_MODEL') || 'gpt-4o-mini',
    store: Deno.env.get('OPENAI_STORE') === 'true',
    messages: [{ role: 'user', content: question }],
  });
  return completion.choices[0].message.content;
}

function promptUser(message: string) {
  const question = prompt(`\n${message}\n`);

  if (question?.toLowerCase() === 'exit') {
    console.log('Goodbye!');
    Deno.exit(0);
  }

  if (!question) {
    console.error('No question provided, I guess we are done here...');
    Deno.exit(1);
  }

  return question;
}

async function main() {
  console.log("Welcome! Type your message (or 'exit' to quit):");

  // Initial prompt
  let question = promptUser('How can I help you today?');

  while (true) {
    try {
      const response = await askGPT(question);

      console.log('\nResponse:\n', response);

      // Prompt for next input
      question = promptUser('Have a follow up question?');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
      } else {
        console.error('An unknown error occurred');
        Deno.exit(1);
      }
    }
  }
}

// Start the application
main().catch(console.error);
