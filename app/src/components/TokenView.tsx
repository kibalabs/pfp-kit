import React from 'react';

import { Alignment, Box, Direction, IconButton, Image, KibaIcon, LinkBase, PaddingSize, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

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
    imageUrl = imageUrl.replace('ipfs://', 'https://kibalabs.mypinata.cloud/ipfs/');
  }

  return (
    <LinkBase onClicked={onClicked} isFullWidth={true}>
      <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} isFullWidth={true} isFullHeight={true} shouldAddGutters={true} padding={PaddingSize.Narrow}>
        <Box shouldClipContent={true} height='8em' width='8em'>
          <Image source={ imageUrl || defaultImage} alternativeText='image' fitType='contain' />
        </Box>
        <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} isFullWidth={true} shouldAddGutters={true}>
          <Text alignment={TextAlignment.Center}>{props.token.name}</Text>
          <IconButton icon={<KibaIcon iconId='ion-open-outline' />} target={`https://nft.tokenhunt.io/collections/${props.token.registryAddress}/tokens/${props.token.tokenId}`} />
        </Stack>
      </Stack>
    </LinkBase>
  );
};
