import React from 'react';

import { Alignment, Button, Dialog, Direction, KibaIcon, PaddingSize, ResponsiveTextAlignmentView, Spacing, Stack, Text, TextAlignment, useColors, Video } from '@kibalabs/ui-react';

import { useAccount } from '../AccountContext';

interface IEnsInstructionsDialogProps {
  isOpen: boolean;
  imageIpfsUrl: string | null;
  onCloseClicked: () => void;
  onUploadClicked: () => void;
}

export const EnsInstructionsDialog = (props: IEnsInstructionsDialogProps): React.ReactElement => {
  const colors = useColors();
  const account = useAccount();
  const [hasUploaded, setHasUploaded] = React.useState<boolean>(false);
  const [hasShared, setHasShared] = React.useState<boolean>(false);

  const onUploadClicked = (): void => {
    props.onUploadClicked();
  };

  const onUpdateEnsClicked = (): void => {
    setHasUploaded(true);
  };

  const onShareClicked = (): void => {
    setHasShared(true);
  };

  const onSkipSharingClicked = (): void => {
    setHasShared(true);
  };

  const getShareText = (): string => {
    const shareText = "I've just updated my NFT profile pic with https://pfpkit.xyz, doesn't it look dope! Thanks to the guys from @mdtp_app 🤩";
    return encodeURIComponent(shareText);
  };

  React.useEffect((): void => {
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
          <Text variant='header3'>Pimp your ENS</Text>
          <Spacing />
          {!props.imageIpfsUrl ? (
            <React.Fragment>
              <Text variant='bold'>Step 1: save your new PFP to IPFS</Text>
              <Text>Hot damn, it&apos;s looking goooood 😻</Text>
              <Spacing variant={PaddingSize.Wide} />
              <Button variant='large-primary' text='Save PFP to IPFS' onClicked={onUploadClicked} />
            </React.Fragment>
          ) : !hasUploaded ? (
            <React.Fragment>
              <Text variant='bold'>Step 1: Configure your ENS</Text>
              <Spacing variant={PaddingSize.Wide} />
              <Video source='/assets/Ens-instructions.mp4' shouldAutoplay={true} shouldLoop={true} shouldShowControls={false} alternativeText='ENS instructions video' />
              <Spacing />
              <Text>We&apos;re assuming you&apos;ve already got your ENS address set up 👀</Text>
              <Spacing variant={PaddingSize.Wide} />
              <Button variant='large-primary' text='Update Ens Profile' target={`https://app.ens.domains/address/${account?.address}`} onClicked={onUpdateEnsClicked} />
              <Spacing />
            </React.Fragment>
          ) : !hasShared ? (
            <React.Fragment>
              <Text variant='bold'>Step 3: tell all your friends</Text>
              <Text>Oh wow, that was easy. Tell you friends so they can join you in the cool club 😎</Text>
              <Spacing variant={PaddingSize.Wide} />
              <Button variant='large-primary' text='Tell your friends' target={`https://twitter.com/intent/tweet?text=${getShareText()}`} onClicked={onShareClicked} />
              <Spacing />
              <Button variant='small' text='Skip' onClicked={onSkipSharingClicked} />
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
