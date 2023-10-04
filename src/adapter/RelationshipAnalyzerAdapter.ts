import { RelationshipAnalyzer } from "../interface/RelationshipAnalyzer";
import { RelationshipGraph } from "../interface/RelationshipGraph";
import { SuperRelationshipAnalyzer } from "../SuperRelationshipAnalyzer";
import { RelationshipGraphAdapter } from "./RelationshipGraphAdapter";

export class RelationshipAnalyzerAdapter implements RelationshipAnalyzer {

    private analyzer: SuperRelationshipAnalyzer | null = null;
    private names: Set<string> | null = null;

    parse(script: string): RelationshipGraph {
        const newScript = this.mapScript(script);
        const graph = new RelationshipGraphAdapter;

        this.names = new Set();
        const lines = newScript
            .split("\n")
            .filter(line => line !== "");

        lines.forEach(line => {
            const [name, friend] = line.split(" -- ");
            [name, friend].forEach(str => (this.names as Set<string>).add(str))
            graph.mergeEdge(name, friend);
        });

        this.analyzer = new SuperRelationshipAnalyzer(newScript);

        return graph;
    }

    getMutualFriends(name1: string, name2: string): string[] {
        return this.allNames.filter(target => this.analyzer?.isMutualFriend(target, name1, name2) ?? false);
    }

    private get allNames(): string[] {
        return Array.from((this.names as Set<string>));
    }

    private mapScript(script: string): string {

        const lines = script.split('\r\n');
        const map: Map<string, string[]> = new Map();

        lines.forEach(line => {
            const [nameStr, friendsStr] = line.split(':');
            const name = nameStr.trim();
            const friends = friendsStr.trim().split(' ');
            map.set(name, friends);
        });

        const records: Set<string> = new Set();
        let result = '';

        [...map.entries()].forEach(([name, friends]) => {
            friends.forEach(friend => {
                const record = `${name} -- ${friend}\n`;
                if (!records.has(`${friend} -- ${name}\n`)) {
                    records.add(record);
                    result += record;
                }
            });
        });

        return result;
    }
}