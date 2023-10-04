import { UndirectedGraph } from 'graphology';
import { RelationshipGraph } from "../interface/RelationshipGraph";

export class RelationshipGraphAdapter implements RelationshipGraph {

    private graph = new UndirectedGraph();

    mergeEdge(name1: string, name2: string): void {
        this.graph.mergeEdge(name1, name2);
    }

    hasConnection(name1: string, name2: string): boolean {
        const visited = new Set();
        const queue = [name1];

        while (queue.length > 0) {
            const current = queue.shift();
            visited.add(current);

            if (current === name2) return true; // There is a connection

            const neighbors = this.graph.neighbors(current);
            const filtered = neighbors.filter((neighbor: string) => !visited.has(neighbor));
            queue.push(...filtered);
        }

        return false; // No connection found
    }
}