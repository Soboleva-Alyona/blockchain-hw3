import { ethers } from 'ethers';
import apiKey from './data/api_key.json' assert { type: "json" };
import abi from "./data/abi.json" assert { type: "json" };
import oraclesInfo from './data/oracles.json' assert { type: "json" };

const settings = {
    apiKey: apiKey,
    network: "homestead",
};

const alchemyProvider = new ethers.providers.AlchemyWebSocketProvider(settings.network, settings.apiKey);

function main(){
    oraclesInfo.oracles.forEach(element => {
        const contract = new ethers.Contract(element.address, abi, alchemyProvider);
        contract.on("AnswerUpdated", (current, updatedAt) => {
            console.log(element.tokenName, ": feed changed to ", current, " at ", updatedAt)
        })
        console.log("Started listening to event AnswerUpdated in contract ", element.tokenName);
    });
}

main();
    