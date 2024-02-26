import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

type FormFields = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function FormWithReactHookFormAndErrorMsgComponent() {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
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
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: 'Enter a valid email'
          }
        })}
        className="px-4 py-2 rounded text-black"
      />
      <ErrorMessage name="email" errors={errors} render={renderError} />

      <input
        type="password"
        placeholder="Password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long'
          },
          validate: (value) => {
            if (
              !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).+$/.test(value)
            ) {
              return 'Password must contain a lower case letter, an upper case letter and a number';
            }
            return true;
          }
        })}
        className="px-4 py-2 rounded text-black"
      />
      <ErrorMessage name="password" errors={errors} render={renderError} />

      <input
        type="password"
        placeholder="Confirm password"
        {...register('confirmPassword', {
          required: 'Confirm password is required',
          validate: (value) => {
            if (value !== getValues('password')) {
              return 'Password and Confirm password must match';
            }
            return true;
          }
        })}
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
