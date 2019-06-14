import { StyleSheet, Platform } from 'react-native';
import { STYLE } from '../../../constants';

export default StyleSheet.create({
  ux: {
    color: '#D1D1D6',
    fontSize: 22,
    fontFamily: 'montserrat-semibold',
    marginLeft: 5
  },
  heading1: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'montserrat-regular',
    marginTop: 5,
    textAlign: 'left'
  },
  heading2: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'montserrat-semibold',
    marginTop: 5,
  },
  countdown: {
    color: 'black',
    fontSize: 90,
    fontFamily: 'montserrat-regular',
  },
  headingError: {
    color: STYLE.COLOR.NONARY,
    fontSize: STYLE.FONT.SIZE.PARAGRAPH_SMALL,
    fontWeight: STYLE.FONT.WEIGHTS.REGULAR,
    marginTop: 8
  },
  questionsContainer: {
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 32,
  },
  inputTemplate: {
    marginBottom: Platform.OS === 'ios' ? 110 : 55,
    marginTop: Platform.OS === 'ios' ? 50 : 25,
  },
  input: {
    borderColor: STYLE.COLOR.OCTANARY,
    borderRadius: 4,
    borderWidth: 1,
    color: STYLE.COLOR.SENARY,
    fontSize: STYLE.FONT.SIZE.PARAGRAPH,
    fontWeight: STYLE.FONT.WEIGHTS.REGULAR,
    padding: 16,
    ...Platform.select({
      android: { paddingVertical: 12 }
    })
  },
  inputError: {
    borderColor: STYLE.COLOR.NONARY,
    borderWidth: 1
  },
  inputLabel: {
    color: STYLE.COLOR.QUATERNARY,
    fontSize: STYLE.FONT.SIZE.PARAGRAPH_SMALL,
    fontWeight: STYLE.FONT.WEIGHTS.MEDIUM,
    marginBottom: 10
  },
  loginContainer: {
    backgroundColor: STYLE.COLOR.WHITE,
    flex: 1,
    justifyContent: 'flex-start',
    padding: 24
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  fullScreenImageContainer: {
    flex: 1
  },
  fullScreenImage: {
    width: '100%',
    height: '100%'
  }
});
