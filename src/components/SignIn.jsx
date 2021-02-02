import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import useSignIn from '../hooks/useSignIn';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { formStyles } from '../theme';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username required'),
  password: yup.string().required('Password required')
});

const SignInForm = ({ onSubmit }) => {

  return (
    <View style={formStyles.container}>
      <FormikTextInput name='username' placeholder='Username' testID='usernameField' />
      <FormikTextInput name='password' placeholder='Password' testID='passwordField' secureTextEntry />
      <TouchableWithoutFeedback onPress={onSubmit} testID='submitButton' >
        <Text buttonTheme='primary'>Login</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      history.push('/');
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <SignInContainer onSubmit={onSubmit} />
    </View>
  );
};

export default SignIn;