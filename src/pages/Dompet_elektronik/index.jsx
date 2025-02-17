import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import {
  DARK_BACKGROUND,
  DARK_COLOR,
  GREY_COLOR,
  HORIZONTAL_MARGIN,
  LIGHT_COLOR,
  REGULAR_FONT,
  SLATE_COLOR,
  WHITE_BACKGROUND,
} from '../../utils/const';
import {ArrowRight} from '../../assets';

export default function DompetElektronik({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';

  const layanans = [
    {label: 'ShopeePay'},
    {label: 'Ovo'},
    {label: 'Dana'},
    {label: 'Gopay'},
    {label: 'Grab'},
  ];
  return (
    <View style={styles.wrapper(isDarkMode)}>
      <View style={styles.container(isDarkMode)}>
        <View>
          {layanans.map(layanan => {
            return (
              <TouchableOpacity
                key={layanan.label}
                style={styles.layananButton(isDarkMode)}
                onPress={() =>
                  navigation.navigate('TopupDompet', {item: layanan.label})
                }>
                <Text style={styles.layananText(isDarkMode)}>
                  {layanan.label}
                </Text>
                <ArrowRight />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: isDarkMode => ({
    flex: 1,
    backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
  }),
  container: isDarkMode => ({
    marginHorizontal: HORIZONTAL_MARGIN,
    marginTop: 15,
  }),
  layananButton: isDarkMode => ({
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? SLATE_COLOR : GREY_COLOR,
    padding: 10,
    justifyContent: 'space-between',
  }),
  layananText: isDarkMode => ({
    fontFamily: REGULAR_FONT,
    color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
  }),
});
