import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegistrationFormFields, registerSchema } from '../schemas';
const DEFAULT_EMAIL = 'raileohang@gmail.com';

export default function FormWithReactHookFormAndZodAndServerErrors() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<RegistrationFormFields>({
    resolver: zodResolver(registerSchema),
    /* setting default values for the form input fields */
    defaultValues: {
      email: DEFAULT_EMAIL
    }
  });

  const onSubmit: SubmitHandler<RegistrationFormFields> = async ({ email }) => {
    try {
      // simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      /* simulate server validation errors */
      if (email === DEFAULT_EMAIL) {
        throw new Error(
          /* Be warned: Don't try this at home or office lol */
          JSON.stringify({ path: 'email', message: 'Email already in use' })
        );
      }
      if (email.endsWith('hotmail.com')) {
        throw new Error(
          /* Don't try this at home or office lol */
          JSON.stringify({
            path: 'root',
            message: "Sorry! Hotmail ain't anymore!"
          })
        );
      }
      /* END server validation errors simulation */
      console.log('Form submitted successfully!');
      reset();
    } catch (error: any) {
      const { path, message } = JSON.parse(error.message);
      /* manually setting errors for input field */
      setError(path, {
        message
      });
    }
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

      {errors.root && (
        <div className="text-red-500 max-w-[400px] text-center">
          {errors.root.message}
        </div>
      )}
    </form>
  );
}
