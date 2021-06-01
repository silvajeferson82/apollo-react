import styled from 'styled-components';

export const Container = styled.div`

    background: #ffffff;
    border-radius: 10px;
    border: 2px solid #232129;
    padding: 10px;
    width: 100%;
    display: flex;
    align-items: center;

    & + div {
        margin-top: 8px;
    }

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
