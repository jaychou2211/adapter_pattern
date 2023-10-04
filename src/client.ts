import fs from 'fs';
import path from 'path';
import { RelationshipAnalyzer } from './interface/RelationshipAnalyzer';
import { RelationshipGraph } from "./interface/RelationshipGraph";

export class Client {
    private analyzer: RelationshipAnalyzer;
    private graph: RelationshipGraph | null = null;

    constructor(analyzer: RelationshipAnalyzer) {
        this.analyzer = analyzer;
    }

    public parse = async (filePath: string) => {
        const script = await this.readFile(filePath)
        if (script)
            this.graph = this.analyzer.parse(script);
    }

    private readFile = async (filePath: string) => {
        try {
            return await fs.promises.readFile(filePath, 'utf8');
        } catch (err) {
            console.error(`Error reading file: ${err}`);
        }
    }

    public getMutualFriends = (name1: string, name2: string): string[] => {
        return this.analyzer.getMutualFriends(name1, name2);
    }

    public hasConnection = (name1: string, name2: string): boolean => {
        if (this.graph)
            return this.graph.hasConnection(name1, name2);
        else
            throw new Error("not parsed yet");
    }
}