const vscode = require('vscode');
const OpenAI = require("openai");
const { getApiKey, promptForApiKey, getModel, promptForModel } = require("./src/secrets")
const { calculateCost } = require('./src/openai_pricing')

async function sendPromptToOpenAI(extensionContext, systemPrompt, userPrompt) {
  // Configure the OpenAI library with your API key
  const apiKey = await getApiKey(extensionContext);
  const model = await getModel(extensionContext);
  const openai = new OpenAI({ apiKey });
  try {
    const completion = await openai.chat.completions.create({
      messages: [{role: "user", content: userPrompt}, { role: "system", content: systemPrompt }],
      model: model.name,
      max_tokens: 50,
    });

    return `${completion.choices[0].message.content} - $${calculateCost(model.name, completion.usage.prompt_tokens, completion.usage.completion_tokens)}`; // This contains the response from the API
  } catch (error) {
    outputChannel.appendLine(`Error calling OpenAI:, ${error}`);
  }
}

// Call the function

const outputChannel = vscode.window.createOutputChannel('Slice Descriptor');

/**
 * Parses slice notation and returns a human-friendly description.
 * @param {string} slice - The slice notation string.
 * @return {string} A description of the slice.
 */
async function describeSlice(context, line) {
  // Early return for non slice-like patterns
  
  const sliceRegex = /\[([^:\]\[]+)?:([^:\]\[]+)?(?::?(.+))?\]/g;
  
  let [fullSlice] = sliceRegex.exec(line);

  if (!fullSlice.length) {
    return null
  }
  const result = await sendPromptToOpenAI(context, `You are the python array slice descriptor, describe the slice given by the user in a very short fashion and nothing else. Respond in the language represented by the i18n label ${vscode.env.language}`, fullSlice)
  return result ? result : null;
}



async function activate(context) {
	outputChannel.appendLine("python-array-slice-descriptor Activated")
	outputChannel.show()
  await getApiKey(context);
  await getModel(context);
  const hoverProvider = {
    async provideHover(document, position) {
      vscode.show
      let line = document.lineAt(position.line);
      if (line) {
        let message = await describeSlice(context, line['b']);
        if (message) {
          return new vscode.Hover(message);
        }
      }
    }
  }
  
  outputChannel.appendLine("Registering Hover Provider")
  vscode
  let disposable = vscode.languages.registerHoverProvider('python', hoverProvider);

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};