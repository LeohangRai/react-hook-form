import { useState } from 'react';

type ErrorMessages = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function FormWithoutReactHookForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ErrorMessages>({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    if (!email) {
      setErrors({
        ...errors,
        email: 'Email is required'
      });
      setIsSubmitting(false);
      return;
    }
    if (!password) {
      setErrors({
        ...errors,
        password: 'Password is required'
      });
      setIsSubmitting(false);
      return;
    }
    if (!confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: 'Confirm Password is required'
      });
      setIsSubmitting(false);
      return;
    }
    if (password !== confirmPassword) {
      setErrors({
        confirmPassword: 'Password and confirm password must match'
      });
      setIsSubmitting(false);
      return;
    }
    // simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Form submitted successfully!');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-2 min-w-[inherit]"
    >
      <input
        type="text"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 rounded text-black"
      />
      {errors.email && <div className="text-red-500">{errors.email}</div>}

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-4 py-2 rounded text-black"
      />
      {errors.password && <div className="text-red-500">{errors.password}</div>}

      <input
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="px-4 py-2 rounded text-black"
      />
      {errors.confirmPassword && (
        <div className="text-red-500">{errors.confirmPassword}</div>
      )}

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
