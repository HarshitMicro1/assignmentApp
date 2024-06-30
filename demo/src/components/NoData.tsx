import React from 'react';
import {Text, StyleSheet} from 'react-native';

const NoData = ({message}: {message: string}) => {
  return <Text style={styles.noData}>{message}</Text>;
};

const styles = StyleSheet.create({
  noData: {
    alignSelf: 'center',
    color: 'white',
    marginTop: 20,
  },
});

export default NoData;
