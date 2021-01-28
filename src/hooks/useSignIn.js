import { useContext } from 'react';
import { useApolloClient } from '@apollo/client';
import { useMutation } from "@apollo/react-hooks";

import AuthStorageContext from '../contexts/AuthStorageContext';
import { AUTHORIZE } from '../graphql/mutations';

const useSignIn = () => {
  const [authorize, result] = useMutation(AUTHORIZE);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await authorize({
      variables: {
        username,
        password
      }
    });
    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();

    return { data };
  };

  return [signIn, result];
};

export default useSignIn;