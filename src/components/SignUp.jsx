import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';

import useSignIn from '../hooks/useSignIn';
import { formStyles } from '../theme';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_USER } from '../graphql/mutations';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().min(1).max(30).required('Username is required'),
  password: yup.string().min(5).max(50).required('Password is required'),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Password confirmation should match the password')
    .required('Password confirmation is required'),
});

const SignUpForm = ({ handleSubmit }) => {
  return (
    <View style={formStyles.container}>
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput name='password' placeholder='Password' secureTextEntry />
      <FormikTextInput name='passwordConfirmation' placeholder='Password again' secureTextEntry />
      <TouchableWithoutFeedback onPress={handleSubmit} testID='submitButton' >
        <Text buttonTheme='primary'>Create user?</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignUp = () => {
  const history = useHistory();
  const [signIn] = useSignIn();
  const [createUser] = useMutation(CREATE_USER);

  const handleSubmit = async values => {
    try {
      await createUser({
        variables: {
          username: values.username,
          password: values.password,
        }
      });
      await signIn({
        username: values.username,
        password: values.password
      });
      history.push('/');
    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => <SignUpForm handleSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignUp;