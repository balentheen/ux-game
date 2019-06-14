  import React from 'react';
  import { Image, View, Text, ScrollView, KeyboardAvoidingView, ImageBackground } from 'react-native';
  import { NavigationScreenProp, NavigationStackScreenOptions } from 'react-navigation';
  import { Button } from 'react-native-elements';

  import { ENV, STYLE, IMAGES } from '../../../constants';
  import styles from './styles';
  import { MenuItem } from '../shared/components';

  export interface ILoginProps {
    isLoading: boolean;
    hasError: boolean;
    navigation: NavigationScreenProp<any, any>;
    login: (email: string, password: string) => void;
    setNavigation: (navigation: NavigationScreenProp<any, any>) => void;
    checkForUpdates: () => void;
  }

  export interface ILoginState {
    email: string;
    password: string;
  }

  export default class Login extends React.PureComponent<ILoginProps, ILoginState> {
    public static navigationOptions: NavigationStackScreenOptions = {
      headerTintColor: STYLE.COLOR.WHITE,
      headerTitle: <Image source={IMAGES.ICONS.GAME_LOGO} />,
      headerStyle: { height: 50, backgroundColor: 'white', borderBottomWidth: 0, elevation: 0 }
    };

    public static isAndroid: boolean = ENV.PLATFORM.IS_ANDROID;

    public state: ILoginState = {
      email: 'dgeslin@makingsense.com',
      password: 'password'
    };

    public componentDidMount() {
      const { setNavigation, navigation, checkForUpdates } = this.props;
      setNavigation(navigation);
      checkForUpdates();
    }

    public render() {
      const { isLoading, hasError } = this.props;
      const { email, password } = this.state;

      return (
        <View style={styles.loginContainer}>
          <Text style={styles.heading1}>Select category</Text>
          <Text style={styles.heading2}>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized.</Text>
          <ScrollView
            style={styles.questionsContainer}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          >
            <MenuItem
              icon={IMAGES.ICONS.UX_ICON}
              title="UX"
              description="Our team of professionals in the United States, Argentina and Mexico, deliver end-to-end UX-focused software."
              onPress={() => this.props.navigation.navigate('Game')}
            />
            <MenuItem
              icon={IMAGES.ICONS.UX_ICON}
              title="UX"
              description="Our team of professionals in the United States, Argentina and Mexico, deliver end-to-end UX-focused software."
              onPress={() => this.props.navigation.navigate('Game')}
            />
            <MenuItem
              icon={IMAGES.ICONS.UX_ICON}
              title="UX"
              description="Our team of professionals in the United States, Argentina and Mexico, deliver end-to-end UX-focused software."
              onPress={() => this.props.navigation.navigate('Game')}
            />
            <MenuItem
              icon={IMAGES.ICONS.UX_ICON}
              title="UX"
              description="Our team of professionals in the United States, Argentina and Mexico, deliver end-to-end UX-focused software."
              onPress={() => this.props.navigation.navigate('Game')}
            />
          </ScrollView>
          <View style={{ position: 'absolute', bottom: 30, left: 0, right: 0, alignItems: 'center' }}>
            <Image source={IMAGES.ICONS.MS_GREEN} />
          </View>
        </View>

      );
    }

    private handleOnChange(field: 'email' | 'password', value: string) {
      this.setState({ [field]: value } as any);
    }

    private login = () => {
      const { email, password } = this.state;
      const { login } = this.props;
      login(email, password);
    }
  }
