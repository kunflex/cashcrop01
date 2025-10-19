import AutoScroll from '@homielab/react-native-auto-scroll';
import * as React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

const screenWidth = Dimensions.get('window').width; // get device width
export default class App extends React.Component {
  render() {
    return (
      <View>
        <AutoScroll
          style={styles.scrolling1}
          duration={12000}
          endPaddingWidth={100}>
          <Image
            style={styles.image}
            source={require('../assets/images/farmland.jpg')}
          />
        </AutoScroll>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: screenWidth,
    height: 250,
    borderRadius:10,
    backgroundColor:'white',
  },
  scrolling1: {
    marginVertical: 10,
  },
});
