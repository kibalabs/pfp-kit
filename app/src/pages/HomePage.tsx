import React from 'react';

import { useIntegerUrlQueryState } from '@kibalabs/core-react';
import { Alignment, Box, Button, ContainingView, Direction, Image, KibaIcon, LoadingSpinner, PaddingSize, Spacing, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

import { useAccount, useOnLinkAccountsClicked } from '../AccountContext';
import { CollectionToken } from '../client/resources';
import { ConnectedAccount } from '../components/ConnectedAccount';
import { DiscordInstructionsDialog } from '../components/DiscordInstructionsDialog';
import { EnsInstructionsDialog } from '../components/EnsInstructionsDialog';
import { Footer } from '../components/Footer';
import { ImageCanvasView } from '../components/ImageCanvasView';
import { ImageChooserDialog } from '../components/ImageChooserDialog';
import { TwitterInstructionsDialog } from '../components/TwitterInstructionsDialog';
import { useGlobals } from '../globalsContext';

export type UpdateResult = {
  isSuccess: boolean;
  message: string;
}

export const HomePage = (): React.ReactElement => {
  const account = useAccount();
  const [isFramesEnabled, _] = useIntegerUrlQueryState('isFramesEnabled');
  const { notdClient, web3StorageClient } = useGlobals();
  const [profileImageUrl, setProfileImageUrl] = React.useState<string>(null);
  const [frameImageUrl, setFrameImageUrl] = React.useState<string>(null);
  const [ownerTokens, setOwnerTokens] = React.useState<CollectionToken[] | undefined | null>(undefined);
  const [isProfileImageChooserOpen, setIsProfileImageChooserOpen] = React.useState<boolean>(false);
  const [isFrameImageChooserOpen, setIsFrameImageChooserOpen] = React.useState<boolean>(false);
  const [isTwitterInstructionsOpen, setIsTwitterInstructionsOpen] = React.useState<boolean>(false);
  const [isDiscordInstructionsOpen, setIsDiscordInstructionsOpen] = React.useState<boolean>(false);
  const [isEnsInstructionsOpen, setIsEnsInstructionsOpen] = React.useState<boolean>(false);
  const [isUploading, setIsUploading] = React.useState<boolean>(false);
  const [imageIpfsUrl, setImageIpfsUrl] = React.useState<string | null>(null);
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
    setIsTwitterInstructionsOpen(true);
  };

  const onTwitterInstructionsCloseClicked = (): void => {
    setIsTwitterInstructionsOpen(false);
  };

  const onSetDiscordClicked = async (): Promise<void> => {
    setIsDiscordInstructionsOpen(true);
  };

  const onDiscordInstructionsCloseClicked = (): void => {
    setIsDiscordInstructionsOpen(false);
  };

  const onSetEnsClicked = (): void => {
    setIsEnsInstructionsOpen(true);
  };

  const onEnsInstructionsCloseClicked = (): void => {
    setIsEnsInstructionsOpen(false);
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

  const onUploadClicked = async (): Promise<void> => {
    if (!canvasRef.current) {
      return;
    }
    setIsUploading(true);
    canvasRef.current.toBlob((blob: Blob | null): void => {
      web3StorageClient.put([new File([blob], 'pfp.png')], { wrapWithDirectory: false }).then((cid: string): void => {
        setImageIpfsUrl(`ipfs://${cid}`);
        setIsUploading(false);
      });
    }, 'image/png');
  };

  const onCopyIpfsUriClicked = (): void => {
    window.navigator.clipboard.writeText(imageIpfsUrl);
  };

  React.useEffect((): void => {
    setImageIpfsUrl(null);
  }, [profileImageUrl, frameImageUrl]);

  const getShareText = (): string => {
    return encodeURIComponent('I found the quickest way to update my NFT PFP - PFP Kit by the guys from @mdtp_app https://pfpkit.xyz 🙌');
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
            <Text alignment={TextAlignment.Center} variant='header2'>Set your NFT PFP in seconds</Text>
            <Spacing variant={PaddingSize.Wide2} />
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
                  <Button variant='tertiary' text={profileImageUrl ? 'change' : 'choose'} onClicked={onChooseProfileImageClicked} />
                </Stack>
                {isFramesEnabled && (
                  <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
                    <Text>Frame: </Text>
                    {frameImageUrl && (
                      <Box variant='rounded' shouldClipContent={true} width='1.5rem' height='1.5rem'>
                        <Image source={frameImageUrl} alternativeText='image' fitType='contain' />
                      </Box>
                    )}
                    <Button variant='tertiary' text={frameImageUrl ? 'change' : 'choose'} onClicked={onChooseFrameImageClicked} />
                  </Stack>
                )}
                <Spacing variant={PaddingSize.Wide} />
                {profileImageUrl && (
                  <React.Fragment>
                    {isUploading ? (
                      <LoadingSpinner />
                    ) : imageIpfsUrl ? (
                      <Button variant='tertiary' text={'Copy IPFS URI'} iconLeft={<KibaIcon iconId='ion-copy' />} iconGutter={PaddingSize.Wide} onClicked={onCopyIpfsUriClicked} />
                    ) : (
                      <Button variant='tertiary' text={'Upload to IPFS'} iconLeft={<KibaIcon iconId='ion-cloud-upload' />} iconGutter={PaddingSize.Wide} onClicked={onUploadClicked} />
                    )}
                    <Button variant='tertiary' text={'Download'} iconLeft={<KibaIcon iconId='ion-download' />} iconGutter={PaddingSize.Wide} onClicked={onDownloadClicked} />
                    <Button variant='tertiary' text={'Set Twitter PFP'} iconLeft={<KibaIcon iconId='ion-logo-twitter' />} iconGutter={PaddingSize.Wide} onClicked={onSetTwitterClicked} />
                    <Button variant='tertiary' text={'Set Discord PFP'} iconLeft={<KibaIcon iconId='ion-logo-discord' />} iconGutter={PaddingSize.Wide} onClicked={onSetDiscordClicked} />
                    <Button variant='tertiary' text={'Set ENS PFP'} iconLeft={<KibaIcon iconId='ion-globe' />} iconGutter={PaddingSize.Wide} onClicked={onSetEnsClicked} />
                  </React.Fragment>
                )}
              </Stack>
            </Stack>
          </React.Fragment>
        )}
        <Stack.Item growthFactor={2} shrinkFactor={1} />
        <Button text='Share the love' iconLeft={<KibaIcon iconId='ion-logo-twitter' />} target={`https://twitter.com/intent/tweet?text=${getShareText()}`} />
        <Footer />
      </Stack>
      <ImageChooserDialog
        title='Choose your picture'
        isOpen={isProfileImageChooserOpen}
        shouldShowFramesOnly={false}
        onCloseClicked={onProfileImageChooserCloseClicked}
        ownerTokens={ownerTokens}
        onImageChosen={onProfileImageChosen}
        onRefreshTokensClicked={onRefreshTokensClicked}
        uploadImageToIpfs={uploadImageToIpfs}
      />
      <ImageChooserDialog
        title='Choose your frame'
        isOpen={isFrameImageChooserOpen}
        shouldShowFramesOnly={true}
        onCloseClicked={onFrameImageChooserCloseClicked}
        ownerTokens={ownerTokens}
        onImageChosen={onFrameImageChosen}
        onRefreshTokensClicked={onRefreshTokensClicked}
        uploadImageToIpfs={uploadImageToIpfs}
      />
      <TwitterInstructionsDialog
        isOpen={isTwitterInstructionsOpen}
        onCloseClicked={onTwitterInstructionsCloseClicked}
        onDownloadClicked={onDownloadClicked}
      />
      <DiscordInstructionsDialog
        isOpen={isDiscordInstructionsOpen}
        onCloseClicked={onDiscordInstructionsCloseClicked}
        onDownloadClicked={onDownloadClicked}
      />
      <EnsInstructionsDialog
        isOpen={isEnsInstructionsOpen}
        imageIpfsUrl={imageIpfsUrl}
        onCloseClicked={onEnsInstructionsCloseClicked}
        onUploadClicked={onUploadClicked}
      />
    </ContainingView>
  );
};
