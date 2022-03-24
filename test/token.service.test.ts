import {it, describe, jest} from '@jest/globals';
import { TokenService } from '../src/token.service';
import fs from 'fs';
import { UtilService } from "../src/util.service";
jest.mock('../src/util.service');

let tokenService: TokenService;
const jsonFilePath = __dirname + '/test.json';
describe('token service should', () => {
   

    beforeEach(() => {
        (UtilService as any).mockImplementation(()=> ({
            getEthAddressInfoFilePath: () => jsonFilePath
        }))
        tokenService = new TokenService(new UtilService());
    });

    it('getDefaultEthAddressInfo should return proper json file', () => {
        fs.writeFileSync(jsonFilePath, JSON.stringify({name: 'test'}));
       
        const json = tokenService.getDefaultEthAddressInfo('test');

        expect(json.name).toBe('test');
        fs.unlinkSync(jsonFilePath)
    })

    
})