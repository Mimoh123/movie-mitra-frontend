import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { registerApi } from '@/utils/API';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Icon } from '@iconify/react';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleSignUp = async () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');
    try {
      const response = await registerApi(
        formData.name,
        formData.email,
        formData.password
      );
      if (response) {
        navigate('/auth/login');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='flex relative items-center justify-center h-screen bg-gray-950 w-screen'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
        className='border relative border-gray-800 rounded-lg flex flex-col items-center justify-center p-10 space-y-6 w-96 bg-gray-900 shadow-2xl'
      >
        <Link to='/' className='absolute top-5 right-5 text-white'>
          <Icon icon='akar-icons:cross' width='20' height='20' />
        </Link>
        <section className='relative w-full text-center'>
          <h1 className='font-semibold text-white text-3xl tracking-tight'>
            Register
          </h1>
        </section>
        <section className='space-y-2 w-full'>
          <Label htmlFor='name' className='text-gray-300'>
            Name
          </Label>
          <Input
            type='text'
            placeholder='Name'
            defaultValue={formData.name}
            onBlur={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
            className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-600'
            required
          />
        </section>
        <section className='space-y-2 w-full'>
          <Label htmlFor='email' className='text-gray-300'>
            Email
          </Label>
          <Input
            type='email'
            placeholder='Email'
            defaultValue={formData.email}
            onBlur={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-600'
            required
          />
        </section>
        <section className='space-y-2 w-full'>
          <Label htmlFor='password' className='text-gray-300'>
            Password
          </Label>
          <div className='relative'>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              value={formData.password}
              onChange={(e) => {
                const newPassword = e.target.value;
                setFormData({ ...formData, password: newPassword });
                if (formData.confirmPassword) {
                  if (newPassword !== formData.confirmPassword) {
                    setPasswordError('Passwords do not match');
                  } else {
                    setPasswordError('');
                  }
                }
              }}
              className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-600 pr-10'
              required
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors'
            >
              <Icon
                icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'}
                width='20'
                height='20'
              />
            </button>
          </div>
        </section>
        <section className='space-y-2 w-full'>
          <Label htmlFor='confirmPassword' className='text-gray-300'>
            Confirm Password
          </Label>
          <div className='relative'>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={(e) => {
                const newConfirmPassword = e.target.value;
                setFormData({
                  ...formData,
                  confirmPassword: newConfirmPassword,
                });
                if (
                  formData.password &&
                  newConfirmPassword !== formData.password
                ) {
                  setPasswordError('Passwords do not match');
                } else {
                  setPasswordError('');
                }
              }}
              className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-gray-600 pr-10'
              required
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors'
            >
              <Icon
                icon={showConfirmPassword ? 'mdi:eye-off' : 'mdi:eye'}
                width='20'
                height='20'
              />
            </button>
          </div>
          {passwordError && (
            <p className='text-red-400 text-sm mt-1'>{passwordError}</p>
          )}
        </section>
        <section className='w-full pt-2'>
          <Button
            type='submit'
            className='w-full cursor-pointer bg-white text-black hover:bg-gray-200 font-medium transition-colors disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed'
            disabled={
              !formData.name ||
              !formData.email ||
              !formData.password ||
              !formData.confirmPassword ||
              formData.password !== formData.confirmPassword
            }
          >
            Register
          </Button>
        </section>

        <section className='border-t border-gray-800 pt-6 w-full'>
          <h1 className='text-center text-gray-400 text-sm'>
            Already have an account?{' '}
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

export default SignUp;
