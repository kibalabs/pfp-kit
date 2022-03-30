import React from 'react';

import { truncateMiddle } from '@kibalabs/core';
import { Alignment, Box, Button, ContainingView, Direction, IconButton, Image, KibaIcon, LayerContainer, LinkBase, PaddingSize, ResponsiveHidingView, ScreenSize, Spacing, Stack, Text } from '@kibalabs/ui-react';

import { useOnLinkAccountsClicked } from '../AccountContext';
import { Token } from '../client/resources';
import { Dropzone } from '../components/Dropzone';
import { ImageView } from '../components/ImageView';
import { useGlobals } from '../globalsContext';

export type UpdateResult = {
  isSuccess: boolean;
  message: string;
}

export const HomePage = (): React.ReactElement => {
  // const account = useAccount();
  const { notdClient } = useGlobals();
  const accountAddress = '0x18090cDA49B21dEAffC21b4F886aed3eB787d032';
  const { web3StorageClient } = useGlobals();
  const [isUploadingImage, setIsUploadingImage] = React.useState<boolean>(false);
  const [updatingImageResult, setUpdatingImageResult] = React.useState<UpdateResult | null>(null);
  const shouldUseIpfs = true;
  const [stage, setStage] = React.useState<number>(1);
  const [imageUrl, setImageUrl] = React.useState<string>(null);
  const [ownerTokens, setOwnerTokens] = React.useState<Token[] | undefined | null>(undefined);

  const onLinkAccountsClicked = useOnLinkAccountsClicked();

  const onConnectWalletClicked = async (): Promise<void> => {
    await onLinkAccountsClicked();
  };

  const onImageClicked = (token : Token): void => {
    setStage(2);
    if (token.imageUrl?.startsWith('ipfs://')) {
      const FormattedImageUrl = token.imageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
      setImageUrl(FormattedImageUrl);
    }
  };

  const onImageFilesSelected = async (files: File[]): Promise<UpdateResult> => {
    // TODO(krishan711): ensure there is only one file
    const file = files[0];
    try {
      const cid = await web3StorageClient.put([file], { wrapWithDirectory: false });
      const url = `https://ipfs.io/ipfs/${cid}`;
      setImageUrl(url);
      setStage(2);
      return { isSuccess: true, message: `ipfs://${cid}` };
    } catch (error: unknown) {
      console.error(error);
      return { isSuccess: false, message: 'Failed, Please try again' };
    }
  };

  const onImageFilesChosen = async (files: File[]): Promise<void> => {
    setUpdatingImageResult(null);
    setIsUploadingImage(true);
    const result = await onImageFilesSelected(files);
    setUpdatingImageResult(result);
    setIsUploadingImage(false);
  };

  const getOwnerTokens = React.useCallback(async (): Promise<void> => {
    setOwnerTokens(undefined);
    notdClient.getOwnerTokens(accountAddress).then((tokens: Token[]): void => {
      setOwnerTokens(tokens);
    }).catch((error: unknown): void => {
      console.error(error);
      setOwnerTokens(null);
    });
  }, [notdClient, accountAddress]);

  React.useEffect((): void => {
    getOwnerTokens();
  }, [getOwnerTokens]);

  return (
    <ContainingView>
      <Stack direction={Direction.Vertical} isFullHeight={true} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
        <Text variant='header1'>PFP KIT</Text>
        {accountAddress && (
          <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}padding={PaddingSize.Wide2}>
            <Text>Connected to</Text>
            <Box variant='rounded-borderColored' shouldClipContent={true} height='20px' width='20px'>
              <Image source={`https://web3-images-api.kibalabs.com/v1/accounts/${accountAddress}/image`} alternativeText='Avatar' />
            </Box>
            <Text>{truncateMiddle(accountAddress, 10)}</Text>
          </Stack>
        )}
        {stage === 1 && (
          <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
            {!accountAddress ? (
              <Button variant='large-primary' text= 'Connect Your Wallet' onClicked={onConnectWalletClicked} />
            ) : (
              <Stack direction={Direction.Vertical} childAlignment={Alignment.Start} contentAlignment={Alignment.Center} shouldAddGutters={true} paddingBottom={PaddingSize.Wide3}>
                <ResponsiveHidingView hiddenBelow={ScreenSize.Medium}>
                  <Stack direction={Direction.Horizontal} childAlignment={Alignment.Start} contentAlignment={Alignment.Center} shouldAddGutters={true} defaultGutter={PaddingSize.Wide3} padding={PaddingSize.Wide2}>
                    <Box variant='rounded-dottedBorder' shouldClipContent={true} width='20rem' height='20rem' />
                    <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
                      <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
                        <Text> picture: </Text>
                        <Button variant='tertiary' text={'choose now'} onClicked={() => setStage(3)} />
                      </Stack>
                      <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
                        <Text> Frame: </Text>
                        <Button variant='tertiary' text={'choose now'} />
                      </Stack>
                    </Stack>
                  </Stack>
                </ResponsiveHidingView>
                <ResponsiveHidingView hiddenAbove={ScreenSize.Medium}>
                  <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
                    <Box variant='rounded-dottedBorder' shouldClipContent={true} width='20rem' height='20rem' />
                    <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true} padding={PaddingSize.Wide2}>
                      <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
                        <Text> picture: </Text>
                        <Button variant='tertiary' text={'choose now'} onClicked={() => setStage(3)} />
                      </Stack>
                      <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
                        <Text> Frame: </Text>
                        <Button variant='tertiary' text={'choose now'} />
                      </Stack>
                    </Stack>
                  </Stack>
                </ResponsiveHidingView>
              </Stack>
            )}
          </Stack>
        )}
        {stage === 2 && (
          <Stack direction={Direction.Vertical} shouldWrapItems={true} isFullWidth={true} childAlignment={Alignment.Center} contentAlignment={Alignment.Center}>
            <ResponsiveHidingView hiddenBelow={ScreenSize.Medium}>
              <Stack direction={Direction.Horizontal} childAlignment={Alignment.Start} contentAlignment={Alignment.Center} shouldAddGutters={true} defaultGutter={PaddingSize.Wide3} padding={PaddingSize.Wide3}>
                <Box variant='rounded' shouldClipContent={true} width='20rem' height='20rem'>
                  <LayerContainer>
                    <LayerContainer.Layer isFullHeight={false} isFullWidth={false} alignmentVertical={Alignment.Center} alignmentHorizontal={Alignment.Center}>
                      <Box variant='rounded-wideBorder' shouldClipContent={true} width='20rem' height='20rem'>
                        <Image source='/assets/icon.png' alternativeText='image' fitType='contain' />
                      </Box>
                    </LayerContainer.Layer>
                    <LayerContainer.Layer isFullHeight={false} isFullWidth={false} alignmentVertical={Alignment.Center} alignmentHorizontal={Alignment.Center}>
                      <Box variant='rounded' shouldClipContent={true} width='17rem' height='17rem'>
                        <Image source={imageUrl} alternativeText='image' fitType='contain' />
                      </Box>
                    </LayerContainer.Layer>
                  </LayerContainer>
                </Box>
                <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true} padding={PaddingSize.Wide2}>
                  <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
                    <Text> picture: </Text>
                    <Box variant='rounded' shouldClipContent={true} width='1.5rem' height='1.5rem'>
                      <Image source={imageUrl} alternativeText='image' fitType='contain' />
                    </Box>
                    <Text>{}</Text>
                    <Button variant='secondary' text={'change'} onClicked={() => setStage(3)} />
                  </Stack>
                  <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
                    <Text> Frame: </Text>
                    <Button variant='secondary' text={'choose now'} />
                  </Stack>
                  <Button variant='secondary' isFullWidth={true} text= {'Set Twitter PFP'} iconGutter={PaddingSize.Wide} iconLeft={<KibaIcon iconId='ion-logo-twitter' />} />
                  <Button variant='secondary' isFullWidth={true} text= {'Set Discord PFP'} iconLeft={<KibaIcon iconId='ion-logo-discord' />} />
                  <Button variant='secondary' isFullWidth={true} text= {'Set ENS PFP'} iconLeft={<KibaIcon iconId='ion-globe' />} />
                  <Button variant='secondary' isFullWidth={true} text= {'Download'} iconLeft={<KibaIcon iconId='ion-download' />} />
                </Stack>
              </Stack>
            </ResponsiveHidingView>
            <ResponsiveHidingView hiddenAbove={ScreenSize.Medium}>
              <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true} padding={PaddingSize.Default}>
                <Box variant='rounded' shouldClipContent={true} width='20rem' height='20rem'>
                  <LayerContainer>
                    <LayerContainer.Layer isFullHeight={false} isFullWidth={false} alignmentVertical={Alignment.Center} alignmentHorizontal={Alignment.Center}>
                      <Box variant='rounded-wideBorder' shouldClipContent={true} width='20rem' height='20rem'>
                        <Image source='/assets/icon.png' alternativeText='image' fitType='contain' />
                      </Box>
                    </LayerContainer.Layer>
                    <LayerContainer.Layer isFullHeight={false} isFullWidth={false} alignmentVertical={Alignment.Center} alignmentHorizontal={Alignment.Center}>
                      <Box variant='rounded' shouldClipContent={true} width='17rem' height='17rem'>
                        <Image source={imageUrl} alternativeText='image' fitType='contain' />
                      </Box>
                    </LayerContainer.Layer>
                  </LayerContainer>
                </Box>
                <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true} padding={PaddingSize.Wide2}>
                  <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
                    <Text> picture: </Text>
                    <Box variant='rounded' shouldClipContent={true} width='1.5rem' height='1.5rem'>
                      <Image source={imageUrl} alternativeText='image' fitType='contain' />
                    </Box>
                    <Button variant='secondary' text={'change'} onClicked={() => setStage(3)} />
                  </Stack>
                  <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
                    <Text> Frame: </Text>
                    <Button variant='secondary' text={'choose now'} />
                  </Stack>
                  <Button variant='secondary' isFullWidth={true} text= {'Set Twitter PFP'} iconGutter={PaddingSize.Wide} iconLeft={<KibaIcon iconId='ion-logo-twitter' />} />
                  <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
                    <IconButton icon={<KibaIcon iconId='ion-logo-discord' />} />
                    <IconButton icon={<KibaIcon iconId='ion-globe' />} />
                    <IconButton icon={<KibaIcon iconId='ion-download' />} />
                  </Stack>
                </Stack>
              </Stack>
            </ResponsiveHidingView>
          </Stack>
        )}
        {stage === 3 && (
          <Stack direction={Direction.Vertical} childAlignment={Alignment.Start} contentAlignment={Alignment.Center} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}isScrollableHorizontally={true} paddingBottom={PaddingSize.Wide3}>
            <Text variant='header3'>Choose your picture </Text>
            <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true} shouldWrapItems={true}>
              {ownerTokens && ownerTokens.map((ownerToken: Token, index: number) : React.ReactElement => (


                <ImageView
                  onClicked={onImageClicked}
                  key={index}
                  token={ownerToken}
                />
              ))}
              {imageUrl ? (
                <Box variant='tokenCard' shouldClipContent={true} width='160px' height='160px'>
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
        )}
        <Spacing variant={PaddingSize.Wide3} />
        <LinkBase variant='image' target='https://milliondollartokenpage.com'>
          <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
            <Text> Made by</Text>
            <Box shouldClipContent={true} width='2rem' height='2rem'>
              <Image source='/assets/mdtp.png' alternativeText='image' fitType='contain' />
            </Box>
            <Text> MillionDollarTokenPage</Text>
          </Stack>
        </LinkBase>
      </Stack>
    </ContainingView>
  );
};
