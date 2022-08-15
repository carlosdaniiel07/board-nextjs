import React, { ReactElement, useState, useEffect, useMemo } from 'react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { OrderResponseBody } from '@paypal/paypal-js';
import { useSession } from 'next-auth/react';
import { firestore } from '../services/firebase';
import { DonatorModel } from '../models';

type DonateContextProps = {
  isDonator: boolean;
  addDonator(order?: OrderResponseBody): Promise<void>;
};

const DEFAULT_VALUE: DonateContextProps = {
  isDonator: false,
  addDonator: async () => {},
};

export const DonateContext =
  React.createContext<DonateContextProps>(DEFAULT_VALUE);

export function DonateProvider({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  const [donators, setDonators] = useState<DonatorModel[]>();
  const { data: session } = useSession();

  useEffect(() => {
    const loadDonators = async (): Promise<void> => {
      try {
        console.debug('Carregando doadores...');

        const dbQuery = query(collection(firestore, 'donators'));
        const querySnapshot = await getDocs(dbQuery);
        const data: DonatorModel[] = [];

        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          data.push({
            ...(docData as DonatorModel),
            createdAt: new Date(docData.createdAt.seconds * 1000),
            id: doc.id,
          });
        });

        setDonators(data);
      } catch (err) {}
    };

    !donators && loadDonators();
  }, [donators]);

  const isDonator = useMemo<boolean>(() => {
    const userId = Number(session?.userId);
    const donation = (donators ?? []).find((item) => item.userId === userId);
    const hasDonation = !!donation;

    return hasDonation;
  }, [donators, session?.userId]);

  const addDonator = async (order?: OrderResponseBody): Promise<void> => {
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
      const document = await addDoc(collection(firestore, 'donators'), donator);
      const createdDonator: DonatorModel = {
        ...donator,
        id: document.id,
      };

      setDonators([...(donators ?? []), createdDonator]);
    } catch (err) {}
  };

  return (
    <DonateContext.Provider
      value={{
        isDonator,
        addDonator,
      }}
    >
      {children}
    </DonateContext.Provider>
  );
}

export const useDonate = () =>
  React.useContext<DonateContextProps>(DonateContext);
