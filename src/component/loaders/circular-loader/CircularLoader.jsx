import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const CircularLoader = styled.div`
  width: ${(props) => props.width || '12px'};
  height: ${(props) => props.height || '12px'};
  border: 1px solid ${(props) => props.borderColor || 'white'};
  border-left-color: transparent;
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
`;

CircularLoader.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  borderColor: PropTypes.string,
};

export default CircularLoader;
