import {Alert, StyleSheet, Text, useColorScheme, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  FONT_NORMAL,
  GREY_COLOR,
  HORIZONTAL_MARGIN,
  LIGHT_COLOR,
  MEDIUM_FONT,
  REGULAR_FONT,
  WHITE_BACKGROUND,
  windowWidth,
} from '../../utils/const';
import Input from '../../components/form/Input';
import {product_dompet} from '../../data/product_dompet';
import BottomButton from '../../components/BottomButton';
import ProductList from '../../components/ProductList';
import BankList from '../../components/BankList';
import {api} from '../../utils/api';

export default function TopupSaldo() {
  // console.log(item);

  const [selectItem, setSelectItem] = useState(null);
  const isDarkMode = useColorScheme() === 'dark';
  const [amount, setAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  const resetInput = () => {
    setAmount('');
  };

  const banks = useMemo(() => ['bca', 'bni', 'bri', 'cimb'], []);

  const handleTopup = async () => {
    try {
      const response = await api.post(`/api/midtrans/topup`, {
        bank: selectedBank,
        amount: amount,
      });
      Alert.alert(
        'Sukses',
        'Tiket topup berhasil, silahkan cek riwayat transaksi',
        [{text: 'OK', onPress: () => {}}],
      );
    } catch (error) {
      console.log('error topup saldo : ', error);
    }
  };
  return (
    <>
      <View style={styles.container}>
        {/* <View style={{marginBottom: 15}}>
          <Text
            style={{
              fontFamily: MEDIUM_FONT,
              fontSize: 16,
              color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
            }}>
            {selectItem}
          </Text>
        </View> */}
        <View style={styles.formGroup}>
          <Input
            value={amount}
            placeholder="Masukan Jumlah topup"
            onchange={text => setAmount(text)}
            ondelete={resetInput}
            type="numeric"
            lebar={windowWidth * 0.9}
          />
        </View>

        <View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              rowGap: 25,
              marginTop: 20,
              columnGap: 5,
            }}>
            {banks.map(p => {
              return (
                <BankList
                  key={p}
                  selectItem={selectedBank}
                  data={p}
                  action={() => setSelectedBank(p)}
                />
              );
            })}
          </View>
        </View>
      </View>
      {selectedBank && (
        <BottomButton
          label="Buat Tiket"
          action={handleTopup}
          isLoading={false}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: HORIZONTAL_MARGIN,
    marginTop: 15,
  },
  formGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 5,
  },
  button: {
    backgroundColor: BLUE_COLOR,
    borderRadius: 5,
    padding: 15,
    flex: 1,
  },

  productWrapper: isDarkmode => ({
    borderWidth: 1,
    borderColor: GREY_COLOR,
    borderRadius: 10,
    padding: 20,
    width: '47%',
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
  }),
});
