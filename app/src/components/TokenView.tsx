import React from 'react';

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
    <LinkBase onClicked={onClicked} isFullWidth={true}>
      <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} isFullWidth={true} isFullHeight={true} shouldAddGutters={true} padding={PaddingSize.Narrow}>
        <Box shouldClipContent={true} height='8em' width='8em'>
          <Image source={ imageUrl || defaultImage} alternativeText='image' fitType='contain' />
        </Box>
        <Text alignment={TextAlignment.Center}>{props.token.name}</Text>
      </Stack>
    </LinkBase>
  );
};
