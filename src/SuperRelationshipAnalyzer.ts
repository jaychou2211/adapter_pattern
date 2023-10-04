export class SuperRelationshipAnalyzer {

    private record: Map<string, string[]>;

    constructor(script: string) {
        this.record = new Map();

        const lines = script
            .split("\n")
            .filter(line => line !== "");

        lines.forEach(line => {
            const [name, friend] = line.split(" -- ");
            const friends = this.record.get(name) ?? [];
            this.record.set(name, [...friends, friend]);
        });
    }

    public isMutualFriend(targetName: string, name1: string, name2: string): boolean {
        return this.isFriend(targetName, name1) && this.isFriend(targetName, name2);
    }

    private isFriend(name1: string, name2: string): boolean {
        return this.inFriendsList(name1, name2) || this.inFriendsList(name2, name1);
    }

    private inFriendsList(name1: string, name2: string): boolean {
        const friendsList = this.record.get(name2) ?? [];
        return friendsList.some(friend => friend === name1);
    }
}


// const script = "A -- B\nA -- C\nC -- D\nB -- F\n";
// const analyzer = new SuperRelationshipAnalyzer(script);

// console.log(analyzer.isMutualFriend("A", "B", "C"));
// console.log(analyzer.isMutualFriend("A", "F", "C"));
// console.log(analyzer.isMutualFriend("A", "C", "D"));