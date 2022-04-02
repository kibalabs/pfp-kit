import React from 'react';

import { truncateStart } from '@kibalabs/core';
import { Alignment, Box, Direction, Image, LinkBase, PaddingSize, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

import { CollectionToken } from '../client/resources';

export interface TokenViewProps {
  token: CollectionToken;
  onClicked?: (token: CollectionToken) => void;
  imageUrl?: string;
}

const defaultImage = '/assets/icon.png';

export const TokenView = (props:TokenViewProps): React.ReactElement => {
  const onClicked = (): void => {
    if (props.onClicked) {
      props.onClicked(props.token);
    }
  };

  let imageUrl = props.token?.imageUrl || defaultImage;
  if (imageUrl?.startsWith('ipfs://')) {
    imageUrl = imageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }

  return (
    <LinkBase onClicked={onClicked}>
      <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldWrapItems={true}>
        <Box shouldClipContent={true}>
          <Box height='9rem' width='9rem'>
            <Image source={ imageUrl || defaultImage} alternativeText='image' fitType='contain' />
          </Box>
          <Box>
            <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} padding={PaddingSize.Wide}>
              <Text variant='bold' alignment={TextAlignment.Center}>{truncateStart(props.token.name, 15)}</Text>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </LinkBase>
  );
};
