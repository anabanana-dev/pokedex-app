
import styled from 'styled-components/native';
import { darken } from 'polished';
import { Dimensions, Animated } from 'react-native';

const { height, width } = Dimensions.get('window');

import Constants from 'expo-constants';

import { TAB_BUTTON_WIDTH } from './tabs';
import { DefaultTheme } from 'styled-components';

export const Container = styled(Animated.View)`
  background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.white};
`;
export const ImageBall = styled.Image`
  width: 50px;
  height: 50px;
  position: absolute;
  opacity: 0.2;
  top: -20px;
`;

export const Tabs = styled.View`
  padding: 16px 0 24px;
  margin: 0 24px;
  border-style: solid;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const TabButton = styled.TouchableOpacity`
  height: 24px;
  width: ${TAB_BUTTON_WIDTH}px;
  color: #fff;
  align-items: center;
  justify-content: center;
`;

export const SelectedIndicator = styled(Animated.View)`
  background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.blue};
  height: 2px;
  width: ${TAB_BUTTON_WIDTH}px;
  position: absolute;
  bottom: -1px;
`;
export const SlideWrapper = styled.View`
  width: ${width}px;
  padding: 24px;
`;

export const ContentInfo = styled.View`
  flex: 0.7;
  justify-content: center;
  margin-left: 20px;
  margin-top: 15px;
`;

export const ContentType = styled.ScrollView`
  margin-top: 5px;
  height: 20px;
`;

interface TypeProps {
  backgroundColor: string;
}

export const Type = styled.View<TypeProps>`
  background-color: ${(props: TypeProps) => darken(0.2, props.backgroundColor)};
  min-width: 40px;
  height: 25px;
  padding: 4px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 4.65px;
  elevation: 8;
`;
export const SectionAbout = styled.View`
  margin: 0px 30px;
  margin-top: 30px;
`;