import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip'; 

export const Container = styled.div`

    background: #ffffff;
    border-radius: 10px;
    padding: 10px;
    width: 100%;
    display: flex;
    align-items: center;

    border: 3.5px solid #0b2544;
    color: #666360;
    & + div {
        margin-top: 8px;
    }

    ${props => props.isErrored && css `
        border-color: #c53030;
    `}

    ${props => props.isFocused && css `
        color: #61b34e;
        border-color: #61b34e;
    `}

    ${props => props.isFilled && css `
        color: #61b34e;
    `}

    input {
        background: transparent;
        color: #0b2544;
        flex: 1;
        border: 0;
        height: 26px;
        outline: 0;
        //-webkit-box-shadow: 0 0 0 30px white inset;
        

        &::placeholder {
            color: #666360;
        }

        
    }
    svg {
        margin-right: 16px;
    }
`;

export const Error = styled(Tooltip)`
    margin-left: 16px;
    
    svg {
        margin: 0;
    }

    span {
        background: #c53030;
        color: #fff;

        &::before {
            border-color: #c53030 transparent;
        }
    }
`
