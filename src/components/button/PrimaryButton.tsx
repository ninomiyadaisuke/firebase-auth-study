import { FC } from 'react';
import styled, { keyframes } from 'styled-components';

type Props = {
  text: string;
  onClick?: () => void;
  loading?: boolean;
};

const PrimaryButton: FC<Props> = (props) => {
  const { text, onClick, loading } = props;
  return (
    <Btn onClick={onClick} disabled={loading}>
      {loading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        text
      )}
    </Btn>
  );
};

const Btn = styled.button`
  position: relative;
  background-color: #ef4565;
  width: 112px;
  height: 45px;
  color: white;
  border: none;
  border-radius: 20px;
  &:hover {
    background: #de3d5c;
  }
  &:disabled {
    background: #de3d5c;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const rotation = keyframes`
    from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const Spinner = styled.div`
  width: 30px;
  height: 30px;
  border-top: 3px solid rgba(0, 174, 239, 0.8);
  border-right: 3px solid rgba(0, 174, 239, 0.15);
  border-bottom: 3px solid rgba(0, 174, 239, 0.15);
  border-left: 3px solid rgba(0, 174, 239, 0.15);
  border-radius: 100%;
  animation: ${rotation} 0.6s infinite linear;
`;

export default PrimaryButton;
