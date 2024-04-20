const vscode = require('vscode');
const { models } = require("./openai_pricing")

async function saveApiKey(extensionContext, apiKey) {
  await extensionContext.secrets.store('vscode-python-slice-descriptor-openai.apiKey', apiKey);
}

async function saveModel(extensionContext, model) {
  await extensionContext.secrets.store('vscode-python-slice-descriptor-openai.model', model);
}

async function promptForModel(extensionContext) {
  const model = await vscode.window.showQuickPick(Object.keys(models), {
    placeHolder: "Model",
    onDidSelectItem: item => {
      window.showInformationMessage(`Model ${item} selected`)
    },
  });

  if (model) {
    // Save this securely using the Secret Storage API
    await saveModel(extensionContext, model);
  }
}


async function getModel(extensionContext) {
  const modelKey = await extensionContext.secrets.get('vscode-python-slice-descriptor-openai.model');
  
  if (!modelKey) {
    const result = await vscode.window.showWarningMessage('Model not set in settings.', ...["Set now", "Acknowledge"]);
    if (result == "Set now") {
      await promptForModel(extensionContext)
    }
    return null;
  }
  return models[modelKey];
}

async function promptForApiKey(extensionContext) {
  const apiKey = await vscode.window.showInputBox({
    prompt: "Enter your OpenAI API key created at https://platform.openai.com/api-keys",
    placeHolder: "API Key",
    ignoreFocusOut: true,
    password: true
  });

  if (apiKey) {
    // Save this securely using the Secret Storage API
    await saveApiKey(extensionContext, apiKey);
  }
}


async function getApiKey(extensionContext) {
  const apiKey = await extensionContext.secrets.get('vscode-python-slice-descriptor-openai.apiKey');
  
  if (!apiKey) {
    const result = await vscode.window.showWarningMessage('API Key not set in settings.', ...["Set now", "Acknowledge"]);
    if (result == "Set now") {
      await promptForApiKey(extensionContext)
    }
    return null;
  }
  return apiKey;
}

module.exports = {
    getApiKey,
    promptForApiKey,
    getModel,
    promptForModel,
}