// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {EmployeeAPIImpl} from './employee-api';

let cities: Array<string>;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('--->......pluginB:activate()');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.pluginB', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World pluginB!' + cities);
	});

	const employeeAPI = new EmployeeAPIImpl();

	context.subscriptions.push(disposable);

	const ext = vscode.extensions.getExtension('test-dependencies.plugin-c');
    if (!ext) {
        vscode.window.showWarningMessage('Please install \'test-dependencies.plugin-c\' via the Extensions pane.');
        return undefined;
	}
	
	// activate
    const pluginC = await ext.activate();

    if (!pluginC || !pluginC.registerCity) {
        vscode.window.showWarningMessage('The installed pluginC extension doesn\'t support registerCity. Please upgrade.');
        return undefined;
    }

   /* if (ext.packageJSON.version && !semver.gte(ext.packageJSON.version, '0.0.15')) {
        vscode.window.showWarningMessage('The installed Red Hat YAML extension doesn\'t support multiple schemas. Please upgrade \'YAML Support by Red Hat\' via the Extensions pane.');
	}*/

	pluginC.registerCity('Paris');
	pluginC.registerCity('Berlin');
	pluginC.registerCity('London');


	cities = await pluginC.getCities();

	return employeeAPI;
}

// this method is called when your extension is deactivated
export function deactivate() {

 cities = [];

}
