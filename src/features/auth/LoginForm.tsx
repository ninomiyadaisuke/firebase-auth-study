import { useRouter } from 'next/router';
import styled from 'styled-components';
import { z } from 'zod';

import PrimaryButton from '@/components/button/PrimaryButton';
import Form from '@/components/forms/Form';
import PrimaryInput from '@/components/forms/PrimaryInput';

const initialState = {
  email: '',
  password: '',
};

const registerSchema = z.object({
  email: z.string().email({ message: 'メールアドレスの形式で入力してください' }),
  password: z
    .string()
    .min(1, 'パスワードを入力してください')
    .regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i, 'パスワードは半角英数字混合で入力してください'),
});

type FormValues = z.infer<typeof registerSchema>;

const LoginForm = () => {
  const router = useRouter();
  const login = async (values: FormValues) => {
    await fetch('/api/auth/session', {
      method: 'POST',
      body: JSON.stringify({ ...values, authentication: 'login' }),
      headers: { 'Content-Type': 'application/json' },
    });
    router.push('/dashboard');
  };
  return (
    <Form<FormValues> onSubmit={login} options={{ defaultValues: initialState }} schema={registerSchema}>
      {({ register, formState: { errors } }) => (
        <Wrapper>
          <PrimaryInput
            type="email"
            placeholder="メールアドレス"
            registration={register('email')}
            errorMesseage={errors.email?.message}
          />
          <PrimaryInput
            type="password"
            placeholder="パスワード"
            registration={register('password')}
            errorMesseage={errors.password?.message}
          />
          <BtnWrapper>
            <PrimaryButton text="ログイン" />
          </BtnWrapper>
        </Wrapper>
      )}
    </Form>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 50px;
  width: 80%;
  margin: 100px auto;
`;
const BtnWrapper = styled.div`
  text-align: center;
`;

export default LoginForm;
