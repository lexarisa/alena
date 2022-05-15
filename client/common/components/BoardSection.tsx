import React, { useEffect, useState } from 'react';
import ITask from '../types/ITask';
import Card from './Card';
import Task from './Task';
import CustomButton from './small/CustomButton';
import { createNewTask } from '../../pages/api/taskApi';
import styles from '../../styles/BoardSection.module.css';
import { useRouter } from 'next/router';


interface BoardInterface {
  columnTitle: String;
  tasks: ITask[];
}

const emptyTask = {} as ITask;

const BoardSection = ({ columnTitle, tasks }: BoardInterface) => {

  const [showTask, setShowTask] = useState(false);
  const [currentTask, setCurrentTask] = useState<ITask>(emptyTask);
  const [showButton, setShowButton] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const router = useRouter();

  const taskProps = {
    showTask: showTask, // bool
    task: currentTask,
    setCurrentTask: setCurrentTask,
    setShowTask: setShowTask,
  };

  const handleClick = (task: ITask) => {
    setShowTask(!showTask);
    setCurrentTask(task);
  };

  const handleShowInput = () => {
    setShowInput(!showInput);
    setShowButton(false);
  };

  const handleCreateTask = async () => {
    if (taskTitle === '') {
      return;
    } else {
      const newTask: ITask = {
        title: taskTitle,
        user_id: 93489785, 
        priority: 'none',
        project_id: 1,
        milestone_id: Number(router.query.id),
        status: columnTitle,
      };

      await createNewTask(newTask).catch((error) => console.log(error));
      setTaskTitle('');
      setShowInput(false);
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateTask();
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          <h2 className={styles.boardTitle}>{columnTitle}</h2>
        </div>
        {/* <CustomButton button="+ add" onClick={() => onClick()} /> */}

        <div>
          {tasks.map((task: ITask, index) => {
            // console.log(task);
            return (
              <div
                key={index}
                onClick={() => handleClick(task)}
                className={styles.taskCard}
              >
                <Card {...task} />
              </div>
            );
          })}
        </div>
        <button
          onClick={() => handleShowInput()}
          // style={showButton ? { display: 'flex' } : { display: 'none' }}
          className={styles.button}
        >
          + add
        </button>
        <div
          className={styles.createTask}
          style={showInput ? { display: 'flex' } : { display: 'none' }}
        >
          <input
            type="text"
            name="task"
            id="task"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={taskTitle}
            placeholder="Add new task"
            className={styles.input}
          />
          <button className={styles.addButton} onClick={handleCreateTask}>
            Add
          </button>
        </div>
        {showTask && <Task {...taskProps} />}
      </div>
    </>
  );
};

export default BoardSection;
