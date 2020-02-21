// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as semver from 'semver';

let employee: any;
let officeASync: any;
let officeSync: any;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('--->......pluginA:activate()');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.pluginA', () => {
		// The code you place here will be executed every time your command is executed

		let employeeStr: string;
		if (employee) {
			employeeStr = `${employee.firstname} / ${employee.lastname}`
		} else {
			employeeStr = 'N/A';
		}

		// Display a message box to the user
		vscode.window.showInformationMessage(`pluginA is working, employee ${employeeStr}`);
		console.log(`showInformationMessage(pluginA is working , employee ${employeeStr}`);
		let officeSyncTxt: string;
		if (officeSync) {
			officeSyncTxt = `${officeSync.id}/${officeSync.description}`;
		} else {
			officeSyncTxt = 'N/A';
		}

		let officeASyncTxt: string;
		if (officeASync) {
			officeASyncTxt = `${officeASync.id}/${officeASync.description}`;
		} else {
			officeASyncTxt = 'N/A';
		}

		console.log(`showInformationMessage(pluginA is working, office async ${officeASyncTxt},  sync: ${officeSyncTxt}`);
		vscode.window.showInformationMessage(`pluginA is working, office async ${officeASyncTxt},  sync: ${officeSyncTxt}`);
	});

	console.log('--->pluginA: ......vscode.extensions.getExtension("test-dependencies.plugin-b")');
	const ext = vscode.extensions.getExtension('test-dependencies.plugin-b');
	console.log(`--->pluginA: result of getExtension(pluginB) is` + ext);
    if (!ext) {
		console.log(`pluginA: result of getExtension(pluginB) is not defined`);
        vscode.window.showWarningMessage('Do Please install \'test-dependencies.plugin-b\' via the Extensions pane.');
        return undefined;
	}
	
	// activate
	console.log(`pluginA: wait for pluginB.activate....`);
    const pluginB = await ext.activate();
	console.log(`pluginA:  End of wait for pluginB.activate.... and result of exports is`, pluginB);

	console.log('pluginA: ext.packageJSON', ext.packageJSON);

	if (!pluginB || !pluginB.registerEmployeeWithString) {
        vscode.window.showWarningMessage('The installed pluginB extension doesn\'t support registerEmployeeWithString. Please upgrade.');
        return undefined;
    }

	console.log(`pluginA: before version`);
	console.log(`pluginA: version is ${ext.packageJSON.version}`);
	console.log(`pluginA: after version`);
   if (ext.packageJSON.version && !semver.lte(ext.packageJSON.version, '0.0.15')) {
		vscode.window.showWarningMessage(`The installed pluginB extension is not using the correct version. Found ${ext.packageJSON.version}`);
		console.log(`The installed pluginB extension is not using the correct version. Found ${ext.packageJSON.version}`);
	} else {
		console.log(`The installed pluginB extension is using. Found ${ext.packageJSON.version}`);
	}

	pluginB.registerEmployeeWithString('myFirstName', 'myLastName');

	employee = await pluginB.findAsyncEmployee('myFirstName', 'myLastName');

	vscode.window.showInformationMessage(`Found employee ${employee.firstname} / ${employee.lastname}`);

	const extD = vscode.extensions.getExtension('test-dependencies.plugin-d');
    if (!extD) {
        vscode.window.showWarningMessage('Please install \'test-dependencies.plugin-d\' via the Extensions pane.');
        return undefined;
	}
	
	// activate
	const pluginD = await extD.activate();
	

	pluginD.registerOffice(123, 'office 123');
	pluginD.registerOffice(456, 'office 456');
	pluginD.registerOffice(789, 'office 789');
	
	
	officeASync = await pluginD.findOffice(456);
	officeSync = pluginD.getOffice(789);
	

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
