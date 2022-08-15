import { useSession } from 'next-auth/react';
import Image from 'next/image';
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from '@paypal/paypal-js';
import { PayPalButtons } from '@paypal/react-paypal-js';

import { ThankYouForDonate } from '../ThankYouForDonate/inde';
import styles from './styles.module.scss';
import { useDonate } from '../../context';

type DonateProps = {};

export function Donate(props: DonateProps) {
  const { isDonator, addDonator } = useDonate();
  const { data: session } = useSession();

  const handleCreateOrder = (
    _: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const orderValue = 1.0;
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: orderValue.toString(),
          },
        },
      ],
    });
  };

  const handleOnApprove = async (
    _: OnApproveData,
    actions: OnApproveActions
  ): Promise<void> => {
    try {
      const order = await actions.order?.capture();

      if (!order) {
        return;
      }

      await addDonator(order);
    } catch (err) {}
  };

  return (
    <div className={styles.container}>
      <Image
        src='/images/rocket.svg'
        width={125}
        height={286}
        title='Apoie o projeto'
        alt='Apoie o projeto'
      />
      <div className={styles.content}>
        {isDonator && <ThankYouForDonate user={session?.user} />}

        <span className={styles.title}>Seja um apoiador deste projeto! 🏆</span>
        <span className={styles.subtitle}>
          Contribua com apenas <strong>R$ 1,00</strong>
        </span>
        <span className={styles.info}>
          Apareça na nossa home, tenha funcionalidades exclusivas.
        </span>

        <div className={styles.paypal}>
          <PayPalButtons
            createOrder={handleCreateOrder}
            onApprove={handleOnApprove}
            style={{ layout: 'vertical' }}
          />
        </div>
      </div>
    </div>
  );
}
