import styled from 'styled-components';

const Text = styled.span`
  font-family: 'Noto Sans KR', sans-serif;
  letter-spacing: -0.5px;
`;

export default Text;

export const TextWithLink = Text.withComponent('a');
export const TextWithButton = Text.withComponent('button');
export const TextWithInput = Text.withComponent('input');