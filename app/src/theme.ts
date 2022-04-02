import { buildTheme, ITheme } from '@kibalabs/ui-react';
import { transparentize } from 'polished';

export const buildAppTheme = (): ITheme => {
  const baseTheme = buildTheme();
  const brandPrimary = '#B3C7F8';
  const theme = buildTheme({
    colors: {
      brandPrimary: brandPrimary,
      background: '#000000',
      text: '#ffffff',
    },
    fonts: {
      main: {
        url: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap',
      },
    },
    texts: {
      default: {
        'font-family': "'Montserrat', sans-serif",
        'font-weight': '400',
      },
      note: {
        color: '$colors.textClear50',
      },
      header3: {
        'font-size': '2.0rem',
        'font-weight': '500',
        'margin-bottom': '0.25em',
        'text-shadow': '0px 0px 5px #F0F0F0',
      },
    },
    boxes: {
      card: {
        margin: '0',
      },
      wideBorder: {
        margin: '0',
        'box-shadow': '0px 0px 50px 20px rgba(255, 255, 255, 0.35) ',
      },
      dottedBorder: {
        margin: '0',
        'border-style': 'dashed',
        'border-width': '0.20em',
        'border-color': '#FFFFFF',
      },
    },
    buttons: {
      primary: {
        normal: {
          default: {
            background: {
              'border-color': '#ffffff',
              'border-width': '1px',
              'background-color': 'transparent',
              'box-shadow': `0px 0px 4px 4px ${transparentize(brandPrimary, 0.2)}`,
            },
            text: {
              color: '$colors.brandPrimary',
              'text-shadow': `0px 0px 0.75em ${transparentize(brandPrimary, 0.75)}`,
            },
          },
        },
      },
      large: {
        normal: {
          default: {
            background: {
              'border-radius': '1em',
            },
            text: {
              'font-size': '1.2em',
              'text-shadow': `0px 0px 0.75em ${transparentize(brandPrimary, 0.25)}`,
            },
          },
        },
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
