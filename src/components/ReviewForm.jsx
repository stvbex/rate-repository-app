import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { useHistory } from 'react-router-native';
import { useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { CREATE_REVIEW } from '../graphql/mutations';
import { formStyles } from '../theme';


const initialValues = {
  owner: '',
  name: '',
  rating: '',
  review: '',
};

const validationSchema = yup.object().shape({
  owner: yup.string().required('Repository owner name is required'),
  name: yup.string().required('Repository name is required'),
  rating: yup.number().min(0).max(100).required('Rating is required'),
  review: yup.string(),
});

const ReviewForm = ({ handleSubmit }) => {

  return (
    <View style={formStyles.container}>
      <FormikTextInput name='owner' placeholder='Repository owner name' />
      <FormikTextInput name='name' placeholder='Repository name' />
      <FormikTextInput name='rating' placeholder='Rating from 0 to 100' />
      <FormikTextInput name='review' placeholder='Review' multiline />
      <TouchableWithoutFeedback onPress={handleSubmit} testID='submitButton' >
        <Text buttonTheme='primary'>Create a review</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const ReviewFormContainer = () => {
  const history = useHistory();
  const [createReview] = useMutation(CREATE_REVIEW);

  const handleSubmit = async values => {
    try {
      const reviewData = await createReview({
        variables: {
          repositoryName: values.name,
          ownerName: values.owner,
          rating: Number(values.rating),
          text: values.review,
        }
      });
      history.push(`/${reviewData.data.createReview.repositoryId}`);
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
        {({ handleSubmit }) => <ReviewForm handleSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default ReviewFormContainer;