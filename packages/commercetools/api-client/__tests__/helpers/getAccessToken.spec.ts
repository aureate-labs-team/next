/* eslint-disable camelcase, @typescript-eslint/camelcase */
import loadAccessToken from './../../src/helpers/createCommerceToolsLink/loadAccessToken';
import { onTokenSave, onTokenRead } from './../../src/index';

jest.mock('@commercetools/sdk-auth', () =>
  jest.fn().mockImplementation(() => ({
    anonymousFlow: () => ({ access_token: 'generated access token' })
  }))
);

describe('[commercetools-api-client] loadAccessToken', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches a new access token', async () => {
    await loadAccessToken({
      uri: '',
      authHost: '',
      projectKey: '',
      clientId: '',
      clientSecret: '',
      scopes: []
    });

    expect(onTokenSave).toBeCalled();
  });

  it('loads current access token', async () => {
    (onTokenRead as any).mockImplementation(() => ({
      expires_at: Date.now() + 10000,
      access_token: 'current token'
    }));

    const token = await loadAccessToken({
      uri: '',
      authHost: '',
      projectKey: '',
      clientId: '',
      clientSecret: '',
      scopes: []
    });

    expect(onTokenRead).toBeCalled();
    expect(token).toBe('current token');
  });
});
