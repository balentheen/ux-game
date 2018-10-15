import { of } from 'rxjs';

import {
  getChannel_1,
  getLoginResponse,
  getMessageListResponse,
  getMessage_1,
  getUserListResponse,
  getUser_1,
  getCredentialDecoded,
  getRequest_1,
  getRequestListResponse,
  getTherapyListResponse,
  getChildListResponse
} from './entities';

export class ApiServiceMock {
  public login = jest.fn().mockReturnValue(of(getLoginResponse()));
  public setToken = jest.fn();
  public getChannel = jest.fn().mockReturnValue(of(getChannel_1()));
  public getMessageList = jest.fn().mockReturnValue(of(getMessageListResponse()));
  public getUserList = jest.fn().mockReturnValue(of(getUserListResponse()));
  public getCredentials = jest.fn().mockReturnValue(of(getCredentialDecoded()));
  public getUser = jest.fn().mockReturnValue(of(getUser_1()));
  public sendMessage = jest.fn().mockReturnValue(of(getMessage_1()));
  public getRequestList = jest.fn().mockReturnValue(of(getRequestListResponse()));
  public postRequest = jest.fn().mockReturnValue(of(getRequest_1()));
  public getChildList = jest.fn().mockReturnValue(of(getChildListResponse()));
  public getTherapyList = jest.fn().mockReturnValue(of(getTherapyListResponse()));
}
