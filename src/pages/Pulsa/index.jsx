import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {
  BLUE_COLOR,
  DARK_BACKGROUND,
  DARK_COLOR,
  FONT_NORMAL,
  FONT_SEDANG,
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
import {product_data, product_pulsa} from '../../data/product_pulsa';
import {CheckProduct} from '../../assets';
import BottomModal from '../../components/BottomModal';
import Input from '../../components/form/Input';
import {api} from '../../utils/api';
import {numberWithCommas} from '../../utils/formatter';

export default function Pulsa({navigation}) {
  const isDarkmode = useColorScheme() === 'dark';
  const [nomorTujuan, setNomorTujuan] = useState('');
  const [type, setType] = useState('Pulsa');
  const [selectItem, setSelectItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [data_pulsa, setPulsa] = useState([]);
  const [paket_data, setPaketData] = useState([]);
  const [loading, setLoading] = useState(false);

  const product_type = useMemo(() => ['Pulsa', 'Data'], []);

  const clearNomor = () => {
    setNomorTujuan(null);
  };

  const handleProduct = async () => {
    setLoading(true);
    try {
      const response = await api.post(`/api/product/get-product-pulsa`, {
        customer_no: nomorTujuan,
      });
      setPulsa(response.data.data.pulsas);
      setPaketData(response.data.data.paket_data);
      setLoading(false);
      console.log(response.data.data.paket_data);
    } catch (error) {
      setLoading(false);
      // console.log(error);
      console.log(error);
    }
  };

  const handleTopup = async () => {
    try {
      const response = await api.post(`/api/digiflaz/topup`, {
        customer_no: nomorTujuan,
        sku: selectItem?.product_sku,
      });
      navigation.navigate('SuccessNotif', {
        item: response.data,
        product: selectItem,
      });
      console.log('response topup : ', response.data);
    } catch (error) {
      console.log('response error : ', error);
    }
  };

  // console.log('selected item : ', selectItem);

  // console.log('Type :', type);

  return (
    <>
      <SafeAreaView>
        <View style={{marginHorizontal: HORIZONTAL_MARGIN, marginTop: 15}}>
          <View style={{rowGap: 10}}>
            {/* <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: isDarkmode ? SLATE_COLOR : GREY_COLOR,
                backgroundColor: isDarkmode
                  ? DARK_BACKGROUND
                  : WHITE_BACKGROUND,
                padding: 10,
                fontFamily: REGULAR_FONT,
                // color: isDarkmode ? '' : DARK_COLOR,
                color: isDarkmode ? DARK_COLOR : LIGHT_COLOR,
              }}
              placeholder="Masukan nomor tujuan"
              placeholderTextColor={GREY_COLOR}
              keyboardType="numeric"
              value={nomorTujuan}
              onChangeText={text => setNomorTujuan(text)}
            /> */}
            <Input
              value={nomorTujuan}
              placeholder="Masukan nomor tujuan"
              onchange={text => setNomorTujuan(text)}
              ondelete={() => clearNomor()}
              type="numeric"
            />

            {loading ? (
              <View style={styles.button}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.buttonLabel}>Loading</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleProduct()}>
                <Text style={styles.buttonLabel}>Tampilkan produk</Text>
              </TouchableOpacity>
            )}
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
                      ? {borderBottomColor: BLUE_COLOR, borderBottomWidth: 2}
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
            {type === 'Pulsa' ? (
              <>
                {data_pulsa.map(p => {
                  return (
                    <TouchableOpacity
                      key={p.id}
                      style={[
                        styles.productWrapper(isDarkmode),
                        selectItem?.id === p.id
                          ? {borderColor: GREEN_COLOR}
                          : '',
                      ]}
                      onPress={() => setSelectItem(p)}>
                      <Text style={styles.productLabel(isDarkmode)}>
                        {p.product_name}
                      </Text>
                      <Text style={styles.productPrice(isDarkmode)}>
                        Rp.{numberWithCommas(p.product_seller_price)}
                      </Text>
                      {selectItem?.id === p.id && (
                        <CheckProduct
                          width={20}
                          style={{position: 'absolute', right: 7, top: 2}}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </>
            ) : (
              <>
                {paket_data.map(d => {
                  return (
                    <TouchableOpacity
                      key={d.id}
                      style={[
                        styles.productWrapper(isDarkmode),
                        selectItem?.id === d.id
                          ? {borderColor: GREEN_COLOR}
                          : '',
                      ]}
                      onPress={() => setSelectItem(d)}>
                      <Text style={styles.productLabel(isDarkmode)}>
                        {d.product_name}
                      </Text>
                      <Text style={styles.productPrice(isDarkmode)}>
                        Rp.{numberWithCommas(d.product_seller_price)}
                      </Text>
                      {selectItem?.id === d.id && (
                        <CheckProduct
                          width={20}
                          style={{position: 'absolute', right: 7, top: 2}}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </>
            )}
          </View>
          {/* <FlatList
            data={type === 'Pulsa' ? data_pulsa : paket_data}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginBottom: 25,
            }}
            contentContainerStyle={{
              marginTop: 20,
            }}
            renderItem={({item}) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.productWrapper(isDarkmode),
                  selectItem?.id === item.id ? {borderColor: GREEN_COLOR} : '',
                ]}
                onPress={() => setSelectItem(item)}>
                <Text style={styles.productLabel(isDarkmode)}>
                  {item.product_name}
                </Text>
                <Text style={styles.productPrice(isDarkmode)}>
                  Rp.{numberWithCommas(item.product_seller_price)}
                </Text>
                {selectItem?.id === item.id && (
                  <CheckProduct
                    width={20}
                    style={{position: 'absolute', right: 7, top: 2}}
                  />
                )}
              </TouchableOpacity>
            )}
          /> */}
        </View>
      </SafeAreaView>
      {selectItem && (
        <View style={styles.bottom(isDarkmode)}>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => setShowModal(!showModal)}>
            <Text style={styles.buttonLabel}>Lanjutkan</Text>
          </TouchableOpacity>
        </View>
      )}
      <BottomModal
        visible={showModal}
        onDismiss={() => setShowModal(!showModal)}
        title="Detail Transaksi"
        isDarkmode>
        <View>
          <View style={styles.modalData(isDarkmode)}>
            <Text style={styles.labelModalData(isDarkmode)}>Nomor Tujuan</Text>
            <Text style={styles.valueModalData(isDarkmode)}>{nomorTujuan}</Text>
          </View>
          <View style={styles.modalData(isDarkmode)}>
            <Text style={styles.labelModalData(isDarkmode)}>Produk</Text>
            <Text style={styles.valueModalData(isDarkmode)}>
              {selectItem?.product_name}
            </Text>
          </View>
          <View style={styles.modalData(isDarkmode)}>
            <Text style={styles.labelModalData(isDarkmode)}>Harga</Text>
            <Text style={styles.valueModalData(isDarkmode)}>
              Rp.{numberWithCommas(selectItem?.product_seller_price)}
            </Text>
          </View>
        </View>
        <View style={styles.bottom(isDarkmode)}>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => handleTopup()}>
            <Text style={styles.buttonLabel}>Bayar</Text>
          </TouchableOpacity>
        </View>
      </BottomModal>
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
  }),
  bottom: isDarkmode => ({
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: isDarkmode ? DARK_BACKGROUND : WHITE_BACKGROUND,
    padding: 10,
  }),
  bottomButton: {
    backgroundColor: BLUE_COLOR,
    padding: 10,
    borderRadius: 5,
  },
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
