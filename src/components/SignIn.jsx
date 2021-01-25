import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    // justifyContent: 'stretch'
  },
  form: {
    display: 'flex',
    flexDirection: 'row',

    // justifyContent: 'center',
    // alignItems: 'center',
  },
  formView: {
    backgroundColor: theme.colors.backgroundWhite,
    padding: theme.padding.formContainerPadding,
  },
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username required'),
  password: yup.string().required('Password required')
})

const SignInForm = ({ onSubmit }) => {

  return (
    <View style={styles.formView}>
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput name='password' placeholder='Password' secureTextEntry style={styles.textInput} />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text buttonTheme='primary'>Login</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignIn = () => {

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <View style={styles.formContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        style={styles.form}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;