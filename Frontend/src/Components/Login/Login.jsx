// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { loginUser } from '../../Services/Auth.service.js';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate=useNavigate();

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     const userData= {email, password };
//     try {
//       const response=await loginUser(userData); 
//       if(response)
//       {
//         navigate('/');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (

//     <div className="flex min-h-screen">
//       <div className="w-1/2 bg-white flex items-center justify-center">
//         <img src="/dist/logo.png" alt="Logo" className="h-64" />
//       </div>
//       <div className="w-1/2 bg-gray-900 flex items-center justify-center">
//       <button onClick={()=>{
//         navigate('/')
//       }} className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out">
//         Home
//       </button>
//         <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//           <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
//                 Email Address
//               </label>
//               <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
//             </div>
//             <div className="mb-6">
//               <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
//                 Password
//               </label>
//               <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your password"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
//             </div>
//             <button type="submit"
//               className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
//             >
//               Login
//             </button>
//           </form>
//           <p className="text-center text-gray-600 mt-4">
//             Don't have an account?{' '}
//             <Link to={'/register'} className="text-blue-500 hover:underline">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../Services/Auth.service.js';
import { Toaster } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submits
    if (isLoading) return;

    setIsLoading(true);
    try {
      const success = await loginUser({ email, password });
      if (success) {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Left Side - Logo Section */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <img src="/dist/logo.png" alt="Logo" className="h-64" />
      </div>

      {/* Right Side - Form Section */}
      <div className="w-1/2 bg-gray-900 flex items-center justify-center relative">
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          Home
        </button>

        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out`}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Don’t have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
