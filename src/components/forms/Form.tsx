import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import type { ZodType, ZodTypeDef } from 'zod';

type FormProps<TFormValues extends FieldValues, Schema> = {
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => ReactNode;
  options?: UseFormProps<TFormValues>;
  id?: string;
  schema?: Schema;
};

const Form = <
  TFormValues extends Record<string, unknown>,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<unknown, ZodTypeDef, unknown>
>(
  props: FormProps<TFormValues, Schema>
) => {
  const { onSubmit, children, options, id, schema } = props;
  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema && zodResolver(schema),
  });

  const {
    reset,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (!isSubmitSuccessful) return;
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} id={id}>
      {children(methods)}
    </form>
  );
};

export default Form;
