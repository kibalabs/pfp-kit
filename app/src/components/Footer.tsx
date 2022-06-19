import React from 'react';

import { Alignment, Box, Direction, Image, Link, LinkBase, PaddingSize, Spacing, Stack, Text } from '@kibalabs/ui-react';

export const Footer = (): React.ReactElement => {
  const getShareText = (): string => {
    return encodeURIComponent('I found the quickest way to update my NFT PFP - PFP Kit by the guys from @mdtp_app https://pfpkit.xyz 🙌');
  };

  return (
    <Stack direction={Direction.Vertical} shouldAddGutters={true} childAlignment={Alignment.Center}>
      <LinkBase target='https://www.tokenpage.xyz?ref=pfpkit'>
        <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true} padding={PaddingSize.Default}>
          <Text>Made by</Text>
          <Box shouldClipContent={true} width='1.5rem' height='1.5rem'>
            <Image source='/assets/tokenpage.png' alternativeText='TokenPage Logo' fitType='contain' />
          </Box>
          <Text>Token Page</Text>
        </Stack>
      </LinkBase>
      <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
        <Link text='Share the love' target={`https://twitter.com/intent/tweet?text=${getShareText()}`} />
        <Spacing />
        <Link text='About Frames' target='/frames' />
        <Spacing />
        <Link text='Our Partners' target='/partners' />
      </Stack>
    </Stack>
  );
};
