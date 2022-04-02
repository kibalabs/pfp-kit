import React from 'react';

import { Alignment, Button, Dialog, Direction, KibaIcon, PaddingSize, ResponsiveTextAlignmentView, Spacing, Stack, Text, TextAlignment, useColors, Video } from '@kibalabs/ui-react';

interface ITwitterInstructionsDialogProps {
  isOpen: boolean;
  onCloseClicked: () => void;
  onDownloadClicked: () => void;
}

export const TwitterInstructionsDialog = (props: ITwitterInstructionsDialogProps): React.ReactFragment => {
  const colors = useColors();
  const [hasDownloaded, setHasDownloaded] = React.useState<boolean>(false);
  const [hasUploaded, setHasUploaded] = React.useState<boolean>(false);
  const [hasShared, setHasShared] = React.useState<boolean>(false);

  const onDownloadClicked = (): void => {
    props.onDownloadClicked();
    setTimeout((): void => {
      setHasDownloaded(true);
    }, 300);
  };

  const onSkipClicked = (): void => {
    setHasDownloaded(true);
  };

  const onUpdateTwitterClicked = (): void => {
    setHasUploaded(true);
  };

  const onShareClicked = (): void => {
    setHasShared(true);
  };

  const getShareText = (): string => {
    const shareText = "I've just updated my NFT profile pic with https://pfpkit.xyz, doesn't it look dope! Thanks to the guys from @mdtp_app 🤩";
    return encodeURIComponent(shareText);
  };

  React.useEffect((): void => {
    setHasDownloaded(false);
    setHasUploaded(false);
    setHasShared(false);
  }, [props.isOpen]);

  return (
    <Dialog
      isOpen={props.isOpen}
      onCloseClicked={props.onCloseClicked}
      maxWidth='500px'
      maxHeight='90%'
    >
      <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
        <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
          <Text variant='header3'>Pimp your Twitter</Text>
          <Spacing />
          {!hasDownloaded ? (
            <React.Fragment>
              <Text variant='bold'>Step 1: save your new PFP</Text>
              <Text>Hot damn, it&apos;s looking goooood 😻</Text>
              <Spacing variant={PaddingSize.Wide} />
              <Button variant='large-primary' text='Save PFP' onClicked={onDownloadClicked} />
              <Spacing />
              <Button variant='small' text='Skip' onClicked={onSkipClicked} />
            </React.Fragment>
          ) : !hasUploaded ? (
            <React.Fragment>
              <Text variant='bold'>Step 2: upload to Twitter</Text>
              <Text>All you gotta do is click the button below and then drag and drop like in this gif</Text>
              <Spacing variant={PaddingSize.Wide} />
              <Video source='/assets/twitter-instructions.mp4' shouldAutoplay={true} shouldLoop={true} shouldShowControls={false} alternativeText='Twitter instructions video' />
              <Spacing variant={PaddingSize.Wide} />
              <Button variant='large-primary' text='Update Twitter Profile' target='https://twitter.com/settings/profile' onClicked={onUpdateTwitterClicked} />
              <Spacing />
            </React.Fragment>
          ) : !hasShared ? (
            <React.Fragment>
              <Text variant='bold'>Step 3: tell all your friends</Text>
              <Text>Oh wow, that was easy. Tell you friends so they can join you in the cool club 😎</Text>
              <Spacing variant={PaddingSize.Wide} />
              <Button variant='large-primary' text='Tell your friends' target={`https://twitter.com/intent/tweet?text=${getShareText()}`} onClicked={onShareClicked} />
              <Spacing />
              <Button variant='small' text='Skip' onClicked={onSkipClicked} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <KibaIcon iconId='ion-checkmark-circle' variant='extraLarge' _color={colors.success} />
              <Spacing />
              <Text variant='bold'>All done</Text>
              <Spacing />
              <Button text='Sweet' onClicked={props.onCloseClicked} />
            </React.Fragment>
          )}
        </Stack>
      </ResponsiveTextAlignmentView>
    </Dialog>
  );
};
