import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom'; 

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const { dispatch } = useAuthContext();
  const navigate = useNavigate(); 

  const signup = async (userName, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://todo-backend-3s50.onrender.com/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
          userName,
        }),
      });

      if (!response.ok) {
        const json = await response.json();
        setError(json.message);
        setIsLoading(false);
      } else {
        // navigate('/login'); 
        navigate('/'); 
        setIsLoading(false);
      }
    } catch (error) {
      setError('An error occurred while signing up');
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
