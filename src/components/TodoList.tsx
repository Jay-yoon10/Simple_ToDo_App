import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Categories,
  categoryState,
  customCategoriesState,
  toDoSelector,
} from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

interface ICat {
  category: string;
  cCategory: string;
}
export default function TodoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [customCategory, setCustomCategory] = useRecoilState(
    customCategoriesState
  );
  const { register, handleSubmit, setValue } = useForm<ICat>();
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const onValid = ({ cCategory }: ICat) => {
    setCustomCategory((prev) => {
      const newCustomCats = [...prev, cCategory];
      localStorage.setItem('customCats', JSON.stringify(newCustomCats));
      return newCustomCats;
    });
    setValue('cCategory', '');
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register('cCategory')} placeholder='category' />
        <button>Add Category</button>
      </form>
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
        {customCategory.map((cCat) => (
          <option key={Math.random()} value={cCat}>
            {cCat}
          </option>
        ))}
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}
