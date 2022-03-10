import React from 'react';

import { Alignment, Button, ContainingView, Direction, PaddingSize, Stack, Text } from '@kibalabs/ui-react';

import { useAccount, useOnLinkAccountsClicked } from '../AccountContext';

export const HomePage = (): React.ReactElement => {
  const account = useAccount();
  const onLinkAccountsClicked = useOnLinkAccountsClicked();

  const onConnectWalletClicked = async (): Promise<void> => {
    await onLinkAccountsClicked();
  };
  return (
    <ContainingView>
      <Stack direction={Direction.Vertical} isFullWidth={true} isFullHeight={true} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} padding={PaddingSize.Wide2} shouldAddGutters={true}>

        <Text variant='header1'>PFP KIT</Text>
        {!account?.address && (
          <Button variant='large-secondary' text= 'Connect Your Wallet' onClicked={onConnectWalletClicked} />
        )
        }
      </Stack>
    </ContainingView>
  );
};
