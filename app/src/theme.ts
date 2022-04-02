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
              'box-shadow': '0px 0px 4px 4px rgba(255, 255, 255, 0.2)',
            },
            text: {
              color: '#FFFFFF',
              'text-shadow': '0px 0px 0.75em rgba(255, 255, 255, 0.75)',
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
              'border-width': '0px',
              'background-color': 'transparent',
            },
            text: {
              color: '#FFFFFF',
              'text-shadow': '0px 0px 1em rgba(255, 255, 255, 0.9)',
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
      large: {
        normal: {
          default: {
            background: {
              "border-radius": '1em',
            },
            text: {
              "font-size": '1.2em',
            }
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
