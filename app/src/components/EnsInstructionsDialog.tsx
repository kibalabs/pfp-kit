import React from 'react';

import { Alignment, Button, Dialog, Direction, KibaIcon, LinkBase, LoadingSpinner, MarkdownText, PaddingSize, ResponsiveTextAlignmentView, Spacing, Stack, Text, TextAlignment, useColors, Video } from '@kibalabs/ui-react';
import { toast } from 'react-toastify';

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
  const [isUploading, setIsUploading] = React.useState<boolean>(false);
  const [hasUploaded, setHasUploaded] = React.useState<boolean>(false);
  const [hasConfirmed, setHasConfirmed] = React.useState<boolean>(false);
  const [hasShared, setHasShared] = React.useState<boolean>(false);

  const onUploadClicked = (): void => {
    setIsUploading(true);
    props.onUploadClicked();
  };

  const onUpdateEnsClicked = (): void => {
    setHasUploaded(true);
  };

  const onConfirmEnsClicked = (): void => {
    setHasConfirmed(true);
  };

  const onShareClicked = (): void => {
    setHasShared(true);
  };

  const onSkipSharingClicked = (): void => {
    setHasShared(true);
  };

  const getShareText = (): string => {
    const shareText = "I've just updated my ENS NFT profile pic with https://pfpkit.xyz, it looks dope! Thanks to the guys from @mdtp_app 🤩";
    return encodeURIComponent(shareText);
  };

  const onCopyURIClicked = (): void => {
    window.navigator.clipboard.writeText(props.imageIpfsUrl);
    toast.success('Image URI copied');
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
              {isUploading ? (
                <LoadingSpinner />
              ) : (
                <Button variant='large-primary' text='Save PFP to IPFS' onClicked={onUploadClicked} />
              )}
            </React.Fragment>
          ) : !hasConfirmed ? (
            <React.Fragment>
              <Text variant='bold'>Step 2: Confirm you have an ENS address</Text>
              <Spacing variant={PaddingSize.Wide} />
              <Text>We&apos;re assuming you&apos;ve already got your ENS address set up 👀</Text>
              <MarkdownText source='If you don&apos;t, go [get one here](https://app.ens.domains)' />
              <Spacing variant={PaddingSize.Wide} />
              <Text>This is your image&apos;s URI, click it to copy it now!</Text>
              <LinkBase onClicked={onCopyURIClicked}>
                <Text variant='wrapped-colored'>{props.imageIpfsUrl}</Text>
              </LinkBase>
              <Spacing variant={PaddingSize.Wide} />
              <Button variant='large-primary' text='I have an ENS address and my image URI' onClicked={onConfirmEnsClicked} />
              <Spacing />
            </React.Fragment>
          ) : !hasUploaded ? (
            <React.Fragment>
              <Text variant='bold'>Step 3: Configure your ENS</Text>
              <Spacing variant={PaddingSize.Wide} />
              <Video source='/assets/ens-instructions.mp4' shouldAutoplay={true} shouldLoop={true} shouldShowControls={false} alternativeText='ENS instructions video' />
              <Spacing />
              <Text>Now you have to follow these steps:</Text>
              <Text>1. Click on the ENS you want to update</Text>
              <Text>2. Click ADD/EDIT RECORD</Text>
              <Text>3. Paste your IPFS url into the avatar box</Text>
              <Text>4. (Optional) Update any other fields you&apos; like to</Text>
              <Text>5. Click update and confirm the transaction</Text>
              <Spacing variant={PaddingSize.Wide} />
              <Button variant='large-primary' text='Take me to ENS' target={`https://app.ens.domains/address/${account.address}`} onClicked={onUpdateEnsClicked} />
              <Spacing />
            </React.Fragment>
          ) : !hasShared ? (
            <React.Fragment>
              <Text variant='bold'>Step 4: tell all your friends</Text>
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
