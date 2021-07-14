

import { StyleSheet,StatusBar } from 'react-native';

/**
 * Styles 
*/

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: `#f5f5f5`,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: StatusBar.currentHeight,

    },
    space: {
      width: 20, 
      height: 20,
    },
    btn:{
      width: 120,
      height: 60,
    },
    back_button: {
      color: 'blue',
      backgroundColor: '#f5f5f5',
      fontSize: 24,
      textAlign: 'center',

    },
    flexContainer: {
      flex: 1
    },

  });