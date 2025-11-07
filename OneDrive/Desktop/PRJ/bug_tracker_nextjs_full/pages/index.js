import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(login(username, password)){
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  }

  return (
    <div className='login-container'>
      <h1>Bug Tracker Login</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder='Username' value={username} onChange={e=>setUsername(e.target.value)} />
        <input type='password' placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)} />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}