import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { validateFields } from '../utils/utility';

const Auth = () => {
  const { login, loading, isAuthenticated } = useAuth(); 

  const [error, setError] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    const validationErrors = validateFields(email, password);
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
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
      toast.error(err.response.data.detail);
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      // Redirect to dashboard if user already authenticated
      navigate('/dashboard');  
    }
  }, [navigate]);

  return (
    <div className="auth-body form-signin mt-4">


      <form onSubmit={handleSubmit}>
        <h1 className="h3 my-4 fw-normal">Please sign in</h1>
        <span>Email:<b>&nbsp;johndoe@example.com</b>  <br /> password:<b>&nbsp;password123</b></span>

        <div className="mt-3">
          <input type="email" className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
             {error.email && <p className="text-danger">{error.email}</p>}
        </div>
        <div className="mt-2">
          <input type="password" className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
             {error.password && <p className="text-danger">{error.password}</p>}
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={loading}>{loading?'Loading...':'Sign in'}</button>
        <p className="mt-5 mb-3 text-muted"> Back to <Link to="/">home</Link></p>
      </form>


    </div>
  );
};

export default Auth;