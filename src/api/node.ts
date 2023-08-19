import type { BaseNode } from "./models/BaseNode";
import type { Level, LevelDir } from "./models/Level";
import type { GameNode } from "./models";

function nodeToPath(node: BaseNode): string {
    if (!node.prev) return node.name;
    const path = `/${node.prev.path}/${node.type}/${node.name}`;
    console.log(path);

    return path;
}

function createBaseNode<T extends GameNode>(
    name: string,
    type: T["type"],
    prev?: BaseNode,
): BaseNode & Pick<T, "type"> {
    return {
        name,
        prev,
        type,
        get path() {
            return nodeToPath(this);
        },
    };
}

const LEVEL_DIR_OPPOSITES: Record<LevelDir, LevelDir> = {
    N: "S",
    S: "N",
    E: "W",
    W: "E",
};

export function createLevel(name: string, description: string): Level;
export function createLevel(
    name: string,
    description: string,
    source: Level,
    dirFromSource: LevelDir,
): Level;
export function createLevel(
    name: string,
    description: string,
    source?: Level,
    dirFromSource?: LevelDir,
): Level {
    const level = {
        ...createBaseNode(name, "LEVEL"),
        description,
        exits: {} as Record<LevelDir, Level>,
    };

    if (source && dirFromSource) {
        source.exits[dirFromSource] = level;
        level.exits[LEVEL_DIR_OPPOSITES[dirFromSource]] = source;
    }

    return level;
}
