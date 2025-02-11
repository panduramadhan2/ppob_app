import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  FONT_NORMAL,
  GREEN_COLOR,
  GREY_COLOR,
  HORIZONTAL_MARGIN,
  LIGHT_COLOR,
  MEDIUM_FONT,
  REGULAR_FONT,
  SLATE_COLOR,
  WHITE_BACKGROUND,
  windowWidth,
} from '../../utils/const';
import { product_data, product_pulsa } from '../../data/product_pulsa';
import { CheckProduct } from '../../assets';

export default function Pulsa() {
  const isDarkmode = useColorScheme() === 'dark';
  const [nomorTujuan, setNomorTujuan] = useState('');
  const [type, setType] = useState('Pulsa');
  const [selectItem, setSelectItem] = useState(null);
  const product_type = ['Pulsa', 'Data'];

  console.log('selected item : ', selectItem);

  console.log('Type :', type);

  return (
    <>

      <SafeAreaView>
        <View style={{ marginHorizontal: HORIZONTAL_MARGIN, marginTop: 15 }}>
          <View style={{ rowGap: 10 }}>
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: isDarkmode ? SLATE_COLOR : GREY_COLOR,
                backgroundColor: isDarkmode ? DARK_BACKGROUND : WHITE_BACKGROUND,
                padding: 10,
                fontFamily: REGULAR_FONT,
              }}
              placeholder="Masukan nomor tujuan"
              placeholderTextColor={GREY_COLOR}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonLabel}>Tampilkan produk</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              columnGap: 15,
              // justifyContent: 'space-between',
            }}>
            {product_type.map(t => {
              return (
                <TouchableOpacity
                  key={t}
                  style={[
                    styles.buttonTab,
                    t === type
                      ? { borderBottomColor: BLUE_COLOR, borderBottomWidth: 2 }
                      : '',
                  ]}
                  onPress={() => setType(t)}>
                  <Text
                    style={[
                      styles.buttonTabLabel(isDarkmode),
                      t === type
                        ? {
                          color: BLUE_COLOR,
                        }
                        : '',
                    ]}>
                    {t}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {/* PRODUK */}
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              rowGap: 25,
              marginTop: 20,
            }}>
            {type == 'Pulsa' ? (
              <>
                {product_pulsa.map(p => {
                  return (
                    <TouchableOpacity
                      key={p.id}
                      style={[styles.productWrapper(isDarkmode), selectItem?.id == p.id ? { borderColor: GREEN_COLOR } : '']}
                      onPress={() => setSelectItem(p)}>
                      <Text style={styles.productLabel(isDarkmode)}>
                        {p.product_name}
                      </Text>
                      <Text style={styles.productPrice(isDarkmode)}>
                        {p.product_price}
                      </Text>
                      {
                        selectItem?.id == p.id && (<CheckProduct width={20} style={{ position: 'absolute', right: 7, top: 2 }} />)
                      }

                    </TouchableOpacity>
                  );
                })}
              </>
            ) : (
              <>
                {product_data.map(d => {
                  return (
                    <TouchableOpacity
                      key={d.id}
                      style={[styles.productWrapper(isDarkmode), selectItem?.id == d.id ? { borderColor: GREEN_COLOR } : '']}
                      onPress={() => setSelectItem(d)}>
                      <Text style={styles.productLabel(isDarkmode)}>
                        {d.product_name}
                      </Text>
                      <Text style={styles.productPrice(isDarkmode)}>
                        {d.product_price}
                      </Text>
                      {
                        selectItem?.id == d.id && (<CheckProduct width={20} style={{ position: 'absolute', right: 7, top: 2 }} />)
                      }
                    </TouchableOpacity>
                  );
                })}
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.bottom(isDarkmode)}>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.buttonLabel}>Lanjutkan</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: BLUE_COLOR,
    borderRadius: 5,
    padding: 5,
  },
  buttonLabel: {
    fontFamily: REGULAR_FONT,
    color: WHITE_BACKGROUND,
    textAlign: 'center',
  },
  buttonTab: {
    width: '47%',
    borderBottomColor: GREY_COLOR,
    borderBottomWidth: 1,
    padding: 5,
  },
  buttonTabLabel: isDarkmode => ({
    textAlign: 'center',
    color: isDarkmode ? DARK_COLOR : LIGHT_COLOR,
    fontFamily: REGULAR_FONT,
  }),
  productWrapper: isDarkmode => ({
    borderWidth: 1,
    borderColor: GREY_COLOR,
    borderRadius: 10,
    padding: 20,
    width: '45%',
    // width: windowWidth / 2 - 30,
    backgroundColor: isDarkmode ? DARK_BACKGROUND : WHITE_BACKGROUND,
  }),
  productLabel: isDarkmode => ({
    fontFamily: MEDIUM_FONT,
    fontSize: FONT_NORMAL,
    color: isDarkmode ? DARK_COLOR : LIGHT_COLOR,
  }),
  productPrice: isDarkmode => ({
    fontFamily: REGULAR_FONT,
    color: isDarkmode ? DARK_COLOR : LIGHT_COLOR,
  }), bottom: isDarkmode => ({
    position: 'absolute',
    bottom: 0, backgroundColor: isDarkmode ? DARK_BACKGROUND : WHITE_BACKGROUND,
  }), bottomButton: {
    backgroundColor: BLUE_COLOR,
  }
});
