import React from 'react';

import { truncateStart } from '@kibalabs/core';
import { Alignment, Box, Direction, Image, LinkBase, PaddingSize, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

export interface TokenCardProps {
  name?: string
  onClicked?: (imageUrl: string) => void;
  imageUrl?: string;
}

const defaultImage = '/assets/icon.png';

export const ImageView = (props:TokenCardProps): React.ReactElement => {
  const onClicked = (): void => {
    if (props.onClicked) {
      props.onClicked(props.imageUrl);
    }
  };

  let imageUrl = '';
  if (props.imageUrl?.startsWith('ipfs://')) {
    imageUrl = props.imageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }

  return (
    <LinkBase onClicked={onClicked}>
      <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldWrapItems={true}>
        <Box variant='tokenCard' shouldClipContent={true}>
          <Box height='9rem' width='9rem'>
            <Image source={ imageUrl || defaultImage} alternativeText='image' fitType='contain' />
          </Box>
          <Box>
            <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} padding={PaddingSize.Wide}>
              <Text variant='bold' alignment={TextAlignment.Center}>{truncateStart(props.name, 15)}</Text>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </LinkBase>
  );
};
