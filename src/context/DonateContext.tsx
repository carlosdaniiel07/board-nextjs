import React, { ReactElement, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { OrderResponseBody } from '@paypal/paypal-js';
import { useSession } from 'next-auth/react';
import { firestore } from '../services/firebase';
import { DonatorModel } from '../models';

type DonateContextProps = {
  isDonator: boolean;
  setAsDonator(order?: OrderResponseBody): Promise<void>;
};

const DEFAULT_VALUE: DonateContextProps = {
  isDonator: false,
  setAsDonator: async () => {},
};

export const DonateContext =
  React.createContext<DonateContextProps>(DEFAULT_VALUE);

export function DonateProvider({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  const [isDonator, setIsDonator] = useState(false);
  const { data: session } = useSession();

  const setAsDonator = async (order?: OrderResponseBody): Promise<void> => {
    try {
      console.debug('Registrando doação...');

      const orderValue = Number(order?.purchase_units[0].amount.value ?? 0);
      const orderId = order?.id ?? '';
      const donator: DonatorModel = {
        value: orderValue,
        userId: Number(session?.userId),
        userImageUrl: session?.user?.image ?? '',
        orderId,
        createdAt: new Date(),
      };

      await addDoc(collection(firestore, 'donators'), donator);
      setIsDonator(true);
    } catch (err) {}
  };

  return (
    <DonateContext.Provider
      value={{
        isDonator,
        setAsDonator,
      }}
    >
      {children}
    </DonateContext.Provider>
  );
}

export const useDonate = () =>
  React.useContext<DonateContextProps>(DonateContext);
