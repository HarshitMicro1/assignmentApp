import React from 'react';
import {View, Image, Text, StyleSheet, Dimensions} from 'react-native';
import {normalizedHeight, normalizedWidth} from '../res/consts';

const ListItem = ({title, posterUrl}: {title: string; posterUrl: any}) => {
  return (
    <View testID={'testID' + title} style={styles.item}>
      <Image source={posterUrl} style={styles.image} resizeMode="contain" />
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: (Dimensions.get('window').width - 64) / 3,
    marginHorizontal: normalizedWidth(8),
    marginBottom: normalizedWidth(24),
  },
  image: {
    width: '100%',
    height: normalizedHeight(200),
  },
  title: {
    marginTop: normalizedHeight(8),
    fontSize: 16,
    color: '#fff',
    textAlign: 'left',
    fontFamily: 'TitilliumWeb-Regular',
  },
});

export default ListItem;
