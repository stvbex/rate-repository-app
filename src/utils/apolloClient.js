import ApolloClient from 'apollo-boost';
import Constants from 'expo-constants';

const createApolloClient = (authStorage) => {
  return new ApolloClient({
    request: async operation => {
      try {
        const accessToken = await authStorage.getAccessToken();
        operation.setContext({
          headers: {
            authorization: accessToken ? `bearer ${accessToken}` : '',
          }
        });
      }
      catch (error) {
        console.error(error);
      }
    },
    uri: Constants.manifest.extra.APOLLO_URI,
  });
};

export default createApolloClient;