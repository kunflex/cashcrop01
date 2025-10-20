import AutoScroll from '@homielab/react-native-auto-scroll';
import * as React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default class App extends React.Component {
  render() {
    return (
      <View style={{ marginVertical: 10 }}>
        <AutoScroll
          style={styles.scrolling}
          duration={12000}
          endPaddingWidth={100} // space at the end
        >
          <View style={styles.row}>
            <Image
              style={styles.image}
              source={require('../assets/images/farmland.jpg')}
            />
            <Image
              style={styles.image}
              source={require('../assets/images/aloe_vera.png')}
            />
            {/* Add more images here */}
          </View>
        </AutoScroll>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrolling: {
    // AutoScroll container
  },
  row: {
    flexDirection: 'row', // make images horizontal
  },
  image: {
    width: screenWidth,
    height: 200,
    borderRadius: 10,
    marginRight: 10,
  },
});
