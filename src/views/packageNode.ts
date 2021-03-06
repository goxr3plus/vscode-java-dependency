// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { Jdtls } from "../java/jdtls";
import { INodeData, NodeKind } from "../java/nodeData";
import { DataNode } from "./dataNode";
import { ExplorerNode } from "./explorerNode";
import { FileNode } from "./fileNode";
import { TypeRootNode } from "./typeRootNode";

export class PackageNode extends DataNode {
    constructor(nodeData: INodeData, parent: DataNode, protected _project: DataNode, protected _rootNode: DataNode) {
        super(nodeData, parent);
    }

    protected loadData(): Thenable<INodeData[]> {
        return Jdtls.getPackageData({
            kind: NodeKind.Package,
            projectUri: this._project.nodeData.uri,
            path: this.nodeData.name,
            rootPath: this._rootNode.path,
        });
    }

    protected createChildNodeList(): ExplorerNode[] {
        const result = [];
        if (this.nodeData.children && this.nodeData.children.length) {
            this.sort();
            this.nodeData.children.forEach((nodeData) => {
                if (nodeData.kind === NodeKind.File) {
                    result.push(new FileNode(nodeData, this));
                } else {
                    result.push(new TypeRootNode(nodeData, this));
                }
            });
        }
        return result;
    }

    protected get iconPath(): { light: string; dark: string } {
        return ExplorerNode.resolveIconPath("package");
    }
}
