import React from 'react';

import { Alignment, Direction, PaddingSize, Spacing, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

export const FramesInfoPage = (): React.ReactElement => {
  return (
    <Stack direction={Direction.Vertical} isFullWidth={true} childAlignment={Alignment.Fill}>
      <Text variant='header2' alignment={TextAlignment.Center}>Hello Frames 🖼</Text>
      <Spacing variant={PaddingSize.Wide2} />
      <Text>Talk about frames...</Text>
    </Stack>
  );
};
