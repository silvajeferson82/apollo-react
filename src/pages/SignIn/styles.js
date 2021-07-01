import styled from 'styled-components';
import SignInBackgroundImg from '../../assets/generic-image.png'
import { shade } from 'polished';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;
    width: 100%;
    max-width: 700px;
    background-color: #0b2544;

    @media (min-width: 720px) and (max-width: 1279px){
        max-width: 100% ;
    }

    @media (min-width: 1280px){
        max-width: 50% ;
    }

    form {
        margin: 45px 0;
        width: 340px;
        text-align: center;

        h1 {
            color: #ffffff;
            margin-bottom: 24px;
            font-size: 26px;
        }

        button {
            /* background: #61b34e; */
            height: 50px;
            border-radius: 10px !important;
            border: 0;
            padding: 0 40px 0 40px !important;
            color: #495057 !important;
            width: 80%;
            /* font-weight: 550; */
            margin-top: 16px;
            transition: background-color 0.2s;
            font-size: 16px;

            &:hover {
                background: ${shade(0.1, '#61b34e')};
            }
        }

        span {
            font-weight: 600 !important;
        }

        a {
            color: #f4ede8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;

            &:hover {
                color: ${shade(0.2, '#f4ede8')}
            }
        }
    }

    > a {
        color: #ff9000;
        margin-top: 24px;
        text-decoration: none;
        display: flex;
        align-items: center;
        transition: color 0.2s;

        svg {
            margin-right: 16px;
        }

        &:hover {
            color: ${shade(0.2, '#f4ede8')}
        }
    }
`;

export const Background = styled.div`
    flex: 1;
    background: #0b2544 url(${SignInBackgroundImg}) no-repeat center;
    z-index: 1;
    background-size: cover;
`;