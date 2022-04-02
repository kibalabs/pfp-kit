import React from 'react';

import { Alignment, Box, Button, ContainingView, Direction, Image, KibaIcon, PaddingSize, Spacing, Stack, Text } from '@kibalabs/ui-react';

import { useAccount, useOnLinkAccountsClicked } from '../AccountContext';
import { CollectionToken } from '../client/resources';
import { ConnectedAccount } from '../components/ConnectedAccount';
import { Footer } from '../components/Footer';
import { ImageCanvasView } from '../components/ImageCanvasView';
import { ImageChooserDialog } from '../components/ImageChooserDialog';
import { useGlobals } from '../globalsContext';

export type UpdateResult = {
  isSuccess: boolean;
  message: string;
}

export const HomePage = (): React.ReactElement => {
  const account = useAccount();
  const { notdClient, web3StorageClient } = useGlobals();
  const [profileImageUrl, setProfileImageUrl] = React.useState<string>(null);
  const [frameImageUrl, setFrameImageUrl] = React.useState<string>(null);
  const [ownerTokens, setOwnerTokens] = React.useState<CollectionToken[] | undefined | null>(undefined);
  const [isProfileImageChooserOpen, setIsProfileImageChooserOpen] = React.useState<boolean>(false);
  const [isFrameImageChooserOpen, setIsFrameImageChooserOpen] = React.useState<boolean>(false);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const onLinkAccountsClicked = useOnLinkAccountsClicked();

  const onConnectWalletClicked = async (): Promise<void> => {
    await onLinkAccountsClicked();
  };

  const onProfileImageChosen = (imageUrl: string): void => {
    let resolvedImageUrl = imageUrl;
    if (resolvedImageUrl.startsWith('ipfs://')) {
      resolvedImageUrl = resolvedImageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
    }
    setProfileImageUrl(resolvedImageUrl);
    setIsProfileImageChooserOpen(false);
  };

  const onFrameImageChosen = (imageUrl: string): void => {
    let resolvedImageUrl = imageUrl;
    if (resolvedImageUrl.startsWith('ipfs://')) {
      resolvedImageUrl = resolvedImageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
    }
    setFrameImageUrl(resolvedImageUrl);
    setIsFrameImageChooserOpen(false);
  };

  const onChooseProfileImageClicked = (): void => {
    setIsProfileImageChooserOpen(true);
  };

  const onProfileImageChooserCloseClicked = (): void => {
    setIsProfileImageChooserOpen(false);
  };

  const onChooseFrameImageClicked = (): void => {
    setIsFrameImageChooserOpen(true);
  };

  const onFrameImageChooserCloseClicked = (): void => {
    setIsFrameImageChooserOpen(false);
  };

  const refreshOwnerTokens = React.useCallback(async (): Promise<void> => {
    setOwnerTokens(undefined);
    notdClient.getOwnerTokens(account?.address).then((tokens: CollectionToken[]): void => {
      setOwnerTokens(tokens);
    }).catch((error: unknown): void => {
      console.error(error);
      setOwnerTokens(null);
    });
  }, [notdClient, account?.address]);

  React.useEffect((): void => {
    refreshOwnerTokens();
  }, [refreshOwnerTokens]);

  const onRefreshTokensClicked = async (): Promise<void> => {
    setOwnerTokens(undefined);
    await notdClient.refreshAccountTokenOwnerships(account.address);
    await refreshOwnerTokens();
  };

  const onSetTwitterClicked = (): void => {

  };

  const onSetDiscordClicked = (): void => {
    console.error('onSetDiscordClicked not implemented');
  };

  const onSetEnsClicked = (): void => {
    console.error('onSetEnsClicked not implemented');
  };

  const onDownloadClicked = (): void => {
    if (!canvasRef.current) {
      return;
    }
    const a = document.createElement('a');
    a.href = canvasRef.current.toDataURL('image/png');
    a.download = 'pfpkit-output.png';
    document.body.appendChild(a);
    a.click();
  };

  const uploadImageToIpfs = async (file: File): Promise<string> => {
    return web3StorageClient.put([file], { wrapWithDirectory: false });
  };

  return (
    <ContainingView>
      <Stack direction={Direction.Vertical} isFullHeight={true} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true} paddingTop={PaddingSize.Wide2} paddingBottom={PaddingSize.Wide} paddingHorizontal={PaddingSize.Wide}>
        {!account ? (
          <React.Fragment>
            <Stack.Item growthFactor={1} shrinkFactor={1}>
              <Spacing variant={PaddingSize.Wide2} />
            </Stack.Item>
            <Image source='/assets/logo.svg' alternativeText='PFP Kit Logo' />
            <Spacing variant={PaddingSize.Wide} />
            <Button variant='primary-large' text= 'Connect Your Wallet' onClicked={onConnectWalletClicked} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Stack.Item growthFactor={1} shrinkFactor={1} />
            <Image source='/assets/logo.svg' alternativeText='PFP Kit Logo' />
            <ConnectedAccount account={account} />
            <Stack.Item growthFactor={1} shrinkFactor={1}>
              <Spacing variant={PaddingSize.Wide2} />
            </Stack.Item>
            <Stack directionResponsive={{ base: Direction.Vertical, medium: Direction.Horizontal }} isFullWidth={true} childAlignment={Alignment.Center} contentAlignment={Alignment.Center}>
              <ImageCanvasView canvasRef={canvasRef} profileImageUrl={profileImageUrl} frameImageUrl={frameImageUrl} />
              <Stack direction={Direction.Vertical} childAlignment={Alignment.Start} contentAlignment={Alignment.Center} shouldAddGutters={true} padding={PaddingSize.Wide2}>
                <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
                  <Text>Picture: </Text>
                  {profileImageUrl && (
                    <Box variant='rounded' shouldClipContent={true} width='1.5rem' height='1.5rem'>
                      <Image source={profileImageUrl} alternativeText='image' fitType='contain' />
                    </Box>
                  )}
                  <Button variant='secondary' text={profileImageUrl ? 'change' : 'choose'} onClicked={onChooseProfileImageClicked} />
                </Stack>
                <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
                  <Text>Frame: </Text>
                  {frameImageUrl && (
                    <Box variant='rounded' shouldClipContent={true} width='1.5rem' height='1.5rem'>
                      <Image source={frameImageUrl} alternativeText='image' fitType='contain' />
                    </Box>
                  )}
                  <Button variant='secondary' text={frameImageUrl ? 'change' : 'choose'} onClicked={onChooseFrameImageClicked} />
                </Stack>
                <Spacing variant={PaddingSize.Wide} />
                {profileImageUrl && (
                  <React.Fragment>
                    <Button variant='secondary' text={'Download'} iconLeft={<KibaIcon iconId='ion-download' />} iconGutter={PaddingSize.Wide} onClicked={onDownloadClicked} />
                    <Button variant='secondary' text={'Set Twitter PFP'} iconLeft={<KibaIcon iconId='ion-logo-twitter' />} iconGutter={PaddingSize.Wide} onClicked={onSetTwitterClicked} />
                    <Button variant='secondary' text={'Set Discord PFP'} iconLeft={<KibaIcon iconId='ion-logo-discord' />} iconGutter={PaddingSize.Wide} onClicked={onSetDiscordClicked} />
                    <Button variant='secondary' text={'Set ENS PFP'} iconLeft={<KibaIcon iconId='ion-globe' />} iconGutter={PaddingSize.Wide} onClicked={onSetEnsClicked} />
                  </React.Fragment>
                )}
              </Stack>
            </Stack>
          </React.Fragment>
        )}
        <Stack.Item growthFactor={2} shrinkFactor={1} />
        <Footer />
      </Stack>
      <ImageChooserDialog
        isOpen={isProfileImageChooserOpen}
        title='Choose your picture'
        shouldShowFramesOnly={false}
        onCloseClicked={onProfileImageChooserCloseClicked}
        ownerTokens={ownerTokens}
        onImageChosen={onProfileImageChosen}
        onRefreshTokensClicked={onRefreshTokensClicked}
        uploadImageToIpfs={uploadImageToIpfs}
      />
      <ImageChooserDialog
        isOpen={isFrameImageChooserOpen}
        title='Choose your frame'
        shouldShowFramesOnly={true}
        onCloseClicked={onFrameImageChooserCloseClicked}
        ownerTokens={ownerTokens}
        onImageChosen={onFrameImageChosen}
        onRefreshTokensClicked={onRefreshTokensClicked}
        uploadImageToIpfs={uploadImageToIpfs}
      />
    </ContainingView>
  );
};
