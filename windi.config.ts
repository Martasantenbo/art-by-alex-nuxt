import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  attributify: true,
  theme: {
    extend: {
      fontFamily: {
      header: ['Macondo Swash Caps', 'cursive'],
      text: ['Montserrat', 'sans-serif']
    },
      screens: {
        desktop: { min: '1280px' }
      },
      fontSize: {
        huge: ['60px', '90px'],
        large: ['18px', '26px'],
        normal: ['16px', '24px'],
        small: ['14px', '22px']
      },
      colors: {
        primary: { DEFAULT: '#52524E', pastel: '#D3D3D2' },
        secondary: '#49D3CC',
        background: { DEFAULT: '#ECEEFB', secondary: '#D1DFF3' },
      },
      boxShadow: {
        passive: '0 0 40px 0 rgba(32, 28, 70, 0.05)',
        hover: '0 0 40px 0 rgba(32, 28, 70, 0.15)'
      },
    }
  },
  shortcuts: {
    'content-container': 'max-w-screen-xl md:mx-auto',
  },
});