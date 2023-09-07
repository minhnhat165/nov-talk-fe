export const appConfig = {
  name: process.env.APP_NAME || 'Local Name',
  url: process.env.APP_URL || 'http://localhost:3000',
  siteName: {
    local: 'local',
    remote: 'remote',
  },
  cookie: {
    accessTokenName: 'access_token',
    refreshTokenName: 'refresh_token',
  },
  rootApp: {
    url: process.env.ROOT_APP_URL || 'http://localhost:3000',
  },
};
