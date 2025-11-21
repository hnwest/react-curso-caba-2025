import { useState } from 'react';
import type {FormEvent,ChangeEvent} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/AuthContext';

const Login = () => {

 

    const [loginError, setLoginError] = useState<string | null>(null);

    const [formData, setFormData] = useState<{username: string; password: string}>({
        username: '',
        password: ''
    });

    const navigate = useNavigate();
    const authContext = useAuthContext();

    const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.username === '' || formData.password === '') {
            setLoginError('Por favor, complete todos los campos.');
            return;
        }
        const success = await authContext.login(formData.username, formData.password);
        if (success) {  
            setLoginError(null);
            navigate('/admin');
        }  
        
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

  return (
    <>
    <div className=" p-4">        
        <div className="flex justify-center items-center mb-4 loader ">
            <div className="border-1 border-gray-300 rounded p-8 w-96 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={handleLoginSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Usuario
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={handleChange}
                            value={formData.username}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Ingresa tu correo"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password" 
                            onChange={handleChange}
                            value={formData.password}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Ingresa tu contraseña"
                        />
                    </div>
                    <div className="errors mb-4 text-red-500">
                        {loginError && <p className="text-red-500 text-xs">{loginError}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Ingresar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
       <div className=" p-4">        
        <div className="flex justify-center items-center mb-4 loader ">
            <p className='text-sm text-gray-500'>Usuarios de prueba
                <br />
                - Admin: admin@test.com / 1234
                <br />
                - Usuario: user@test.com / 1234
            </p>
        </div>
    </div>
    </>
  );
};

export default Login;
