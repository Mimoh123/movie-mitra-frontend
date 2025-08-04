import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';

function SignUp() {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: '',
    email: '',
    password: '',
  });
  return (
    <div className='border rounded-lg flex flex-col items-center justify-center p-10 space-y-6 w-96'>
      <section className=''>
        <h1 className='font-medium text-2xl'>Register</h1>
      </section>
      <section
        className='space-y-2 w-full
      '
      >
        <Label htmlFor='email'>Name</Label>
        <Input
          type='text'
          placeholder='Name'
          defaultValue={formData.name}
          onBlur={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
        />
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
        <Label htmlFor='email'>Password</Label>
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
          Register
        </Button>
      </section>
    </div>
  );
}

export default SignUp;
