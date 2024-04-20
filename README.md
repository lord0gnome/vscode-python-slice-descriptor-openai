# python-array-slice-descriptor

A simple vscode extension that provides textual descriptions for the user of the currently hovered line if it contains a python slice.

## Requirements

- `vscode > 1.68.0`


## Example

![Example](./images/example.gif)

## Extension Settings

Will automatically be prompted and stored in vscode SecretStorage:
- `apiKey` : Your openAI api key
- `model` : The model to use

## Known Issues

- The openAI models I list are hard-coded, and the pricing is taken by hand off the openAI website.
- If you hover over any line with a slice python array, you will **PAY** with your openAI account, be weary of this.

## Release Notes

### 1.0.0

- Hover over a line to see the `textual description` of a slice contained within.
- Model selection at start through vscode Input
- apiKey selection at start through vscode QuickSelect
- Simple language detection using vscode.env.language in the openAI prompt

### 1.1.0 (planned)
- Shorter prompt to openAI, or usage of the assistant API perhaps
- models and pricing pulled from an official/unofficial API
- Ability to change `apiKey` after initial setting
- Ability to change `model` after initial setting


**Enjoy!**
This is my first published extension, any comments will be appreciated, even very negative ones. ;)