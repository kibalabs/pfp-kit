import React from 'react';

import { SubRouterOutlet, useLocation, useNavigator, useUrlQueryState } from '@kibalabs/core-react';
import { Alignment, Box, Button, ContainingView, Dialog, Direction, Image, KibaIcon, LoadingSpinner, PaddingSize, Spacing, Stack, Text, TextAlignment } from '@kibalabs/ui-react';
import { ethers } from 'ethers';

import { useAccount, useOnLinkAccountsClicked } from '../AccountContext';
import { CollectionToken } from '../client/resources';
import { ConnectedAccount } from '../components/ConnectedAccount';
import { DiscordInstructionsDialog } from '../components/DiscordInstructionsDialog';
import { EnsInstructionsDialog } from '../components/EnsInstructionsDialog';
import { Footer } from '../components/Footer';
import { ImageCanvasView } from '../components/ImageCanvasView';
import { ImageChooserDialog } from '../components/ImageChooserDialog';
import { MessageDialog } from '../components/MessageDialog';
import { TwitterInstructionsDialog } from '../components/TwitterInstructionsDialog';
import { useGlobals } from '../globalsContext';

export type UpdateResult = {
  isSuccess: boolean;
  message: string;
}

const HARDCODED_FRAMES = {
  zenacademy: '/assets/frame-zeneca1.png',
  333: '/assets/frame-zeneca2.png',
  breach: '/assets/frame-breach.png',
};

export const HomePage = (): React.ReactElement => {
  const account = useAccount();
  const navigator = useNavigator();
  const location = useLocation();
  const { notdClient, web3StorageClient } = useGlobals();
  const [profileImageUrl, setProfileImageUrl] = React.useState<string>(null);
  const [isSkipDialogShowing, setIsSkipDialogShowing] = React.useState<boolean>(false);
  const [skippedWalletConnection, setSkippedWalletConnection] = React.useState<boolean>(false);
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
  const [pictureValue] = useUrlQueryState('picture');
  const [frameValue] = useUrlQueryState('frame');

  const onLinkAccountsClicked = useOnLinkAccountsClicked();

  const onConnectWalletClicked = async (): Promise<void> => {
    await onLinkAccountsClicked();
  };

  const onSkipWalletClicked = (): void => {
    setIsSkipDialogShowing(true);
  };

  const onSkipConfirmClicked = (): void => {
    setSkippedWalletConnection(true);
    setIsSkipDialogShowing(false);
  };

  const onSkipCancelClicked = (): void => {
    setSkippedWalletConnection(false);
    setIsSkipDialogShowing(false);
  };

  const onProfileImageChosen = (imageUrl: string): void => {
    let resolvedImageUrl = imageUrl;
    if (resolvedImageUrl.startsWith('ipfs://')) {
      resolvedImageUrl = resolvedImageUrl.replace('ipfs://', 'https://pablo-images.kibalabs.com/v1/ipfs/');
    }
    setProfileImageUrl(resolvedImageUrl);
    setIsProfileImageChooserOpen(false);
  };

  const onFrameImageChosen = (imageUrl: string): void => {
    let resolvedImageUrl = imageUrl;
    if (resolvedImageUrl.startsWith('ipfs://')) {
      resolvedImageUrl = resolvedImageUrl.replace('ipfs://', 'https://pablo-images.kibalabs.com/v1/ipfs/');
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
      const updatedTokens = tokens.map((token: CollectionToken): CollectionToken => {
        let tokenFrameImageUrl = token.frameImageUrl;
        if (!tokenFrameImageUrl) {
          if (token.registryAddress === '0xe0176bA60efddb29Cac5b15338C9962dAee9de0c') {
            tokenFrameImageUrl = '/assets/frame-premint.png';
          }
          if (token.registryAddress === '0xf64e6fB725f04042b5197e2529b84be4a925902C' && token.tokenId === '1') {
            tokenFrameImageUrl = '/assets/frame-zeneca1.png';
          }
          if (token.registryAddress === '0xf64e6fB725f04042b5197e2529b84be4a925902C' && token.tokenId === '333') {
            tokenFrameImageUrl = '/assets/frame-zeneca2.png';
          }
        }
        // eslint-disable-next-line no-param-reassign
        token.frameImageUrl = tokenFrameImageUrl;
        return token;
      });
      setOwnerTokens(updatedTokens);
    }).catch((error: unknown): void => {
      console.error(error);
      setOwnerTokens(null);
    });
  }, [notdClient, account?.address]);

  React.useEffect((): void => {
    refreshOwnerTokens();
  }, [refreshOwnerTokens]);

  const applyDefaults = React.useCallback((): void => {
    if (frameValue && !frameImageUrl) {
      if (frameValue.startsWith('https://') || frameValue.startsWith('ipfs://')) {
        setFrameImageUrl(frameValue);
      } else if (Object.keys(HARDCODED_FRAMES).includes(frameValue)) {
        setFrameImageUrl(HARDCODED_FRAMES[frameValue]);
      } else if (ownerTokens && frameValue.includes(':')) {
        // eslint-disable-next-line prefer-const
        let [registryAddress, tokenId] = frameValue.split(':');
        registryAddress = ethers.utils.getAddress(registryAddress);
        const frameToken = ownerTokens.find((token: CollectionToken): boolean => {
          return token.registryAddress === registryAddress && token.tokenId === tokenId;
        });
        if (frameToken && frameToken.frameImageUrl) {
          setFrameImageUrl(frameToken.frameImageUrl);
        }
      }
    }
    if (pictureValue && !profileImageUrl) {
      if (ownerTokens && pictureValue.includes(':')) {
        // eslint-disable-next-line prefer-const
        let [registryAddress, tokenId] = pictureValue.split(':');
        registryAddress = ethers.utils.getAddress(registryAddress);
        const pictureToken = ownerTokens.find((token: CollectionToken): boolean => {
          return token.registryAddress === registryAddress && token.tokenId === tokenId;
        });
        if (pictureToken && pictureToken.imageUrl) {
          setFrameImageUrl(pictureToken.imageUrl);
        }
      }
    }
  }, [frameValue, frameImageUrl, pictureValue, profileImageUrl, ownerTokens]);

  React.useEffect((): void => {
    applyDefaults();
  }, [applyDefaults]);

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

  const onCloseSubpageClicked = (): void => {
    navigator.navigateTo('/');
  };

  const isAboutSubpageShowing = location.pathname.includes('/about');
  const isPartnersSubpageShowing = location.pathname.includes('/partners');
  const isFramesInfoSubpageShowing = location.pathname.includes('/frames');
  const isSubpageShowing = isAboutSubpageShowing || isPartnersSubpageShowing || isFramesInfoSubpageShowing;

  return (
    <ContainingView>
      <Stack direction={Direction.Vertical} isFullHeight={true} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true} paddingTop={PaddingSize.Wide2} paddingBottom={PaddingSize.Wide} paddingHorizontal={PaddingSize.Wide}>
        {!account && !skippedWalletConnection ? (
          <React.Fragment>
            <Stack.Item growthFactor={1} shrinkFactor={1}>
              <Spacing variant={PaddingSize.Wide2} />
            </Stack.Item>
            <Image source='/assets/logo.svg' alternativeText='PFP Kit Logo' />
            <Spacing variant={PaddingSize.Wide} />
            <Text alignment={TextAlignment.Center} variant='header2'>Set your NFT PFP in seconds</Text>
            <Spacing variant={PaddingSize.Wide2} />
            <Button variant='primary-large' text= 'Connect Your Wallet' onClicked={onConnectWalletClicked} />
            <Spacing variant={PaddingSize.Default} />
            <Button variant='small' text= 'Skip and upload manually' onClicked={onSkipWalletClicked} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Stack.Item growthFactor={1} shrinkFactor={1} />
            <Image source='/assets/logo.svg' alternativeText='PFP Kit Logo' />
            {account && (
              <ConnectedAccount account={account} />
            )}
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
                <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
                  <Text>Frame: </Text>
                  {frameImageUrl && (
                    <Box variant='rounded' shouldClipContent={true} width='1.5rem' height='1.5rem'>
                      <Image source={frameImageUrl} alternativeText='image' fitType='contain' />
                    </Box>
                  )}
                  <Button variant='tertiary' text={frameImageUrl ? 'change' : 'choose'} onClicked={onChooseFrameImageClicked} />
                </Stack>
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
        <Footer />
      </Stack>
      <ImageChooserDialog
        title='Choose your picture'
        isOpen={isProfileImageChooserOpen}
        isConnected={account != null}
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
        isConnected={account != null}
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
      <MessageDialog
        isOpen={isSkipDialogShowing}
        message={'PFP Kit works best when you connect your account.\n\nIt&apos;s completely safe - PFP Kit will never ask you to sign a transaction so there&apos;s no risk involved, the connection is just to find your public information on the blockchain.\n\nBy connecting your wallet we can quickly verify all the NFTs you own and streamline your experience down to just a few seconds ⚡⚡'}
        confirmButtonText='Skip anyway'
        cancelButtonText='Cancel'
        onCloseClicked={onSkipCancelClicked}
        onConfirmClicked={onSkipConfirmClicked}
      />
      {isSubpageShowing && (
        <Dialog
          isOpen={true}
          onCloseClicked={onCloseSubpageClicked}
          maxWidth='750px'
          maxHeight='90%'
        >
          <SubRouterOutlet />
        </Dialog>
      )}
    </ContainingView>
  );
};
