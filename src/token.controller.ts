import {
    controller, httpGet
  } from 'inversify-express-utils';
  import { inject } from 'inversify';
import {TYPES} from './types';
import { TokenService } from './token.service';
import { DEFAULT_ADDRESS, TOKEN_ADDRESSES } from './constants/config';
  
  @controller('/token')
  export class TokenController {
  
    constructor(@inject(TYPES.TokenService) private tokenService: TokenService) {
        this.tokenService.scheduleTokenDetailsExecution(DEFAULT_ADDRESS, TOKEN_ADDRESSES);
     }
  
    @httpGet('/')
    public getDefaultEthAddresxwsInfo() {
       return this.tokenService.getDefaultEthAddressInfo(DEFAULT_ADDRESS);
    }
  
  }