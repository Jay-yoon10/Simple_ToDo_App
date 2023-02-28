import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}

export default function Form() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: '@naver.com',
    },
  });
  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError(
        'password1',
        { message: 'Password are not the same' },
        { shouldFocus: true }
      );
    }
    setError('extraError', { message: 'Server offline' });
  };
  console.log(errors?.email?.message);
  return (
    <div>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: 'Only email ends with @naver.com is allowed.',
            },
          })}
          placeholder='Email'
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register('firstName', {
            required: 'First name is required',
            validate: (value) =>
              value.includes('Jay') ? 'no Jay alloed' : true,
          })}
          placeholder='First Name'
        />
        <span>{errors?.firstName?.message}</span>
        <input
          {...register('lastName', {
            required: 'Last name is required',
            validate: {
              noNico: (value) =>
                value.includes('nico') ? 'no nicos allowed' : true,
              noNick: (value) =>
                value.includes('nick') ? 'nick is not allowed' : true,
            },
          })}
          placeholder='Last Name'
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register('username', {
            required: 'Username is required',
            minLength: 10,
          })}
          placeholder='Username'
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 5, message: 'Your password is too short.' },
          })}
          placeholder='Password'
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register('password1', {
            required: 'Password is required',
            minLength: 5,
          })}
          placeholder='Password1'
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

/* export default function TodoList() {
  const [todo, setTodo] = useState('');
  const [todoError, setTodoError] = useState('');
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTodoError('');
    setTodo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todo.length < 10) {
      return setTodoError('Todo should be longer');
    }
    console.log('submit');
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={todo} placeholder='Write a to do' />
        <button>Add</button>
        {todoError !== '' ? todoError : null}
      </form>
    </div>
  );
}
 */
