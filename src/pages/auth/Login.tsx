import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginApi } from '@/utils/API';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

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
      console.log('clicked');
      const response = await loginApi(formData.email, formData.password);
      if (response) {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
      className='border rounded-lg flex flex-col items-center justify-center p-10 space-y-6 w-96'
    >
      <section className=''>
        <h1 className='font-medium text-2xl'>Login</h1>
      </section>
      <section
        className='space-y-2 w-full
      '
      >
        <Label htmlFor='email'>Email</Label>
        <Input
          type='email'
          placeholder='Email'
          defaultValue={formData.email}
          onBlur={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
          required
        />
      </section>
      <section
        className='space-y-2 w-full
      '
      >
        <span className='flex items-center justify-between w-full'>
          <Label htmlFor='email'>Password</Label>
          <button className='text-xs '>Forgot Password?</button>
        </span>

        <Input
          type='password'
          placeholder='Password'
          defaultValue={formData.password}
          onBlur={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
          required
        />
      </section>
      <section className='w-full'>
        <Button
          type='submit'
          className='w-full cursor-pointer'
          disabled={!formData.email || !formData.password}
        >
          Login
        </Button>
      </section>

      <section className='border-t pt-2'>
        <h1>
          Don't have an account?
          <button
            type='button'
            className='text-primary mx-1 font-bold'
            onClick={() => navigate('/auth/signup')}
          >
            Register
          </button>
          instead
        </h1>
      </section>
    </form>
  );
}

export default Login;
