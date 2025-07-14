import styled, {css} from "styled-components/native";
import { TextProps } from ".";

export const Container = styled.Text<TextProps>`
 ${({ theme, variant }: { theme: import('styled-components').DefaultTheme; variant?: string }) => theme.textVariantes[variant || 'body3']}
 color: ${({ color }: { color?: string }) => color};

 ${({ bold }: { bold?: boolean }) => bold && css`
   font-weight: 700;
   `}

   ${({ textAlign }: { textAlign?: string }) => textAlign && css`
   text-align: ${textAlign};
   `}
`;