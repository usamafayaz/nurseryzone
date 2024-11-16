// constants.js
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const appTheme = {
  colors: {
    primaryBackground: '#FFFFFF',
    secondaryBackground: '#F5F8F5', // Light sage
    inputBackground: '#F0F4F0', // Lighter sage for inputs
    primaryText: '#2D3A2D', // Dark green
    secondaryText: '#5C745C', // Muted green
    placeholderText: '#96A896', // Light muted green
    primary: '#4A8B3D', // Forest green
    secondary: '#7AB770', // Light green
    accent: '#E6B34E', // Golden yellow for accents
    success: '#43A047', // Success green
    error: '#D32F2F', // Error red
    border: '#CCDACC', // Light border
    iconActive: '#4A8B3D', // Forest green
    iconInactive: '#96A896', // Muted green
  },
  fontSizes: {
    small: width * 0.035,
    medium: width * 0.04,
    large: width * 0.05,
    xlarge: width * 0.06,
  },
  fontFamilies: {
    regular: 'Roboto-Regular',
    bold: 'Roboto-Bold',
    monospace: 'monospace',
  },
  screen: {
    width,
    height,
  },
};
