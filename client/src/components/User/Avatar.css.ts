import styled from 'styled-components';
import { AvatarProps } from './Avatar';

export const StyledAvatar = styled.div<AvatarProps>`
    width: ${(props) => props.width};
    border-radius: 4px;
    display: inline-block;
    cursor: pointer;
    overflow: hidden;

    img {
        display: block;
        object-fit: cover;
        height: ${(props) => props.width};
        width: 100%;
        border-radius: 4px;
    }
`;