import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';

type Props = {
  type: React.HTMLInputTypeAttribute;
  registration?: UseFormRegisterReturn;
  placeholder: string;
  errorMesseage?: string;
};

const PrimaryInput: FC<Props> = (props) => {
  const { type, registration, placeholder } = props;
  return (
    <Wrapper>
      <Input type={type} placeholder={placeholder} {...registration} autoComplete="on" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const Input = styled.input`
  height: 50px;
  border-radius: 30px;
  text-indent: 36px;
  transition: all 0.3s ease-in-out;
  outline: none;
  width: 100%;
  border: 2px solid #094067;
  color: #000000;
  &:focus {
    border: 2px solid #3da9fc;
  }
  &::placeholder {
    color: #cecece;
  }
  &:-webkit-autofill {
    box-shadow: 0 0 0px 1000px #ffffff inset;
  }
`;

export default PrimaryInput;
