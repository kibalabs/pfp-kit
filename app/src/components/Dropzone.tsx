
import React from 'react';

import { Direction, ITheme, KibaIcon, Stack, Text, useTheme, valueToCss } from '@kibalabs/ui-react';
import * as ReactDropzone from 'react-dropzone';
import styled from 'styled-components';

export interface IDropzoneProps {
  onFilesChosen: (files: File[]) => void;
}

interface IStyledDropzoneProps {
  theme: ITheme;
}

const StyledDropzone = styled.div<IStyledDropzoneProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5em 1em;
  border-width: 0.1em;
  border-radius: ${(props: IStyledDropzoneProps): string => valueToCss(props.theme.dimensions.borderRadius)};
  border-color: #ccc;
  border-style: dashed;
  justify-content: center;
  outline: none;
  cursor: pointer;
  transition: border .24s ease-in-out;
`;

export const Dropzone = (props: IDropzoneProps): React.ReactElement => {
  const theme = useTheme();
  const onDrop = React.useCallback((files: File[]) => {
    props.onFilesChosen(files);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onFilesChosen]);

  const { getRootProps, getInputProps } = ReactDropzone.useDropzone({ onDrop, maxFiles: 1, accept: ['image/png', 'image/jpeg', 'image/jpg'] });

  return (
    <StyledDropzone theme={theme} {...getRootProps()}>
      <input {...getInputProps()} />
      <Stack direction={Direction.Horizontal} shouldAddGutters={true}>
        <KibaIcon iconId='ion-cloud-upload-outline' />
        <Text>Upload custom image</Text>
      </Stack>
    </StyledDropzone>
  );
};
