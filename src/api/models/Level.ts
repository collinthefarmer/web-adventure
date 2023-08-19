import type { BaseNode } from "./BaseNode";

export interface Level extends BaseNode {
    description: string;
    type: "LEVEL";

    exits: Record<LevelDir, Level>;
}

export type LevelDir = "N" | "S" | "E" | "W";
