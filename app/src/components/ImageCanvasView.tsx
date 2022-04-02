import React from 'react';

import { useSize } from '@kibalabs/core-react';
import { Box } from '@kibalabs/ui-react';

interface IImageCanvasViewProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  profileImageUrl?: string | null;
  frameImageUrl?: string | null;
}

export const ImageCanvasView = (props: IImageCanvasViewProps): React.ReactElement => {
  const canvasWrapperRef = React.useRef<HTMLDivElement | null>(null);
  const canvasWrapperSize = useSize(canvasWrapperRef.current);

  const redrawImages = React.useCallback((): void => {
    const context = props.canvasRef.current?.getContext('2d');
    if (!context) {
      return;
    }
    context.clearRect(0, 0, 1000, 1000);
    if (props.profileImageUrl) {
      const profileImage = new window.Image();
      profileImage.crossOrigin = 'anonymous';
      profileImage.addEventListener('load', () => {
        context.drawImage(profileImage, 0, 0, 1000, 1000);
        if (props.frameImageUrl) {
          const frameImage = new window.Image();
          frameImage.crossOrigin = 'anonymous';
          frameImage.addEventListener('load', () => {
            context.drawImage(frameImage, 0, 0, 1000, 1000);
          });
          frameImage.setAttribute('src', props.frameImageUrl);
        }
      });
      profileImage.setAttribute('src', props.profileImageUrl);
    } else {
      const emptyImage = new window.Image();
      emptyImage.crossOrigin = 'anonymous';
      emptyImage.addEventListener('load', () => {
        context.drawImage(emptyImage, 0, 0, 1000, 1000);
      });
      emptyImage.setAttribute('src', '/assets/empty.png');
    }
  }, [props.profileImageUrl, props.frameImageUrl, props.canvasRef]);

  React.useEffect((): void => {
    redrawImages();
  }, [redrawImages]);

  return (
    <Box ref={canvasWrapperRef} variant={'rounded'} shouldClipContent={true} width='90%' maxWidth='350px' height={`${canvasWrapperSize?.width}px`} maxHeight='350px'>
      <div style={{ width: '1000px', height: '1000px', transform: canvasWrapperSize?.width ? `scale(${canvasWrapperSize.width / 1000})` : '1', transformOrigin: '0 0', aspectRatio: '1 / 1' }}>
        <canvas
          ref={props.canvasRef}
          width='1000px'
          height='1000px'
        />
      </div>
    </Box>
  );
};
