import React from 'react';

import { Alignment, Box, Button, ContainingView, Direction, IconButton, Image, KibaIcon, LayerContainer, LinkBase, LoadingSpinner, PaddingSize, ResponsiveHidingView, ScreenSize, Spacing, Stack, Text } from '@kibalabs/ui-react';

import { useAccount, useOnLinkAccountsClicked } from '../AccountContext';
import { CollectionToken } from '../client/resources';
import { Dropzone } from '../components/Dropzone';
import { TokenView } from '../components/TokenView';
import { useGlobals } from '../globalsContext';
import { Footer } from '../components/Footer';
import { ConnectedAccount } from '../components/ConnectedAccount';
import { ImageCanvasView } from '../components/ImageCanvasView';

export type UpdateResult = {
  isSuccess: boolean;
  message: string;
}

export const HomePage = (): React.ReactElement => {
  const account = useAccount();
  const { notdClient } = useGlobals();
  const { web3StorageClient } = useGlobals();
  const [isUploadingImage, setIsUploadingImage] = React.useState<boolean>(false);
  const [updatingImageResult, setUpdatingImageResult] = React.useState<UpdateResult | null>(null);
  const shouldUseIpfs = true;
  // const [stage, setStage] = React.useState<number>(1);
  const [imageUrl, setImageUrl] = React.useState<string>(null);
  const [ownerTokens, setOwnerTokens] = React.useState<CollectionToken[] | undefined | null>(undefined);

  const onLinkAccountsClicked = useOnLinkAccountsClicked();

  const onConnectWalletClicked = async (): Promise<void> => {
    await onLinkAccountsClicked();
  };

  // const onImageClicked = (token : CollectionToken): void => {
  //   setStage(2);
  //   if (token.imageUrl?.startsWith('ipfs://')) {
  //     const FormattedImageUrl = token.imageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
  //     setImageUrl(FormattedImageUrl);
  //   }
  // };

  // const onImageFilesSelected = async (files: File[]): Promise<UpdateResult> => {
  //   // TODO(krishan711): ensure there is only one file
  //   const file = files[0];
  //   try {
  //     const cid = await web3StorageClient.put([file], { wrapWithDirectory: false });
  //     const url = `https://ipfs.io/ipfs/${cid}`;
  //     setImageUrl(url);
  //     setStage(2);
  //     return { isSuccess: true, message: `ipfs://${cid}` };
  //   } catch (error: unknown) {
  //     console.error(error);
  //     return { isSuccess: false, message: 'Failed, Please try again' };
  //   }
  // };

  // const onImageFilesChosen = async (files: File[]): Promise<void> => {
  //   setUpdatingImageResult(null);
  //   setIsUploadingImage(true);
  //   const result = await onImageFilesSelected(files);
  //   setUpdatingImageResult(result);
  //   setIsUploadingImage(false);
  // };

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

  const onSetTwitterClicked = (): void => {

  };

  const onSetDiscordClicked = (): void => {
    console.error('onSetDiscordClicked not implemented');
  };

  const onSetEnsClicked = (): void => {
    console.error('onSetEnsClicked not implemented');
  };

  const onDownloadClicked = (): void => {
    console.error('onDownloadClicked not implemented');
  };

  return (
    <ContainingView>
      <Stack direction={Direction.Vertical} isFullHeight={true} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true} paddingTop={PaddingSize.Wide2} paddingBottom={PaddingSize.Wide} paddingHorizontal={PaddingSize.Wide}>
        {!account ? (
          <React.Fragment>
            <Stack.Item growthFactor={1} shrinkFactor={1}>
              <Spacing variant={PaddingSize.Wide2} />
            </Stack.Item>
            <Image source='/assets/logo.svg' alternativeText='PFP Kit Logo'/>
            <Spacing variant={PaddingSize.Wide} />
            <Button variant='primary-large' text= 'Connect Your Wallet' onClicked={onConnectWalletClicked} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Image source='/assets/logo.svg' alternativeText='PFP Kit Logo'/>
            <ConnectedAccount account={account} />
            <Stack.Item growthFactor={1} shrinkFactor={1}>
              <Spacing variant={PaddingSize.Wide2} />
            </Stack.Item>
            <Stack directionResponsive={{ base: Direction.Vertical, medium: Direction.Horizontal }} isFullWidth={true} childAlignment={Alignment.Center} contentAlignment={Alignment.Center}>
              <ImageCanvasView profileImageUrl={imageUrl} />
              <Stack direction={Direction.Vertical} childAlignment={Alignment.Start} contentAlignment={Alignment.Center} shouldAddGutters={true} padding={PaddingSize.Wide2}>
                <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
                  <Text>picture: </Text>
                  <Box variant='rounded' shouldClipContent={true} width='1.5rem' height='1.5rem'>
                    <Image source={imageUrl} alternativeText='image' fitType='contain' />
                  </Box>
                  {/* <Button variant='secondary' text={'change'} onClicked={() => setStage(3)} /> */}
                </Stack>
                <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
                  <Text>Frame: </Text>
                  <Button variant='secondary' text={'choose now'} />
                </Stack>
                <Button variant='secondary' text={'Set Twitter PFP'} iconLeft={<KibaIcon iconId='ion-logo-twitter' />} iconGutter={PaddingSize.Wide} onClicked={onSetTwitterClicked} />
                <Button variant='secondary' text={'Set Discord PFP'} iconLeft={<KibaIcon iconId='ion-logo-discord' />} iconGutter={PaddingSize.Wide} onClicked={onSetDiscordClicked} />
                <Button variant='secondary' text={'Set ENS PFP'} iconLeft={<KibaIcon iconId='ion-globe' />} iconGutter={PaddingSize.Wide} onClicked={onSetEnsClicked} />
                <Button variant='secondary' text={'Download'} iconLeft={<KibaIcon iconId='ion-download' />} iconGutter={PaddingSize.Wide} onClicked={onDownloadClicked} />
              </Stack>
            </Stack>
            {/* ) : stage === 3 && (
              <Stack direction={Direction.Vertical} childAlignment={Alignment.Start} contentAlignment={Alignment.Center} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}isScrollableHorizontally={true} paddingBottom={PaddingSize.Wide3}>
                <Text variant='header3'>Choose your picture </Text>
                <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true} shouldWrapItems={true}>
                  {ownerTokens === undefined ? (
                    <LoadingSpinner />
                  ) : ownerTokens === null ? (
                    <Text variant='error'>Tokens failed to load</Text>
                  ) : (
                    ownerTokens.map((ownerToken: CollectionToken, index: number) : React.ReactElement => (
                      <TokenView
                        onClicked={onImageClicked}
                        key={index}
                        token={ownerToken}
                      />
                    ))
                  )}
                  {imageUrl ? (
                    <Box shouldClipContent={true} width='160px' height='160px'>
                      <Image source={imageUrl} alternativeText='image' fitType='contain' />
                    </Box>
                  ) : (
                    <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldWrapItems={true}>
                      {isUploadingImage ? (
                        <Text>Uploading image...</Text>
                      ) : (
                        <Stack direction={Direction.Vertical} shouldAddGutters={true}>
                          <Dropzone onFilesChosen={onImageFilesChosen} />
                          <Text>Upload to IPFS</Text>
                          {shouldUseIpfs && (<Text variant='note'>IPFS storage works best with files below 3MB</Text>)}
                        </Stack>
                      )}
                      {updatingImageResult && !updatingImageResult.isSuccess && (
                        <Text variant='error'>{updatingImageResult.message}</Text>
                      )}
                    </Stack>
                  )}
                </Stack>
              </Stack>
            )} */}
          </React.Fragment>
        )}
        <Stack.Item growthFactor={1} shrinkFactor={1} />
        <Footer />
      </Stack>
    </ContainingView>
  );
};
