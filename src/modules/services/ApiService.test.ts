import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ENV } from '../../constants';
import { ApiService } from './ApiService';
import { getUser_1, getTodo_1 } from '../../test/entities';

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

    it('should make a POST request', done => {
      const token = 'token';
      apiService.setToken(token);
      const req = (apiService as any).request('url', { method: 'POST', body: { a: 1 } });
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

  it('should getUserList', () => {
    const ids = [getUser_1()._id];
    const res = apiService.getUserList(ids);
    expect(res instanceof Observable).toBe(true);
  });

  it('should getTodoList', () => {
    const res = apiService.getTodoList({ page: 1, limit: 1 });
    expect(res instanceof Observable).toBe(true);
  });
});
