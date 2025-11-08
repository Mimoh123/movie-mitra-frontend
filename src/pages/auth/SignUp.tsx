import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { registerApi } from '@/utils/API';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Loader2 } from 'lucide-react';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: '',
    email: '',
    password: '',
  });
  const handleSignUp = async () => {
    setSubmitting(true);
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
    } finally {
      setSubmitting(false);
    }
  };
  const [submitting, setSubmitting] = useState(false);
  const [backLoading, setBackLoading] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSignUp();
      }}
      className='border rounded-lg flex flex-col items-center justify-center p-10 space-y-6 w-96'
    >
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
          defaultValue={formData.password}
          onBlur={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
      </section>
      <section className='w-full'>
        <Button type='submit' className='w-full cursor-pointer' disabled={submitting}>
          {submitting ? <Loader2 className='w-4 h-4 animate-spin mr-2' /> : null}
          {submitting ? 'Registering...' : 'Register'}
        </Button>
      </section>
      <section className='w-full text-center'>
        <button
          type='button'
          className='text-sm text-neutral-400 mt-4 hover:underline inline-flex items-center gap-2'
          onClick={() => {
            setBackLoading(true);
            setTimeout(() => navigate('/auth/login'), 200);
          }}
          disabled={backLoading}
        >
          {backLoading ? <Loader2 className='w-4 h-4 animate-spin' /> : null}
          Back to login
        </button>
      </section>
    </form>
  );
}

export default SignUp;
