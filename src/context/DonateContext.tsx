import React, { ReactElement, useState } from 'react';

type DonateContextProps = {
  isDonator: boolean;
  setAsDonator(): Promise<void>;
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

  const setAsDonator = async (): Promise<void> => {
    setIsDonator(true);
    await Promise.resolve();

    // TODO: save donator in a Firebase collection
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
