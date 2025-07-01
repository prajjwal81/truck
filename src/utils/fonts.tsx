import {Platform} from 'react-native';

export const Cairo = Platform.OS === 'android' ? 'Cairo' : 'Cairo-Bold';

export const CairoRegular = Platform.OS === 'android' ? 'Cairo' : 'Cairo';

export const CairoSemiBold =
  Platform.OS === 'android' ? 'Cairo' : 'Cairo-SemiBold';

export const CairoBold = Platform.OS === 'android' ? 'Cairo' : 'Cairo-Bold';
