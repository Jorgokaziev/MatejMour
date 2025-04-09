
import React, { useState, useEffect } from 'react';
import { Task, FilterOption, SortOption } from '@/types/task';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { loadTasks, saveTasks } from '@/utils/storage';
import { useToast } from '@/hooks/use-toast';

const TaskManager: React.FC = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState<FilterOption>('all');
  const [sortOption, setSortOption] = useState<SortOption>('date');

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const loadedTasks = loadTasks();
    setTasks(loadedTasks);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleAddTask = (task: Task) => {
    if (editingTask) {
      // Update existing task
      setTasks(tasks.map(t => t.id === task.id ? task : t));
      setEditingTask(null);
    } else {
      // Add new task
      setTasks([task, ...tasks]);
    }
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed } 
        : task
    ));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleDeleteTask = (taskId: string) => {
    const taskToDelete = tasks.find(task => task.id === taskId);
    if (!taskToDelete) return;
    
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      title: "Task Deleted",
      description: `"${taskToDelete.title}" has been deleted`
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <TaskForm 
        onAddTask={handleAddTask} 
        editingTask={editingTask}
        onCancelEdit={() => setEditingTask(null)}
      />
      
      <div className="mt-8">
        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterOption={filterOption}
          setFilterOption={setFilterOption}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      </div>
    </div>
  );
};

export default TaskManager;
