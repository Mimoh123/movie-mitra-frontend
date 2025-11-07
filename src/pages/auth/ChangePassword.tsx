import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function ChangePassword() {
  const [form, setForm] = useState({ name: '', email: '', newPassword: '' });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({ newP: false });
  const navigate = useNavigate();

  function validate() {
    const e: { [k: string]: string } = {};
    if (!form.name) e.name = 'Name is required';
    if (!form.email) e.email = 'Email is required';
    // simple email check
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.newPassword) e.newPassword = 'New password is required';
    else if (form.newPassword.length < 8) e.newPassword = 'Password must be at least 8 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(evt?: React.FormEvent) {
    evt?.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      // TODO: replace with your API
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, newPassword: form.newPassword }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setErrors({ form: body.message || 'Failed to change password' });
      } else {
        navigate('/auth/login');
      }
    } catch (err) {
      console.error(err);
      setErrors({ form: 'Network error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className='border rounded-lg flex flex-col items-center justify-center p-10 space-y-6 w-96'>
      <h1 className='font-medium text-2xl'>Change Password</h1>

      <div className='w-full space-y-2'>
        <Label htmlFor='name'>Name</Label>
        <Input
          id='name'
          type='text'
          placeholder='Name'
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <p className='text-xs text-red-400'>{errors.name}</p>}
      </div>

      <div className='w-full space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          type='email'
          placeholder='Email'
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <p className='text-xs text-red-400'>{errors.email}</p>}
      </div>

      <div className='w-full space-y-2'>
        <Label htmlFor='new'>New password</Label>
        <div className='relative'>
          <Input
            id='new'
            type={show.newP ? 'text' : 'password'}
            placeholder='New password'
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          />
          <button type='button' onClick={() => setShow((s) => ({ ...s, newP: !s.newP }))} className='absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400'>
            {show.newP ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
          </button>
        </div>
        {errors.newPassword && <p className='text-xs text-red-400'>{errors.newPassword}</p>}
      </div>

      {errors.form && <p className='text-sm text-red-400'>{errors.form}</p>}

      <div className='w-full'>
        <Button type='submit' className='w-full' disabled={loading}>
          {loading ? 'Saving...' : 'Change password'}
        </Button>
      </div>

      <div className='text-sm text-center text-neutral-400'>
        <button type='button' className='text-primary' onClick={() => navigate('/auth/login')}>Back to login</button>
      </div>
    </form>
  );
}
