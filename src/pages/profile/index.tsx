import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUserStore } from '@/stores';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Icon } from '@iconify/react';
import { Card } from '@/components/ui/card';

function Profile() {
  const navigate = useNavigate();
  const { userData, updateUserData, fetchUserData, resetUserData } =
    useUserStore();

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
  }>({
    name: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (userData.name || userData.email) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
      });
    } else {
      fetchUserData();
    }
  }, [userData, fetchUserData]);

  useEffect(() => {
    const changed =
      formData.name !== userData.name || formData.email !== userData.email;
    setHasChanges(changed);
  }, [formData, userData]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      await updateUserData({
        name: formData.name.trim(),
        email: formData.email.trim(),
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || 'Failed to update profile'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: userData.name || '',
      email: userData.email || '',
    });
    setError('');
    setSuccess(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    resetUserData();
    navigate('/');
  };

  return (
    <div className='w-full min-h-screen flex items-center justify-center p-4'>
      <Card className='w-full max-w-md border border-gray-800 bg-gray-900 shadow-2xl'>
        <div className='p-8 space-y-6'>
          <div className='relative w-full text-center'>
            <h1 className='font-semibold text-white text-3xl tracking-tight'>
              Profile Settings
            </h1>
            <p className='text-gray-400 text-sm mt-2'>
              Update your profile information
            </p>
          </div>

          {error && (
            <div className='w-full p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm'>
              {error}
            </div>
          )}

          {success && (
            <div className='w-full p-3 bg-green-900/30 border border-green-700 rounded-lg text-green-300 text-sm'>
              Profile updated successfully!
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name' className='text-gray-300'>
                Name
              </Label>
              <Input
                type='text'
                placeholder='Enter your name'
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-600'
                required
                disabled={isLoading}
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email' className='text-gray-300'>
                Email
              </Label>
              <Input
                type='email'
                placeholder='Enter your email'
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-600'
                required
                disabled={isLoading}
              />
            </div>

            <div className='flex gap-3 pt-4'>
              <Button
                type='submit'
                className='flex-1 cursor-pointertext-gray-300 bg-gray-800 hover:text-white cursor-pointer hover:bg-gray-800 font-medium transition-colors disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed'
                disabled={!hasChanges || isLoading}
              >
                {isLoading ? 'Updating...' : 'Update Profile'}
              </Button>
              {hasChanges && (
                <Button
                  type='button'
                  variant='outline'
                  onClick={handleReset}
                  className='flex-1 text-gray-300 bg-gray-800 hover:text-white cursor-pointer hover:bg-gray-800'
                  disabled={isLoading}
                >
                  Reset
                </Button>
              )}
            </div>
          </form>

          <div className='border-t border-gray-800 pt-6 space-y-3'>
            <h2 className='text-white font-semibold text-lg'>
              Account Actions
            </h2>
            <Button
              type='button'
              variant='outline'
              onClick={() => navigate('/change-password')}
              className='w-full border-gray-700 text-gray-300 bg-gray-800 hover:text-white cursor-pointer hover:bg-gray-800 !gap-1'
            >
              <Icon
                icon='mdi:lock-reset'
                className='mr-1'
                width='20'
                height='20'
              />
              Change Password
            </Button>
            <Button
              type='button'
              variant='outline'
              onClick={handleLogout}
              className='w-full border-gray-700 text-red-600 bg-gray-800 hover:text-red-700 cursor-pointer hover:bg-gray-800 !gap-1'
            >
              <Icon icon='mdi:logout' className='mr-1' width='20' height='20' />
              Logout
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Profile;
