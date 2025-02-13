import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {
  DARK_BACKGROUND,
  DARK_COLOR,
  FONT_NORMAL,
  FONT_SEDANG,
  GREY_COLOR,
  HORIZONTAL_MARGIN,
  LIGHT_COLOR,
  MEDIUM_FONT,
  REGULAR_FONT,
  SLATE_COLOR,
  WHITE_BACKGROUND,
} from '../../utils/const';

export default function SuccessNotif({route}) {
  //   console.log(route.params);
  const isDarkmode = useColorScheme() === 'dark';
  const {item, nomor_tujuan} = route.params;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkmode ? DARK_BACKGROUND : WHITE_BACKGROUND,
      }}>
      <View
        style={{
          height: 150,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 15,
        }}>
        <AnimatedLottieView
          source={require('../../assets/lottie/success-animation.json')}
          autoPlay
          loop
        />
      </View>
      <View style={{marginHorizontal: HORIZONTAL_MARGIN}}>
        <View style={styles.modalData(isDarkmode)}>
          <Text style={styles.labelModalData(isDarkmode)}>Nomor Tujuan</Text>
          <Text style={styles.valueModalData(isDarkmode)}>{nomor_tujuan}</Text>
        </View>
        <View style={styles.modalData(isDarkmode)}>
          <Text style={styles.labelModalData(isDarkmode)}>Produk</Text>
          <Text style={styles.valueModalData(isDarkmode)}>
            {item?.product_name}
          </Text>
        </View>
        <View style={styles.modalData(isDarkmode)}>
          <Text style={styles.labelModalData(isDarkmode)}>Harga</Text>
          <Text style={styles.valueModalData(isDarkmode)}>
            {item?.product_price}
          </Text>
        </View>
        <View style={styles.modalData(isDarkmode)}>
          <Text style={styles.labelModalData(isDarkmode)}>SN</Text>
          <Text style={styles.valueModalData(isDarkmode)}>123141516784</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalData: isDarkmode => ({
    borderBottomWidth: 1,
    borderBottomColor: isDarkmode ? SLATE_COLOR : GREY_COLOR,
    paddingVertical: 5,
    rowGap: 5,
  }),
  labelModalData: isDarkmode => ({
    fontFamily: MEDIUM_FONT,
    fontSize: FONT_SEDANG,
    color: isDarkmode ? DARK_COLOR : LIGHT_COLOR,
  }),
  valueModalData: isDarkmode => ({
    fontFamily: REGULAR_FONT,
    fontSize: FONT_NORMAL,
    color: isDarkmode ? DARK_COLOR : LIGHT_COLOR,
  }),
});
