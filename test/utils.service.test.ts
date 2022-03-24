import {it, describe, jest} from '@jest/globals';
import { UtilService } from "../src/util.service";

let utilService: UtilService;
describe('', () => {
   

    beforeEach(() => {
        utilService = new UtilService();
    });

    it('getEthAddressInfoFilePath to be called', () => {
        const spy = jest.spyOn(utilService, 'getEthAddressInfoFilePath');
        
        utilService.getEthAddressInfoFilePath('asd');
        expect(spy).toBeCalledTimes(1);
    });

    it('getEthAddressInfoFilePath to return filename ending in right extension', () => {
        const spy = jest.spyOn(utilService, 'getEthAddressInfoFilePath');
        
        const result = utilService.getEthAddressInfoFilePath('asd');
        expect(result).toContain('.json');
    });

    it('getEthAddressInfoFilePath to return filename to contain passed argument', () => {
        const spy = jest.spyOn(utilService, 'getEthAddressInfoFilePath');
        
        const result = utilService.getEthAddressInfoFilePath('asd');
        expect(result).toContain('asd');
    });

    it('getEthAddressInfoFilePath to return filename to contain proper directory', () => {
        const spy = jest.spyOn(utilService, 'getEthAddressInfoFilePath');
        
        const result = utilService.getEthAddressInfoFilePath('asd');
        expect(result).toContain(__dirname.replace('test', 'src'));
    });
})