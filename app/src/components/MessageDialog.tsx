import React from 'react';

import { Alignment, Button, Dialog, Direction, IMoleculeProps, MarkdownText, PaddingSize, Stack, TextAlignment } from '@kibalabs/ui-react';

export interface IMessageDialogTheme {
}

interface IMessageDialogProps extends IMoleculeProps<IMessageDialogTheme> {
  isOpen: boolean;
  maxHeight?: string;
  maxWidth?: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirmClicked: () => void;
  onCloseClicked: () => void;
}

export const MessageDialog = (props: IMessageDialogProps): React.ReactElement | null => {
  const cancelButtonText = props.cancelButtonText || 'Cancel';
  const confirmButtonText = props.confirmButtonText || 'Confirm';

  return (
    <Dialog isOpen={props.isOpen} onCloseClicked={props.onCloseClicked} maxHeight={props.maxHeight} maxWidth={props.maxWidth}>
      <Stack direction={Direction.Vertical} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
        <MarkdownText textAlignment={TextAlignment.Center} source={props.message} />
        <Stack.Item gutterBefore={PaddingSize.Default}>
          <Stack direction={Direction.Horizontal} contentAlignment={Alignment.Center} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
            <Button variant='secondary' onClicked={props.onCloseClicked} text={cancelButtonText} />
            <Button variant='tertiary' onClicked={props.onConfirmClicked} text={confirmButtonText} />
          </Stack>
        </Stack.Item>
      </Stack>
    </Dialog>
  );
};
