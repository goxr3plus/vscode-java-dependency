import { ExtensionContext } from "vscode";

export class Services {
    static initialize(context: ExtensionContext) {
        this._context = context;
    }

    private static _context: ExtensionContext;

    static get context() {
        return this._context;
    }
}