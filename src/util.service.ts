import { injectable } from "inversify";
import Web3 from "web3";
const web3 = new Web3("https://main-rpc.linkpool.io");
import 'reflect-metadata';

@injectable()
export class UtilService {

    getEthAddressInfoFilePath(address: string) {
        return __dirname + '/' + address + '.json';
    }
}
