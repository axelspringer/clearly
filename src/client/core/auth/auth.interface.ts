export interface IAuthProviderOptions {
};

export class AuthProviderOptions {

  constructor(options?: any) {
    const defaults = {
      name: 'blackbeard',
      retry: 5,
      debugFilter: 'pouchdb:api',
    };
    return {...defaults, ...options};
  }

};
