import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ENV } from '../../constants';
import { ApiService } from './ApiService';
import { getChannel_1, getMessage_1, getUser_1, getRequest_1 } from '../../test/entities';

describe('ApiService', () => {
  const cred = '==weiI3bsxmYhJXQjNWZzNHVvtWZuJiOiI3bsxmYhJnIsICc1JmT1JGU1JGbpNHaLVWeiojIw1yallnIsICc1JmT1J2U1J2cjJXaiV2SllnI6IyctsWZ5JSf';
  let apiService: ApiService;
  beforeEach(() => {
    apiService = new ApiService();
    (apiService as any).http = jest.fn().mockReturnValue(of({ response: null }));
  });

  it('should set token', () => {
    const token = 'token';
    expect((apiService as any).token).toBe(null);
    apiService.setToken(token);
    expect((apiService as any).token).toBe(token);
  });

  describe('request', () => {
    it('should make a request', done => {
      const token = 'token';
      apiService.setToken(token);
      const req = (apiService as any).request('url');
      expect(req instanceof Observable).toBe(true);
      req.subscribe(res => {
        expect(res).toBe(null);
        done();
      });
    });

    it('should retry a request', done => {
      const then = Date.now();
      const error = { status: 500 };
      (apiService as any).http = jest.fn().mockReturnValue(throwError(error));
      (apiService as any).request('url').pipe(
        catchError((errorObs => {
          expect(Date.now()).toBeGreaterThanOrEqual(then + (ENV.API.RETRY_TIMEOUT * ENV.API.MAX_RETRIES));
          expect(errorObs instanceof Observable).toBe(true);
          done();
        }) as any)
      )
        .subscribe();
    });

    it('should NOT retry a request when status is 401', done => {
      const then = Date.now();
      const error = { status: 401 };
      (apiService as any).http = jest.fn().mockReturnValue(throwError(error));
      (apiService as any).request('url').pipe(
        catchError((e => {
          expect(Date.now() - 20).toBeLessThanOrEqual(then);
          expect(e).toEqual(error);
          done();
        }) as any)
      )
        .subscribe();
    });
  });

  it('should parse a body', () => {
    const body = { a: { z: 1 }, b: null, c: 'asd' };
    const parsed = (apiService as any).parseBody(body);
    expect(parsed).toEqual('{"a":{"z":1},"b":null,"c":"asd"}');
  });

  it('should parse a query', () => {
    const body = { a: { z: 1 }, b: null, c: 'asd' };
    const parsed = (apiService as any).parseQuery(body);
    expect(parsed).toEqual('a={\"z\":1}&b=null&c=asd');
  });

  it('should login', () => {
    const email = 'email';
    const password = 'password';
    const res = apiService.login({ email, password });
    expect(res instanceof Observable).toBe(true);
  });

  it('should getChannel', () => {
    const channelId = getChannel_1()._id;
    const res = apiService.getChannel(channelId);
    expect(res instanceof Observable).toBe(true);
  });

  it('should getMessageList', () => {
    const channelId = getChannel_1()._id;
    const res = apiService.getMessageList({ q: { channelId }, limit: 1, page: 1 });
    expect(res instanceof Observable).toBe(true);
  });

  it('should getChildList', () => {
    const parentId = getUser_1()._id;
    const res = apiService.getChildList({ q: { parentId }, limit: 1, page: 1 });
    expect(res instanceof Observable).toBe(true);
  });

  it('should getTherapyList', () => {
    const res = apiService.getTherapyList();
    expect(res instanceof Observable).toBe(true);
  });

  it('should getUserList', () => {
    const ids = [getUser_1()._id];
    const res = apiService.getUserList(ids);
    expect(res instanceof Observable).toBe(true);
  });

  it('should getUser', () => {
    const res = apiService.getUser(getUser_1()._id);
    expect(res instanceof Observable).toBe(true);
  });

  it('should sendMessage', () => {
    const res = apiService.sendMessage(getMessage_1());
    expect(res instanceof Observable).toBe(true);
  });

  it('should getRequestList', () => {
    const res = apiService.getRequestList({ q: {}, limit: 1, page: 1 });
    expect(res instanceof Observable).toBe(true);
  });

  it('should postRequest', () => {
    const res = apiService.postRequest(getRequest_1());
    expect(res instanceof Observable).toBe(true);
  });

  it('should get decoded credentials', done => {
    (apiService as any).http = jest.fn().mockReturnValue(of({ response: { cred } }));
    apiService.getCredentials().subscribe(res => {
      expect(res.pubNubPublishKey).toEqual('p-key');
      expect(res.pubNubSubscribeKey).toEqual('s-key');
      expect(res.rollbarAccessToken).toEqual('rollbar');
      done();
    });
  });
});
