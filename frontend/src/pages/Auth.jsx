import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Auth = () => {
  const { login, loading, isAuthenticated } = useAuth();  // Destructure login, loading, and isAuthenticated from the useAuth hook

  const [email, setEmail] = useState('johndoe@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    // Format the data as application/x-www-form-urlencoded
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      console.log(err.response.data.detail);
      setError('Invalid credentials');
      toast('Invalid credentials');
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');  // Redirect to dashboard if already authenticated
    }
  }, [navigate]);

  return (
    <div className="auth-body form-signin mt-4">


      <form onSubmit={handleSubmit}>
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

        <div class="form-floating">
          <input type="email" class="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </div>
        <div class="form-floating">
          <input type="password" class="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </div>
        {error && <p className="bold text-danger">{error}</p>}

        <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        <p class="mt-5 mb-3 text-muted"> Back to <Link to="/">home</Link></p>
      </form>


    </div>
  );
};

export default Auth;