
import React from 'react';
import { Task } from '@/types/task';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const priorityColors = {
    low: 'bg-taskflow-teal/20 text-taskflow-teal hover:bg-taskflow-teal/30',
    medium: 'bg-taskflow-yellow/20 text-taskflow-gray hover:bg-taskflow-yellow/30',
    high: 'bg-taskflow-sienna/20 text-taskflow-sienna hover:bg-taskflow-sienna/30',
  };

  return (
    <div className={`p-4 mb-3 border rounded-lg shadow-sm transition-all animate-fade-in ${
      task.completed ? 'bg-gray-50 opacity-80 border-taskflow-teal/30' : 'bg-white border-taskflow-yellow/30'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <Checkbox 
            checked={task.completed} 
            onCheckedChange={() => onToggleComplete(task.id)}
            className="mt-1.5 border-taskflow-orange/70 data-[state=checked]:bg-taskflow-orange data-[state=checked]:border-taskflow-orange"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-medium text-lg ${
                task.completed ? 'line-through text-gray-500' : 'text-taskflow-gray'
              }`}>
                {task.title}
              </h3>
              <Badge className={priorityColors[task.priority]}>
                {task.priority}
              </Badge>
            </div>
            {task.description && (
              <p className={`text-sm mb-2 ${
                task.completed ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {task.description}
              </p>
            )}
            <p className="text-xs text-gray-400">
              {format(new Date(task.createdAt), 'MMM d, yyyy • h:mm a')}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2 ml-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(task)}
            className="h-8 w-8 p-0 border-taskflow-yellow/50 hover:bg-taskflow-yellow/10"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-taskflow-orange"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
              <path d="m15 5 4 4"/>
            </svg>
            <span className="sr-only">Edit</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onDelete(task.id)}
            className="h-8 w-8 p-0 border-taskflow-yellow/50 hover:bg-taskflow-yellow/10"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-taskflow-sienna"
            >
              <path d="M3 6h18"/>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              <line x1="10" x2="10" y1="11" y2="17"/>
              <line x1="14" x2="14" y1="11" y2="17"/>
            </svg>
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
