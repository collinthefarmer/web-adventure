export interface BaseNode {
    name: string;
    type: string;

    prev?: BaseNode;

    readonly path: string;
}
