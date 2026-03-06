import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log("How's Your Luck is active 😈");

	const disposable = vscode.workspace.onDidSaveTextDocument(async () => {

		const roll = Math.floor(Math.random() * 1000) + 1;

		vscode.window.showInformationMessage(`🎲 Roll: ${roll}/1000`);

		if (roll !== 777) {
			return;
		}

		const files = await vscode.workspace.findFiles(
			'**/*',
			'**/{node_modules,.git,dist,build,.next,out}'
		);

		if (files.length === 0) {
			return;
		}

		const unluckyFile = files[Math.floor(Math.random() * files.length)];

		try {

			await vscode.workspace.fs.delete(unluckyFile);

			vscode.window.showErrorMessage(
				`💀 BANG! You run out of luck.`
			);

		} catch (err) {

			console.error(err);

		}

	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}