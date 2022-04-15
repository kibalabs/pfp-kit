import React from 'react';

import { Alignment, Box, Direction, Image, PaddingSize, Pill, Spacing, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

export interface PartnersViewProps {
  imageUrl: string;
  title: string
  description: string;
  type: string;
}

export const PartnersView = (props:PartnersViewProps): React.ReactElement => {
  return (
    <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} isFullWidth={true} isFullHeight={true} shouldAddGutters={true} padding={PaddingSize.Wide2}>
      <Box shouldClipContent={true} height='5em' width='5em'>
        <Image source={ props.imageUrl } alternativeText='image' fitType='contain' />
      </Box>
      <Spacing variant={PaddingSize.Default} />
      <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} isFullWidth={true} isFullHeight={true}>
        <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Start} isFullWidth={true} isFullHeight={true} shouldAddGutters={true}>
          <Text alignment={TextAlignment.Right} variant='header5'>{props.title}</Text>
          <Pill variant='primary' text={props.type} />
        </Stack>
        <Text>{props.description}</Text>
      </Stack>
    </Stack>
  );
};
