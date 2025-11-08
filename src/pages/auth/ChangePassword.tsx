import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { changePasswordApi } from '@/utils/API';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';

function ChangePassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      setError('New password must be different from current password');
      return;
    }

    setIsLoading(true);

    try {
      const response = await changePasswordApi(
        formData.currentPassword,
        formData.newPassword
      );
      if (response) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to change password';
      setError(errorMessage);
      if (err?.response) {
        toast.error(err.response.data?.message || 'Failed to change password');
      } else {
        toast.error(err?.message || 'Failed to change password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className='flex relative items-center justify-center h-screen bg-black w-screen'>
        <div className='border relative border-gray-800 rounded-lg flex flex-col items-center justify-center p-10 space-y-6 max-w-lg w-full bg-gray-900 shadow-2xl'>
          <div className='text-center space-y-4'>
            <Icon
              icon='mdi:check-circle'
              className='text-green-500 mx-auto'
              width='64'
              height='64'
            />
            <h1 className='font-semibold text-white text-2xl'>
              Password Changed Successfully!
            </h1>
            <p className='text-gray-400 text-sm'>
              Your password has been changed successfully. Redirecting to
              home...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex relative items-center justify-center h-screen bg-gray-950 w-screen'>
      <form
        onSubmit={handleChangePassword}
        className='border relative border-gray-800 rounded-lg flex flex-col items-center justify-center p-12 space-y-8 max-w-lg w-full bg-gray-900 shadow-2xl'
      >
        <button
          type='button'
          onClick={() => navigate('/')}
          className='absolute top-6 right-6 text-white hover:text-gray-300 transition-colors'
        >
          <Icon icon='akar-icons:cross' width='20' height='20' />
        </button>
        <section className='relative w-full text-center pb-2'>
          <h1 className='font-semibold text-white text-3xl tracking-tight'>
            Change Password
          </h1>
          <p className='text-gray-400 text-sm mt-3'>
            Enter your current password and choose a new one.
          </p>
        </section>

        {error && (
          <div className='w-full p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm'>
            {error}
          </div>
        )}

        <section className='space-y-3 w-full'>
          <Label htmlFor='currentPassword' className='text-gray-300'>
            Current Password
          </Label>
          <div className='relative'>
            <Input
              type={showCurrentPassword ? 'text' : 'password'}
              placeholder='Enter current password'
              value={formData.currentPassword}
              onChange={(e) =>
                setFormData({ ...formData, currentPassword: e.target.value })
              }
              className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-600 pr-10'
              required
              disabled={isLoading}
            />
            <button
              type='button'
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors'
              disabled={isLoading}
            >
              <Icon
                icon={showCurrentPassword ? 'mdi:eye-off' : 'mdi:eye'}
                width='20'
                height='20'
              />
            </button>
          </div>
        </section>

        <section className='space-y-3 w-full'>
          <Label htmlFor='newPassword' className='text-gray-300'>
            New Password
          </Label>
          <div className='relative'>
            <Input
              type={showNewPassword ? 'text' : 'password'}
              placeholder='Enter new password'
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
              className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-600 pr-10'
              required
              disabled={isLoading}
              minLength={6}
            />
            <button
              type='button'
              onClick={() => setShowNewPassword(!showNewPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors'
              disabled={isLoading}
            >
              <Icon
                icon={showNewPassword ? 'mdi:eye-off' : 'mdi:eye'}
                width='20'
                height='20'
              />
            </button>
          </div>
        </section>

        <section className='space-y-3 w-full'>
          <Label htmlFor='confirmPassword' className='text-gray-300'>
            Confirm New Password
          </Label>
          <div className='relative'>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Confirm new password'
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-600 pr-10'
              required
              disabled={isLoading}
              minLength={6}
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors'
              disabled={isLoading}
            >
              <Icon
                icon={showConfirmPassword ? 'mdi:eye-off' : 'mdi:eye'}
                width='20'
                height='20'
              />
            </button>
          </div>
        </section>

        <section className='w-full pt-4'>
          <Button
            type='submit'
            className='w-full cursor-pointer bg-white text-black hover:bg-gray-200 font-medium transition-colors disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed'
            disabled={
              !formData.currentPassword ||
              !formData.newPassword ||
              !formData.confirmPassword ||
              isLoading
            }
          >
            {isLoading ? 'Changing...' : 'Change Password'}
          </Button>
        </section>
      </form>
    </div>
  );
}

export default ChangePassword;
