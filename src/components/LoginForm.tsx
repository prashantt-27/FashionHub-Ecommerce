import { useState } from "react";

interface LoginFormProps {
  onLogin: (name: string, email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(name, email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-center">Login</h2>
      <input
        type="text"
        placeholder="Name"
        className="border p-2 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
