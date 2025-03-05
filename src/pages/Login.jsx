import { useState } from "react";
import { useAuth } from "../services/AuthProvider";

const Login = () => {
    const user = useAuth();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {

    }
          //dispatch action from hooks
          console.log("calling")
          user.loginAction({input})
    alert("please provide a valid input");
  };

  const handleInput = (e) => {
    
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (

    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@yahoo.com"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="text-blue-500 focus:ring-0" />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        >
          Sign In
        </button>
      </form>
      <p className="text-sm text-center text-gray-600">
        Don't have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
      </p>
    </div>

  );
};

export default Login;