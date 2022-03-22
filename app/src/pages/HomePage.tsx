import React from 'react';

import { Alignment, Box, Button, ContainingView, Direction, Image, KibaIcon, LayerContainer, PaddingSize, Spacing, Stack, Text } from '@kibalabs/ui-react';

import { useAccount, useOnLinkAccountsClicked } from '../AccountContext';
import { Dropzone } from '../components/Dropzone';
import { ImageView } from '../components/ImageView';
import { useGlobals } from '../globalsContext';
import imageData from '../imageData.json';

export type UpdateResult = {
  isSuccess: boolean;
  message: string;
}

export const HomePage = (): React.ReactElement => {
  const account = useAccount();
  const { web3StorageClient } = useGlobals();
  const [isUploadingImage, setIsUploadingImage] = React.useState<boolean>(false);
  const [updatingImageResult, setUpdatingImageResult] = React.useState<UpdateResult | null>(null);
  const shouldUseIpfs = true;
  const [stage, setStage] = React.useState<number>(1);
  const [imageUrl, setImageUrl] = React.useState<string>(null);

  const onLinkAccountsClicked = useOnLinkAccountsClicked();

  const onConnectWalletClicked = async (): Promise<void> => {
    await onLinkAccountsClicked();
  };

  const showImage = (tokenImageUrl) => {
    setStage(2);
    if (tokenImageUrl?.startsWith('ipfs://')) {
      const FormattedImageUrl = tokenImageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
      setImageUrl(FormattedImageUrl);
    }
  };

  const onImageFilesSelected = async (imageShouldUseIpfs: boolean, files: File[]): Promise<UpdateResult> => {
    // TODO(krishan711): ensure there is only one file
    const file = files[0];
    if (imageShouldUseIpfs) {
      try {
        const cid = await web3StorageClient.put([file], { wrapWithDirectory: false });
        const url = `https://ipfs.io/ipfs/${cid}`;
        setImageUrl(url);
        setStage(2);
        return { isSuccess: true, message: `ipfs://${cid}` };
      } catch (error: unknown) {
        console.error(error);
        return { isSuccess: false, message: 'Failed to upload file to IPFS. Please try without IPFS whilst we look into what\'s happening.' };
      }
    } return { isSuccess: false, message: 'Failed, kindly Upload to IPFS' };
  };

  const onImageFilesChosen = async (files: File[]): Promise<void> => {
    setUpdatingImageResult(null);
    setIsUploadingImage(true);
    const result = await onImageFilesSelected(shouldUseIpfs, files);
    setUpdatingImageResult(result);
    setIsUploadingImage(false);
  };

  return (
    <ContainingView>
      <Stack direction={Direction.Vertical} isFullHeight={true} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} padding={PaddingSize.Wide2} shouldAddGutters={true}>
        <Text variant='header1'>PFP KIT</Text>
        {stage === 1 && (
          <Stack>
            {!account?.address ? (
              <Button variant='large-secondary' text= 'Connect Your Wallet' onClicked={onConnectWalletClicked} />
            ) : (
              <Stack direction={Direction.Vertical} childAlignment={Alignment.Start} contentAlignment={Alignment.Center} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}isScrollableHorizontally={true}>
                <Text variant='header3'>Choose your picture </Text>
                <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true} shouldWrapItems={true}>
                  {imageData && imageData.map((image, index: number) : React.ReactElement => (
                    <ImageView
                      onClicked={showImage}
                      key={index}
                      name={image.name}
                      imageUrl={image.imageUrl}
                    />
                  ))}
                  {onImageFilesChosen ? (
                    <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldWrapItems={true}>
                      {isUploadingImage ? (
                        <Text>Uploading image...</Text>
                      ) : (
                        <Stack direction={Direction.Horizontal} isFullWidth={true} shouldAddGutters={true}>
                          <Dropzone onFilesChosen={onImageFilesChosen} />
                          <Text>Upload to IPFS</Text>
                          {shouldUseIpfs && (<Text variant='note'>IPFS storage works best with files below 3MB</Text>)}
                        </Stack>
                      )}
                      {updatingImageResult && !updatingImageResult.isSuccess && (
                        <Text variant='error'>{updatingImageResult.message}</Text>
                      )}
                    </Stack>
                  ) : (
                    <Box variant='tokenCard' shouldClipContent={true} width='160px' height='160px'>
                      <Image source={imageUrl} alternativeText='image' fitType='contain' />
                    </Box>
                  )}
                </Stack>
              </Stack>
            )}
          </Stack>
        )}
        {stage === 2 && (
          <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
            <Box height='300px'>
              <LayerContainer>
                <LayerContainer.Layer isFullHeight={false} isFullWidth={false} alignmentVertical={Alignment.Center} alignmentHorizontal={Alignment.Center}>
                  <Box variant='rounded-wideBorder' shouldClipContent={true} width='160px' height='160px'>
                    <Image source='/assets/icon.png' alternativeText='image' fitType='contain' />
                  </Box>
                </LayerContainer.Layer>
                <LayerContainer.Layer isFullHeight={false} isFullWidth={false} alignmentVertical={Alignment.Center} alignmentHorizontal={Alignment.Center}>
                  <Box variant='rounded' shouldClipContent={true} width='130px' height='130px'>
                    <Image source={imageUrl} alternativeText='image' fitType='contain' />
                  </Box>
                </LayerContainer.Layer>
              </LayerContainer>
            </Box>
            <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true}>
              <Button variant='tertiary' text={'change picture'} onClicked={() => setStage(1)} />
              <Spacing variant={PaddingSize.Wide2} />
              <Button variant='tertiary' text={'change frame'} />
            </Stack>
            <Button variant='secondary' isFullWidth={true} text= {'Set Twitter PFP'} iconGutter={PaddingSize.Wide} iconLeft={<KibaIcon iconId='ion-logo-twitter' />} />
            <Button variant='secondary' isFullWidth={true} text= {'Set Discord PFP'} iconLeft={<KibaIcon iconId='ion-logo-discord' />} />
            <Button variant='secondary' isFullWidth={true} text= {'Set ENS PFP'} iconLeft={<KibaIcon iconId='ion-globe' />} />
            <Button variant='secondary' isFullWidth={true} text= {'Download'} iconLeft={<KibaIcon iconId='ion-download' />} />
          </Stack>
        )}
      </Stack>
    </ContainingView>
  );
};
