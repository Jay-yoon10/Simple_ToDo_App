import { useForm } from 'react-hook-form';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { categoryState, toDoState } from '../atoms';
interface IForm {
  todo: string;
  category?: string;
}

export default function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = (data: IForm) => {
    setToDos((prev) => [
      { text: data.todo, id: Date.now(), category },
      ...prev,
    ]);
    setValue('todo', '');
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register('todo', {
            required: 'Please write a Task',
          })}
          placeholder='Write a Task'
        />

        <button>Add</button>
      </form>
    </>
  );
}
