import React from 'react';

import { Alignment, Box, Button, ContainingView, Direction, IconButton, Image, KibaIcon, LayerContainer, LinkBase, LoadingSpinner, PaddingSize, ResponsiveHidingView, ScreenSize, Spacing, Stack, Text } from '@kibalabs/ui-react';
import { useSize } from '@kibalabs/core-react';

interface IImageCanvasViewProps {
  profileImageUrl?: string;
  frameImageUrl?: string;
}

export const ImageCanvasView = (props: IImageCanvasViewProps): React.ReactElement => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const canvasWrapperRef = React.useRef<HTMLDivElement | null>(null);
  const canvasWrapperSize = useSize(canvasWrapperRef.current);

  const redrawImages = React.useCallback((): void => {
    const context = canvasRef.current?.getContext('2d');
    if (!context) {
      return;
    }
    context.clearRect(0, 0, 1000, 1000);
    if (props.profileImageUrl) {
      const profileImage = new window.Image();
      profileImage.addEventListener("load", function () {
        context.drawImage(profileImage, 0, 0, 1000, 1000);
        if (props.frameImageUrl) {
          const frameImage = new window.Image();
          frameImage.addEventListener("load", function () {
            context.drawImage(frameImage, 0, 0, 1000, 1000);
          });
          frameImage.setAttribute("src", props.frameImageUrl);
        }
      });
      profileImage.setAttribute("src", props.profileImageUrl);
    }
  }, [props.profileImageUrl, canvasRef]);

  React.useEffect((): void => {
    redrawImages();
  }, [redrawImages]);

  console.log('canvasWrapperSize.width', canvasWrapperSize?.width);
  return (
    <Box ref={canvasWrapperRef} variant='rounded-bordered' shouldClipContent={true} width='350px' maxWidth='90%' height='350px' maxHeight='70%'>
      <div style={{width: '1000px', height: '1000px', transform: canvasWrapperSize?.width ? `scale(${canvasWrapperSize.width / 1000})` : '1', transformOrigin: '0 0'}}>
        <canvas
          ref={canvasRef}
          width='1000px'
          height='1000px'
        />
      </div>
    </Box>
  )
}
