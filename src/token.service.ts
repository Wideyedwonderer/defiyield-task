import { inject, injectable } from "inversify";
import Erc20 from "./constants/erc20.json";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import fs from "fs";
import { UtilService } from "./util.service";
import { TYPES } from "./types";
import 'reflect-metadata';
const web3 = new Web3("https://main-rpc.linkpool.io");

@injectable()
export class TokenService {
 
  
  constructor(@inject(TYPES.UtilService) private utilService: UtilService) {}

  public async scheduleTokenDetailsExecution(
    ethAddress: string,
    tokenAddresses: string[]
  ) {
    const tokenContracts = tokenAddresses.map(
      (token) => new web3.eth.Contract(Erc20 as any, token)
    );

    this.writeTokensDataToFile(ethAddress, tokenContracts);
    setInterval(async () => {
        this.writeTokensDataToFile(ethAddress, tokenContracts);
    }, 1000 * 1000)
  }

  getDefaultEthAddressInfo(DEFAULT_ADDRESS: string) {
    const raw = fs.readFileSync(this.utilService.getEthAddressInfoFilePath(DEFAULT_ADDRESS));
    return JSON.parse(raw as any);
    }

  private async writeTokensDataToFile(
    ethAddress: string,
    tokenContracts: Contract[]
  ) {
    const ethBalance = await web3.eth.getBalance(ethAddress);
    const tokensData = await this._getTokensData(tokenContracts, ethAddress);
    
    fs.writeFile(
      this.utilService.getEthAddressInfoFilePath(ethAddress),
      JSON.stringify({ ethBalance, tokensData }),
      null,
      (err) => console.log(err)
    );
  }

  private async _getTokensData(tokenContracts: Contract[], ethAddress: string) {
    const tokenNamesPromises = tokenContracts.map((tokenContract) =>
      tokenContract.methods.name().call()
    );
    const tokenSymbolsPromises = tokenContracts.map((tokenContract) =>
      tokenContract.methods.symbol().call()
    );
    const tokenDecimalsPromises = tokenContracts.map((tokenContract) =>
      tokenContract.methods.decimals().call()
    );
    const tokenBalancesPromises = tokenContracts.map((tokenContract) =>
      tokenContract.methods.balanceOf(ethAddress).call()
    );

    const tokenNames = await Promise.all(tokenNamesPromises);
    const tokenSymbols = await Promise.all(tokenSymbolsPromises);
    const tokenDecimals = await Promise.all(tokenDecimalsPromises);
    const tokenBalances = await Promise.all(tokenBalancesPromises);

    const tokensData = tokenContracts.map((contract, index) => ({
      address: contract.options.address,
      name: tokenNames[index],
      decimal: tokenDecimals[index],
      symbol: tokenSymbols[index],
      balance: tokenBalances[index],
    }));

    return tokensData;
  }
}
