import { StyleSheet, Dimensions } from 'react-native';

import { STYLE } from '../../../../../constants';

export default StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.85,
    aspectRatio: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: STYLE.COLOR.WHITE,
  },
  questionContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: STYLE.COLOR.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    shadowColor: STYLE.COLOR.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    padding: 15
  },
  category: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    fontSize: 9,
    fontWeight: STYLE.FONT.WEIGHTS.MEDIUM,
    color: STYLE.COLOR.PRIMARY,
    alignSelf: 'flex-end'
  },
  question: {
    marginTop: 10,
    fontSize: 60,
    fontFamily: 'montserrat-semibold',
    color: STYLE.COLOR.BLACK
  },
  section: {
    fontSize: 15,
    fontFamily: 'montserrat-regular',
    color: STYLE.COLOR.DIM_GRAY,
    textAlign: 'center'
  },
  trigger: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  bar: {
    width: 3,
    height: 16,
    left: 7,
    position: 'absolute',
    backgroundColor: STYLE.COLOR.CURIOUS_BLUE
  },
  horizontalBar: {
    transform: [{ rotate: '90deg' }]
  }
});
