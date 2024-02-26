import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegistrationFormFields, registerSchema } from '../schemas';

export default function FormWithReactHookFormAndZod() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<RegistrationFormFields>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit: SubmitHandler<RegistrationFormFields> = async (data) => {
    console.log('data:', data);
    // simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Form submitted successfully!');
    reset();
  };

  const renderError = ({ message }: { message: string }) => (
    <div className="text-red-500 max-w-[400px]">{message}</div>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-2 min-w-[inherit]"
    >
      <input
        type="text"
        placeholder="Email"
        {...register('email')}
        className="px-4 py-2 rounded text-black"
      />
      <ErrorMessage name="email" errors={errors} render={renderError} />

      <input
        type="password"
        placeholder="Password"
        {...register('password')}
        className="px-4 py-2 rounded text-black"
      />
      <ErrorMessage name="password" errors={errors} render={renderError} />

      <input
        type="password"
        placeholder="Confirm password"
        {...register('confirmPassword')}
        className="px-4 py-2 rounded text-black"
      />
      <ErrorMessage
        name="confirmPassword"
        errors={errors}
        render={renderError}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
      >
        Submit{isSubmitting ? 'ting...' : null}
      </button>
    </form>
  );
}
