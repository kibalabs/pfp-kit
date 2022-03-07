import { buildTheme, ITheme } from '@kibalabs/ui-react';

export const buildAppTheme = (): ITheme => {
  const baseTheme = buildTheme();
  const theme = buildTheme({
    colors: {
      brandPrimary: '#ffffff',
      background: '#000000',
      text: '#ffffff',
    },
    fonts: {
      main: {
        url: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap',
      },
    },
    texts: {
      default: {
        'font-family': "'Roboto Condensed', sans-serif",
        'font-weight': '400',
      },
      note: {
        color: '$colors.textClear50',
      },
    },
    boxes: {
      card: {
        margin: '0',
      },
    },
    selectableViews: {
      default: {
        normal: {
          default: {
            background: {
            },
            overlay: baseTheme.linkBases.default.normal.default.background,
          },
          hover: {
            overlay: baseTheme.linkBases.default.normal.hover.background,
          },
          press: {
            overlay: baseTheme.linkBases.default.normal.press.background,
          },
          focus: {
            overlay: baseTheme.linkBases.default.normal.focus.background,
          },
        },
        selected: {
          default: {
            overlay: {
              'background-color': 'rgba(255, 255, 255, 0.1)',
              padding: baseTheme.dimensions.padding,
            },
          },
        },
      },
    },
  });
  return theme;
};
