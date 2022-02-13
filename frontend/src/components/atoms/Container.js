import styled from 'styled-components';

const Container = styled.div`
    background: white;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    @media screen and (max-width: 1700px) {
        max-width: 1050px;
    }
`;

export default Container;