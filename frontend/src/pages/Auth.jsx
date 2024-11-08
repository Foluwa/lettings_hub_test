import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Auth = () => {
  const { login, loading, isAuthenticated } = useAuth(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        <h1 className="h3 my-4 fw-normal">Please sign in</h1>
        <span>Email:<b>&nbsp;johndoe@example.com</b>  <br /> password:<b>&nbsp;password123</b></span>

        <div className="form-floating">
          <input type="email" className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </div>
        <div className="form-floating mt-2">
          <input type="password" className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </div>
        {error && <p className="bold text-danger">{error}</p>}

        <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={loading}>{loading?'Loading...':'Sign in'}</button>
        <p className="mt-5 mb-3 text-muted"> Back to <Link to="/">home</Link></p>
      </form>


    </div>
  );
};

export default Auth;