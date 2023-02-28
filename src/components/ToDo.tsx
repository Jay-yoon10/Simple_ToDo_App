import React from 'react';
import { Categories, IToDo, toDoState } from '../atoms';
import { useSetRecoilState } from 'recoil';

export default function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  // const onClick = (newCategory: IToDo['category']) => {
  //   console.log('I wanna go to ', newCategory);
  // };
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((prevTodo) => {
      const targetIdx = prevTodo.findIndex((toDo) => toDo.id === id);
      const newTodo = { ...prevTodo[targetIdx], category: name as any };

      return [
        ...prevTodo.slice(0, targetIdx),
        newTodo,
        ...prevTodo.slice(targetIdx + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}
