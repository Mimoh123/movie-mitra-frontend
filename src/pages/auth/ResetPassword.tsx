import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resetPasswordApi } from '@/utils/API';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { Icon } from '@iconify/react';

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError(
        'Invalid or missing reset token. Please request a new password reset link.'
      );
    }
  }, [token]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!token) {
      setError('Invalid reset token');
      return;
    }

    setIsLoading(true);

    try {
      const response = await resetPasswordApi(token, formData.password);
      if (response) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/auth/login');
        }, 2000);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || 'Failed to reset password'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className='flex relative items-center justify-center h-screen bg-black w-screen'>
        <div className='border relative border-gray-800 rounded-lg flex flex-col items-center justify-center p-10 space-y-6 w-96 bg-gray-900 shadow-2xl'>
          <div className='text-center space-y-4'>
            <Icon
              icon='mdi:check-circle'
              className='text-green-500 mx-auto'
              width='64'
              height='64'
            />
            <h1 className='font-semibold text-white text-2xl'>
              Password Reset Successful!
            </h1>
            <p className='text-gray-400 text-sm'>
              Your password has been reset successfully. Redirecting to login...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex relative items-center justify-center h-screen bg-black w-screen'>
      <form
        onSubmit={handleResetPassword}
        className='border relative border-gray-800 rounded-lg flex flex-col items-center justify-center p-10 space-y-6 w-96 bg-gray-900 shadow-2xl'
      >
        <Link to='/auth/login' className='absolute top-5 right-5 text-white'>
          <Icon icon='akar-icons:cross' width='20' height='20' />
        </Link>
        <section className='relative w-full text-center'>
          <h1 className='font-semibold text-white text-3xl tracking-tight'>
            Reset Password
          </h1>
          <p className='text-gray-400 text-sm mt-2'>
            Enter your new password below.
          </p>
        </section>

        {error && (
          <div className='w-full p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm'>
            {error}
          </div>
        )}

        <section className='space-y-2 w-full'>
          <Label htmlFor='password' className='text-gray-300'>
            New Password
          </Label>
          <Input
            type='password'
            placeholder='Enter new password'
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-600'
            required
            disabled={isLoading || !token}
            minLength={6}
          />
        </section>

        <section className='space-y-2 w-full'>
          <Label htmlFor='confirmPassword' className='text-gray-300'>
            Confirm Password
          </Label>
          <Input
            type='password'
            placeholder='Confirm new password'
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-600'
            required
            disabled={isLoading || !token}
            minLength={6}
          />
        </section>

        <section className='w-full pt-2'>
          <Button
            type='submit'
            className='w-full cursor-pointer bg-white text-black hover:bg-gray-200 font-medium transition-colors disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed'
            disabled={
              !formData.password ||
              !formData.confirmPassword ||
              isLoading ||
              !token
            }
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword;
