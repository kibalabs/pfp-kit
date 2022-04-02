import React from 'react';

import { truncateMiddle } from '@kibalabs/core';
import { Alignment, Box, Direction, Image, Stack, Text } from '@kibalabs/ui-react';

import { Account } from '../AccountContext';

interface IConnectedAccountProps {
  account: Account;
}

export const ConnectedAccount = (props: IConnectedAccountProps): React.ReactElement => {
  return (
    <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
      <Text>Connected with</Text>
      <Box variant='rounded' shouldClipContent={true} height='1.5em' width='1.5em'>
        <Image source={`https://web3-images-api.kibalabs.com/v1/accounts/${props.account.address}/image`} alternativeText='Avatar' />
      </Box>
      <Text>{truncateMiddle(props.account.address, 10)}</Text>
    </Stack>
  );
};
