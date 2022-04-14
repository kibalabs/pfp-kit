import React from 'react';

import { Alignment, Box, Direction, Image, LinkBase, PaddingSize, Stack, Text } from '@kibalabs/ui-react';

export const Footer = (): React.ReactElement => {
  return (
    <LinkBase target='https://milliondollartokenpage.com?ref=pfpkit'>
      <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true} padding={PaddingSize.Default}>
        <Text>Made by</Text>
        <Box shouldClipContent={true} width='1.5rem' height='1.5rem'>
          <Image source='/assets/mdtp.png' alternativeText='MDTP Logo' fitType='contain' />
        </Box>
        <Text> MillionDollarTokenPage</Text>
      </Stack>
    </LinkBase>
  );
};
