import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Auth = () => {
// const { login,loading, isAuthenticated } = useContext(useAuth);
const { login, loading, isAuthenticated } = useAuth();  // Destructure login, loading, and isAuthenticated from the useAuth hook
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
  
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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Auth;


// import React, { useState } from 'react';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// const Auth = () => {
//     const { login, loading } = useAuth();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);
//         try {
//             await login({ email, password });
//             // Introduce a delay of 2 seconds (2000 milliseconds)
//             await new Promise((resolve) => setTimeout(resolve, 2000));
//             navigate('/dashboard');
//         } catch (err) {
//             setError('Invalid credentials');
//             toast('Invalid credentials');
//         }
//     };

//     console.log('Rendering Auth component', loading);

//     return (
//         <div>
//             <h2>Login</h2>
//             {/* <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit" disabled={loading}>
//                     {loading ? 'Loading...' : 'Login'}
//                 </button>
//             </form> */}
//               <div className="text-center">
//               <main className="form-signin">
//             <form>
//                 <img
//                     className="mb-4"
//                     src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg"
//                     alt="Bootstrap logo"
//                     width="72"
//                     height="57"
//                 />
//                 <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

//                 <div className="form-floating">
//                     <input
//                         type="email"
//                         className="form-control"
//                         id="floatingInput"
//                         placeholder="name@example.com"
//                     />
//                     <label htmlFor="floatingInput">Email address</label>
//                 </div>

//                 <div className="form-floating">
//                     <input
//                         type="password"
//                         className="form-control"
//                         id="floatingPassword"
//                         placeholder="Password"
//                     />
//                     <label htmlFor="floatingPassword">Password</label>
//                 </div>

//                 <div className="checkbox mb-3">
//                     <label>
//                         <input type="checkbox" value="remember-me" /> Remember me
//                     </label>
//                 </div>
//                 <button className="w-100 btn btn-lg btn-primary" type="submit">
//                     Sign in
//                 </button>
//                 <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
//             </form>
            
//             {error && <p>{error}</p>}
//             </main>
//             </div>
//         </div>
//     );
// };

// export default Auth;
