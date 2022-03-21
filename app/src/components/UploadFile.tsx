import React from 'react';

import { Alignment, Checkbox, Direction, Stack, Text } from '@kibalabs/ui-react';

import { Dropzone } from './Dropzone';

export type UpdateResult = {
  isSuccess: boolean;
  message: string;
}
export interface IUploadViewProps {
  onImageFilesChosen: (shouldUseIpfs: boolean, files: File[]) => Promise<UpdateResult>;
  imageUrl?: string;
}

export const UploadImage = (props:IUploadViewProps): React.ReactElement => {
  const [isUploadingImage, setIsUploadingImage] = React.useState<boolean>(false);
  const [updatingImageResult, setUpdatingImageResult] = React.useState<UpdateResult | null>(null);
  const [shouldUseIpfs, setShouldUseIpfs] = React.useState<boolean>(true);

  const onImageFilesChosen = async (files: File[]): Promise<void> => {
    setUpdatingImageResult(null);
    setIsUploadingImage(true);
    const result = await props.onImageFilesChosen(shouldUseIpfs, files);
    setUpdatingImageResult(result);
    setIsUploadingImage(false);
  };
  const onShouldUseIpfsToggled = (): void => {
    setShouldUseIpfs(!shouldUseIpfs);
  };

  return (
    <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} shouldWrapItems={true}>
      {isUploadingImage ? (
        <Text>Uploading image...</Text>
      ) : (
        <Stack direction={Direction.Horizontal} isFullWidth={true} shouldAddGutters={true}>
          <Dropzone onFilesChosen={onImageFilesChosen} />
        </Stack>
      )}
      {updatingImageResult && !updatingImageResult.isSuccess && (
        <Text variant='error'>{updatingImageResult.message}</Text>
      )}
      <Checkbox isChecked={shouldUseIpfs} text={'Upload to IPFS'} onToggled={onShouldUseIpfsToggled} />
      {shouldUseIpfs && (<Text variant='note'>IPFS storage works best with files below 3MB</Text>)}
    </Stack>
  );
};
