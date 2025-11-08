import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { forgotPasswordApi } from '@/utils/API';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await forgotPasswordApi(email);
      if (response) {
        setMessage(
          response.message ||
            'If the email exists, a password reset link has been sent.'
        );
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to send password reset email';
      setError(errorMessage);
      if (err?.response) {
        toast.error(
          err.response.data?.message || 'Failed to send password reset email'
        );
      } else {
        toast.error(err?.message || 'Failed to send password reset email');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex relative items-center justify-center h-screen bg-black w-screen'>
      <form
        onSubmit={handleForgotPassword}
        className='border relative border-gray-800 rounded-lg flex flex-col items-center justify-center p-10 space-y-6 w-96 bg-gray-900 shadow-2xl'
      >
        <Link to='/auth/login' className='absolute top-5 right-5 text-white'>
          <Icon icon='akar-icons:cross' width='20' height='20' />
        </Link>
        <section className='relative w-full text-center'>
          <h1 className='font-semibold text-white text-3xl tracking-tight'>
            Forgot Password
          </h1>
          <p className='text-gray-400 text-sm mt-2'>
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </section>

        {message && (
          <div className='w-full p-3 bg-green-900/30 border border-green-700 rounded-lg text-green-300 text-sm'>
            {message}
          </div>
        )}

        {error && (
          <div className='w-full p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm'>
            {error}
          </div>
        )}

        <section className='space-y-2 w-full'>
          <Label htmlFor='email' className='text-gray-300'>
            Email
          </Label>
          <Input
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-600'
            required
            disabled={isLoading}
          />
        </section>

        <section className='w-full pt-2'>
          <Button
            type='submit'
            className='w-full cursor-pointer bg-white text-black hover:bg-gray-200 font-medium transition-colors disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed'
            disabled={!email || isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </section>

        <section className='border-t border-gray-800 pt-6 w-full'>
          <h1 className='text-center text-gray-400 text-sm'>
            Remember your password?{' '}
            <button
              type='button'
              className='text-white mx-1 font-semibold hover:text-gray-300 transition-colors underline underline-offset-2'
              onClick={() => navigate('/auth/login')}
            >
              Login
            </button>
            instead
          </h1>
        </section>
      </form>
    </div>
  );
}

export default ForgotPassword;
