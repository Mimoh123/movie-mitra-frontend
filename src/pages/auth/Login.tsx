import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginApi } from '@/utils/API';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Icon } from '@iconify/react';
import { useUserStore } from '@/stores';

function Login() {
  const navigate = useNavigate();
  const { fetchUserData } = useUserStore();
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: '',
      password: '',
    }
  );
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async () => {
    try {
      const response = await loginApi(formData.email, formData.password);
      if (response) {
        localStorage.setItem('token', response.data.token);
        // Fetch user data immediately after login
        await fetchUserData();
        navigate('/');
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
          handleLogin();
        }}
        className='border relative border-gray-800 rounded-lg flex flex-col items-center justify-center p-10 space-y-6 w-96 bg-gray-900 shadow-2xl'
      >
        <Link to='/' className='absolute top-5 right-5 text-white'>
          <Icon icon='akar-icons:cross' width='20' height='20' />
        </Link>
        <section className='relative w-full text-center'>
          <h1 className='font-semibold text-white text-3xl tracking-tight'>
            Login
          </h1>
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
          <span className='flex items-center justify-between w-full'>
            <Label htmlFor='password' className='text-gray-300'>
              Password
            </Label>
            <Link
              to='/auth/forgot-password'
              className='text-xs text-gray-400 hover:text-gray-300 transition-colors'
            >
              Forgot Password?
            </Link>
          </span>

          <div className='relative'>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              defaultValue={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
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
        <section className='w-full pt-2'>
          <Button
            type='submit'
            className='w-full cursor-pointer bg-white text-black hover:bg-gray-200 font-medium transition-colors disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed'
            disabled={!formData.email || !formData.password}
          >
            Login
          </Button>
        </section>

        <section className='border-t border-gray-800 pt-6 w-full'>
          <h1 className='text-center text-gray-400 text-sm'>
            Don't have an account?{' '}
            <button
              type='button'
              className='text-white mx-1 font-semibold hover:text-gray-300 transition-colors underline underline-offset-2'
              onClick={() => navigate('/auth/register')}
            >
              Register
            </button>
            instead
          </h1>
        </section>
      </form>
    </div>
  );
}

export default Login;
