import {createContext, useContext, useEffect, useState} from 'react';
import {api} from '../utils/api';

const SaldoContext = createContext();

function SaldoProvider({children}) {
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    const getSaldo = async () => {
      try {
        const response = await api.post('/api/digiflaz/get-saldo');
        setSaldo(response.data);
      } catch (error) {
        console.log('error get saldo user : ', error);
      }
    };
    getSaldo();
  }, []);
  return (
    <SaldoContext.Provider value={{saldo}}>{children}</SaldoContext.Provider>
  );
}

export const useSaldo = () => useContext(SaldoContext);
export default SaldoProvider;
