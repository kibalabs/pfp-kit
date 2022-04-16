import React from 'react';

import { Alignment, Button, Dialog, Direction, EqualGrid, LoadingSpinner, MarkdownText, PaddingSize, ResponsiveTextAlignmentView, Spacing, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

import { CollectionToken } from '../client/resources';
import { Dropzone } from './Dropzone';
import { TokenView } from './TokenView';

interface IImageChooserDialogProps {
  isOpen: boolean;
  title: string;
  ownerTokens: CollectionToken[] | undefined | null;
  shouldShowFramesOnly: boolean;
  onRefreshTokensClicked: () => void;
  onImageChosen: (imageUrl: string) => void;
  onCloseClicked: () => void;
  uploadImageToIpfs: (file: File) => Promise<string>
}

export const ImageChooserDialog = (props: IImageChooserDialogProps): React.ReactElement => {
  const [isUploadingImage, setIsUploadingImage] = React.useState<boolean>(false);
  const [uploadingImageError, setUploadingImageError] = React.useState<Error | null>(null);

  const onImageFilesChosen = async (files: File[]): Promise<void> => {
    setIsUploadingImage(true);
    try {
      const cid = await props.uploadImageToIpfs(files[0]);
      setIsUploadingImage(false);
      props.onImageChosen(`ipfs://${cid}`);
    } catch (error: unknown) {
      setUploadingImageError(error as Error);
      setIsUploadingImage(false);
    }
  };

  const onTokenClicked = (token: CollectionToken): void => {
    props.onImageChosen(props.shouldShowFramesOnly ? token.frameImageUrl : token.imageUrl);
  };

  const relevantTokens = !props.shouldShowFramesOnly ? props.ownerTokens : props.ownerTokens?.filter((token: CollectionToken): boolean => token.frameImageUrl != null);
  return (
    <Dialog
      isOpen={props.isOpen}
      onCloseClicked={props.onCloseClicked}
      maxWidth='90%'
      maxHeight='90%'
    >
      <ResponsiveTextAlignmentView alignment={TextAlignment.Center}>
        <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldAddGutters={true} defaultGutter={PaddingSize.Wide}>
          <Text variant='header3'>{props.title}</Text>
          {props.ownerTokens === undefined ? (
            <LoadingSpinner />
          ) : props.ownerTokens === null ? (
            <Text variant='error'>Tokens failed to load</Text>
          ) : (
            <React.Fragment>
              {relevantTokens.length === 0 ? (
                <React.Fragment>
                  <Spacing varian={PaddingSize.Wide} />
                  <Text>None of your NFTs support frames yet 😿</Text>
                  <MarkdownText source='For an awesome example, grab one from [our amazing partners](/partners) 😘' />
                  <Spacing varian={PaddingSize.Wide2} />
                </React.Fragment>
              ) : (
                <EqualGrid childSizeResponsive={{ base: 6, medium: 4, large: 3 }} shouldAddGutters={true}>
                  {relevantTokens.map((ownerToken: CollectionToken, index: number) : React.ReactElement => (
                    <TokenView
                      onClicked={onTokenClicked}
                      key={index}
                      token={ownerToken}
                    />
                  ))}
                </EqualGrid>
              )}
              {isUploadingImage ? (
                <Stack direction={Direction.Vertical} childAlignment={Alignment.Center}>
                  <LoadingSpinner />
                  <Text variant='note'>Uploading to IPFS</Text>
                </Stack>
              ) : uploadingImageError ? (
                <Text variant='error'>{String(uploadingImageError.message)}</Text>
              ) : (
                <Dropzone onFilesChosen={onImageFilesChosen} />
              )}
              <Button variant='small' onClicked={props.onRefreshTokensClicked} text='Refresh Tokens' />
            </React.Fragment>
          )}
        </Stack>
      </ResponsiveTextAlignmentView>
    </Dialog>
  );
};
