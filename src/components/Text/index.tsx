import { PropsWithChildren } from 'react';
import { TextProps as RNTextProps} from 'react-native';

import { Theme } from '../../../styles/styled';

import theme from '../../../styles/theme';

import { Container } from './style';

export type TextProps = RNTextProps & {
    variant?: keyof Theme['textVariantes'];
    color?: keyof Theme['colors'];
    bold?: boolean;
    textAlign?: keyof Theme['textVariantes'];
}
const Text = ({
    variant,
    color,
    bold,
    textAlign,
    children,
    ...rest
}: PropsWithChildren<TextProps>) => {
    return (
        <Container
            variant={variant}
            color={color}
            bold={bold}
            textAlign={textAlign}
            {...rest}
        >
            {children}
        </Container>
        

    );
};
Text.defaultProps = {
    variant: 'body3',
    color: theme.colors.black,
    bold: false,
    textAlign: 'left',
};
export default Text;