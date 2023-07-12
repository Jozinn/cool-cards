import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateAdmin } from '../slices/adminSlice';

function Admin() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({});
  const admin = useSelector(state => state.admin.value);
  const dispatch = useDispatch();

  const handleChnage = e => {
    const field = e.target;
    setFormData({
      ...formData,
      [field.name]: field.value 
    });
  }

  const register = async e =>  {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/admins', {
      method: 'POST',
      mode: 'cors',
      body: {
        admin: formData
      }
    });

    const adminData = await response.json();
    dispatch(updateAdmin(adminData));
  }

  const login = async e => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/sessions', {
      method: 'POST',
      mode: 'cors',
      body: {
        admin: formData
      }
    });

    const adminData = await response.json();
    dispatch(updateAdmin(adminData));
  }

  return (
    <div>
      {isLogin && <div className='p-4 mx-auto border-4 border-slate-500'>
          <h2 className='mb-8'>Log in</h2>
          <form onSubmit={login}>
            <label className='text-xs block' htmlFor='name'>Admin name:</label>
            <input onChange={handleChnage} id='name' type='text' name='name' className='bg-white p-4 mb-2' />
            <label className='text-xs block' htmlFor='password'>Password:</label>
            <input onChange={handleChnage} id='password' type='text' name='password' className='bg-white p-4 mb-2' />
            <button type='submit' className='bg-sky-600 text-white text-center p-4 hover:bg-sky-800 mb-2'>Log in</button>
            <p className='text-center'>
              Don't have admin account? <span className='text-sky-600 hover:text-black' onClick={() => setIsLogin(false)}>Sign up</span>
            </p>
          </form>
        </div>
      }
      {!isLogin && <div className='p-4 mx-auto border-4 border-slate-500'>
          <h2 className='mb-8'>Sign up</h2>
          <form onSubmit={register}>
          <label className='text-xs block' htmlFor='name'>Admin name:</label>
            <input onChange={handleChnage} id='name' type='text' name='name' className='bg-white p-4 mb-2' />
            <label className='text-xs block' htmlFor='password'>Password:</label>
            <input onChange={handleChnage} id='password' type='text' name='password' className='bg-white p-4 mb-2' />
            <label className='text-xs block' htmlFor='password'>Confirm Password:</label>
            <input onChange={handleChnage} id='password' type='text' name='conf-password' className='bg-white p-4 mb-2' />
            <button type='submit' className='bg-sky-600 text-white text-center p-4 hover:bg-sky-800 mb-2'>Sign up</button>
            <p className='text-center'>
              Already an admin? <span className='text-sky-600 hover:text-black' onClick={() => setIsLogin(true)}>Log in</span>
            </p>
          </form>
        </div>}
    </div>
  )
}

export default Admin