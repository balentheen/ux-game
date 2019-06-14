import React from 'react';
import { Text, View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

import styles from './styles';

export interface IMenuItemProps {
  icon: ImageSourcePropType;
  title: string;
  description: string;
  onPress?: () => void;
}

export default class MenuItem extends React.PureComponent<IMenuItemProps, {}> {

  public render() {
    const { title, description, icon, onPress } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress} style={styles.questionContainer}>
          <Image source={icon} />
          <Text style={styles.question}>{title}</Text>
          <Text style={styles.section}>{description}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
