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
    },
    buttons: {
      default: {
        normal: {
          default: {
            text: {
              'font-size': '0.8em',
            },
          },
        },
      },
      primary: {
        normal: {
          default: {
            background: {
              'background-color': 'rgba(255, 255, 255, 0.25)',
              'border-color': 'rgba(255, 255, 255, 0.3)',
              'border-width': '1px',
            },
            text: {
              color: '$colors.textOnBrand',
            },
          },
          hover: {
            background: {
              'background-color': 'rgba(255, 255, 255, 0.35)',
            },
          },
          press: {
            background: {
              'background-color': 'rgba(255, 255, 255, 0.55)',
            },
          },
          focus: {
            background: {
              'border-color': 'rgba(255, 255, 255, 0.75)',
            },
          },
        },
      },
      secondary: {
        normal: {
          default: {
            background: {
              'border-color': '#ffffff',
              'border-width': '1px',
              'background-color': 'transparent',
              'box-shadow': '0px 0px 5px 5px rgba(255, 255, 255, 0.35) ',
            },
            text: {
              color: '#FFFFFF',
              'text-shadow': '0px 0px 5px #FFFFFF ',
            },
          },
          hover: {
            background: {
              'background-color': 'rgba(255, 255, 255, 0.35)',
            },
          },
          press: {
            background: {
              'background-color': 'rgba(255, 255, 255, 0.55)',
            },
          },
          focus: {
            background: {
              'border-color': 'rgba(255, 255, 255, 0.75)',
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
