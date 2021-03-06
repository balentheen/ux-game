import { StyleSheet, Platform } from 'react-native';
import { STYLE } from '../../../constants';

export default StyleSheet.create({
  heading1: {
    color: 'black',
    fontSize: STYLE.FONT.SIZE.HEADING_1,
    fontFamily: 'montserrat-regular',
    marginBottom: 8,
    marginTop: 16,
    textAlign: 'left'
  },
  heading2: {
    marginTop: 15,
    color: STYLE.COLOR.QUATERNARY,
    fontSize: STYLE.FONT.SIZE.HEADING_2,
    fontFamily: 'montserrat-regular',
    letterSpacing: 0.2,
    marginBottom: 0
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
