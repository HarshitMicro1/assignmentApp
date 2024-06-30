import {
  Image,
  StyleSheet,
  TextInput,
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {backIcon, crossIcon, searchIcon} from '../res/HelperFunctions';
import {normalizedHeight, normalizedWidth} from '../res/consts';
import {title} from 'process';

const screenWidth = Dimensions.get('window').width;

const Searchbar = ({
  onChangeText,
  searchData,
  testId,
  title,
}: {
  onChangeText: (text: string) => void;
  searchData: string;
  testId: string;
  title: string;
}) => {
  const animation = useRef(new Animated.Value(0)).current;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [isOpen, animation]);

  const animatedStyle = {
    width: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, screenWidth - 36],
    }),
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [screenWidth, 0],
        }),
      },
    ],
  };

  return (
    <>
      <View testID={testId} style={styles.header}>
        {!isOpen && (
          <>
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <Image source={backIcon} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
          </>
        )}
        <Animated.View
          style={[
            animatedStyle,
            {
              flexDirection: 'row',
              marginLeft: normalizedWidth(24),
              alignItems: 'center',
            },
          ]}>
          <TextInput
            placeholder={'Search ...'}
            onChangeText={onChangeText}
            style={styles.input}
            value={searchData}
          />
          {isOpen && (
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <Image
                tintColor={'white'}
                source={crossIcon}
                style={{width: 36, height: 36, marginLeft: 8}}
              />
            </TouchableOpacity>
          )}
        </Animated.View>
        {!isOpen && (
          <TouchableOpacity
            style={{position: 'absolute', right: 24}}
            onPress={() => setIsOpen(true)}>
            <Image source={searchIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingTop: normalizedHeight(16),
    paddingBottom: normalizedHeight(12),
    backgroundColor: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: normalizedHeight(16),
    },
    shadowOpacity: 0.85,
    shadowRadius: 5.84,
    elevation: 5,
    zIndex: 1,
  },
  arrow: {
    width: normalizedWidth(24),
    height: normalizedWidth(24),
    marginRight: normalizedWidth(8),
  },
  input: {
    width: screenWidth * 0.9,
    height: normalizedHeight(42),
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    color: 'black',
    flex: 1,
    paddingHorizontal: normalizedWidth(16),
  },
  icon: {
    width: normalizedWidth(24),
    height: normalizedWidth(24),
    marginLeft: normalizedWidth(8),
  },
  title: {
    fontFamily: 'TitilliumWeb-Regular',
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
    marginLeft: normalizedWidth(16),
  },
});
