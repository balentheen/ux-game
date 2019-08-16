import React from 'react';
import { Image, View, Text, ScrollView, KeyboardAvoidingView, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationScreenProp, NavigationStackScreenOptions, NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';

import { ENV, STYLE, IMAGES } from '../../../constants';
import styles from './styles';
import { MenuItem } from '../shared/components';
import { WordModel } from 'modules/models';

const WORD_COUNTDOWN_INIT = 120;

export interface IGameProps {
  navigation: NavigationScreenProp<any, any>;
}

export interface IGameState {
  hasGameStarted: boolean;
  initCountdown: number;
  wordIndex: number;
  words: WordModel.IWord[];
  wordCountDown: number;
}

export default class Game extends React.PureComponent<IGameProps, IGameState> {
  public static isAndroid: boolean = ENV.PLATFORM.IS_ANDROID;

  public state: IGameState = {
    hasGameStarted: false,
    initCountdown: null,
    wordIndex: 0,
    wordCountDown: WORD_COUNTDOWN_INIT,
    words: [
      { title: 'Atomic Design', description: '' },
      { title: 'Adobe XD', description: '' },
      { title: 'Sketch', description: '' },
      { title: 'A/B Testing', description: '' },
      { title: 'CSS', description: '' },
      { title: 'Design Thinking', description: '' },
      { title: 'End User', description: '' },
      { title: 'Gamification', description: '' },
      { title: 'HTML', description: '' },
      { title: 'Prototype', description: '' },
    ]
  };

  public initCountdownInterval: any = null;
  public wordCountdownInterval: any = null;

  public static navigationOptions = ({ navigation }): NavigationStackScreenOptions => ({
    headerTintColor: STYLE.COLOR.WHITE,
    headerLeft: (
      <TouchableOpacity
        style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
        onPress={() => navigation.dispatch(NavigationActions.back())}
      >
        <Image source={IMAGES.ICONS.BACK} />
      </TouchableOpacity>
    ),
    headerTitle: <Image source={IMAGES.ICONS.GAME_LOGO} />,
    headerStyle: { height: 50, backgroundColor: 'white', borderBottomWidth: 0, elevation: 0 }
  })

  public startGame = () => {
    this.initCountdownInterval = setInterval(() => {
      const { initCountdown } = this.state;
      if (initCountdown > 1) {
        this.setState({ initCountdown: initCountdown - 1 });
      } else {
        this.setState({ initCountdown: null, hasGameStarted: true });
        clearInterval(this.initCountdownInterval);
        this.initCountdownInterval = null;
        this.startWord();
      }
    }, 1000);
  }

  public startWord = () => {
    this.wordCountdownInterval = setInterval(() => {
      const { wordCountDown, words, wordIndex } = this.state;
      if (wordCountDown > 1) {
        this.setState({ wordCountDown: wordCountDown - 1 });
      } else {
        if (wordIndex === (words.length - 1)) {
          clearInterval(this.wordCountdownInterval);
          this.wordCountdownInterval = null;
          this.props.navigation.goBack();
        } else {
          this.setState({ wordCountDown: WORD_COUNTDOWN_INIT, wordIndex: wordIndex + 1 });
        }
      }
    }, 1000);
  }

  public nextWord = () => {
    clearInterval(this.wordCountdownInterval);
    this.wordCountdownInterval = null;
    const { words, wordIndex } = this.state;
    if (wordIndex === (words.length - 1)) {
      this.props.navigation.goBack();
    } else {
      this.setState({ wordCountDown: WORD_COUNTDOWN_INIT, wordIndex: wordIndex + 1 });
      this.startWord();
    }
  }

  public render() {
    const { hasGameStarted, initCountdown, wordCountDown, words, wordIndex } = this.state;
    const word = words[wordIndex];
    return (
      <View style={styles.loginContainer}>
        {initCountdown === null && !hasGameStarted ? (
          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10, paddingBottom: 50 }}
            onPress={() => {
              this.handleOnChange('initCountdown', 3);
              this.startGame();
            }}
          >
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
              <Image style={{ width: 22, height: 22 }} source={IMAGES.ICONS.UX_ICON} />
              <Text style={styles.ux}>UX</Text>
            </View>
            <Text style={styles.heading1}>Tap The Screen To Start</Text>
            <Text style={styles.heading2}>FLIP YOUR PHONE ONCE COUNTDOWN ENDS</Text>
          </TouchableOpacity>) : (initCountdown !== null && !hasGameStarted ? (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',  paddingBottom: 50 }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.countdown}>{initCountdown}</Text>
                <Text style={styles.heading2}>PREPARE YOUR BRAIN UXER</Text>
              </View>
            </View>
          ) : (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',  paddingBottom: 50 }}>
              <View style={{ width: '100%', paddingHorizontal: 20, alignItems: 'flex-start', marginTop: -50 }}>
                <Text style={{ fontFamily: 'montserrat-semibold', color: '#00B159', fontSize: 20 }}>{`${wordCountDown} SECS`}</Text>
                <Text
                  numberOfLines={word.title.split(' ').length > 1 ? 2 : 1}
                  minimumFontScale={0.2}
                  adjustsFontSizeToFit={true}
                  style={[styles.questionTitle, { lineHeight: word.title.split(' ').length > 1 ? 73 : undefined }]}
                >
                  {word.title}
                </Text>
                <TouchableOpacity style={{ marginTop: 20, flexDirection: 'row' }}>
                  <Text style={{ fontFamily: 'montserrat-bold', color: '#000', fontSize: 12 }}>LEARN ABOUT THIS</Text>
                  <Image style={{ marginLeft: 5 }} source={IMAGES.ICONS.ARROW_RIGHT} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.nextWord}
                onPress={() => this.nextWord()}
              >
                <Text style={{ fontFamily: 'montserrat-bold', color: '#fff', fontSize: 14 }}>{wordIndex === (words.length - 1) ? 'FINISH' : 'NEXT WORD'}</Text>
              </TouchableOpacity>
            </View>
          )
        )}
      </View>
    );
  }

  private handleOnChange(field: 'initCountdown' | 'hasGameStarted', value: boolean | number) {
    this.setState({ [field]: value } as any);
  }
}
