# Vscode Python Slice Descriptor Openai

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


#### Changelog

View it [here](./CHANGELOG.md)

**Enjoy!**
This is my first published extension, any comments will be appreciated, even very negative ones. ;)