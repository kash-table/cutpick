import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import brandLogoImage from '../../assets/nav_logo.png';

const Brand = ({ className, history }) => {
  const onClickBrand = () => history.push('/');

  return (
    <BrandImage
      className={className}
      src={brandLogoImage}
      onClick={onClickBrand}
    />
  );
};

const BrandImage = styled.img`
  height: 40px;
  margin-right: 56.2px;
  cursor: pointer;
`;

export default withRouter(Brand);