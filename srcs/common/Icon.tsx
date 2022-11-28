import {GestureResponderEvent} from 'react-native';
import {SvgProps} from 'react-native-svg';

import * as Icons from '../../assets/icons';

type IconProps = SvgProps & {
  name: keyof typeof Icons;
  color: string;
  size: number;
};

export default function Icon({name, color, size, ...props}: IconProps) {
  const MyIcon = Icons[name];
  return <MyIcon color={color} width={size} height={size} {...props} />;
}
