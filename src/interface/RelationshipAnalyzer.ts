import { RelationshipGraph } from "./RelationshipGraph"

export interface RelationshipAnalyzer {
    parse(script: string): RelationshipGraph
    getMutualFriends(name1: string, name2: string): string[]
}