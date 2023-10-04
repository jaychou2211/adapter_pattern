import { RelationshipAnalyzerAdapter } from "./adapter/RelationshipAnalyzerAdapter";
import { Client } from "./client";

(async () => {

    const client = new Client(new RelationshipAnalyzerAdapter);
    await client.parse("../script.txt");

    console.log(client.getMutualFriends('A', 'B'));
    console.log(client.getMutualFriends('A', 'C'));
    console.log(client.getMutualFriends('A', 'F'));

    console.log(client.hasConnection('A', 'B'));
    console.log(client.hasConnection('A', 'F'));
    console.log(client.hasConnection('A', 'E'));

})().catch(err => {
    console.log(err);
})