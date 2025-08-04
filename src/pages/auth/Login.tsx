import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: '',
      password: '',
    }
  );
  return (
    <div className='border rounded-lg flex flex-col items-center justify-center p-10 space-y-6 w-96'>
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
          defaultValue={formData.email}
          onBlur={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
      </section>
      <section className='w-full'>
        <Button type='submit' className='w-full cursor-pointer'>
          Login
        </Button>
      </section>

      <section className='border-t pt-2'>
        <h1>
          Don't have an account?
          <span className='text-primary mx-1 font-medium'>Register</span>
          instead
        </h1>
      </section>
    </div>
  );
}

export default Login;
