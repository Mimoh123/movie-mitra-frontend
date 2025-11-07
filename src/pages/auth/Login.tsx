import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginApi } from '@/utils/API';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Icon } from '@iconify/react';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: '',
      password: '',
    }
  );
  const handleLogin = async () => {
    try {
      const response = await loginApi(formData.email, formData.password);
      if (response) {
        localStorage.setItem('token', response.data.token);
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='flex relative items-center justify-center h-screen bg-black w-screen'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className='border relative border-neutral-800 rounded-lg flex flex-col items-center justify-center p-10 space-y-6 w-96 bg-neutral-900 shadow-2xl'
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
          <Label htmlFor='email' className='text-neutral-300'>
            Email
          </Label>
          <Input
            type='email'
            placeholder='Email'
            defaultValue={formData.email}
            onBlur={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            className='bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-neutral-600'
            required
          />
        </section>
        <section className='space-y-2 w-full'>
          <span className='flex items-center justify-between w-full'>
            <Label htmlFor='password' className='text-neutral-300'>
              Password
            </Label>
            <button
              type='button'
              className='text-xs text-neutral-400 hover:text-neutral-300 transition-colors'
            >
              Forgot Password?
            </button>
          </span>

          <Input
            type='password'
            placeholder='Password'
            defaultValue={formData.password}
            onBlur={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            className='bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-neutral-600'
            required
          />
        </section>
        <section className='w-full pt-2'>
          <Button
            type='submit'
            className='w-full cursor-pointer bg-white text-black hover:bg-neutral-200 font-medium transition-colors disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed'
            disabled={!formData.email || !formData.password}
          >
            Login
          </Button>
        </section>

        <section className='border-t border-neutral-800 pt-6 w-full'>
          <h1 className='text-center text-neutral-400 text-sm'>
            Don't have an account?{' '}
            <button
              type='button'
              className='text-white mx-1 font-semibold hover:text-neutral-300 transition-colors underline underline-offset-2'
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
