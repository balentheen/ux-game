  import React from 'react';
  import { Image, View, Text, ScrollView, KeyboardAvoidingView, ImageBackground, TouchableOpacity } from 'react-native';
  import { NavigationScreenProp, NavigationStackScreenOptions, NavigationActions } from 'react-navigation';
  import { Button } from 'react-native-elements';

  import { ENV, STYLE, IMAGES } from '../../../constants';
  import styles from './styles';
  import { MenuItem } from '../shared/components';

  export interface IGameState {
    hasGameStarted: boolean;
    initCountdown: number;
  }

  export default class Game extends React.PureComponent<{}, IGameState> {
    public static isAndroid: boolean = ENV.PLATFORM.IS_ANDROID;

    public state: IGameState = {
      hasGameStarted: false,
      initCountdown: null
    };

    public initCountdownInterval: any = null;

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
        }
      }, 1000);
    }

    public render() {
      const { hasGameStarted, initCountdown } = this.state;
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
            ) : <View />)
          }
        </View>
      );
    }

    private handleOnChange(field: 'initCountdown' | 'hasGameStarted', value: boolean | number) {
      this.setState({ [field]: value } as any);
    }
  }
