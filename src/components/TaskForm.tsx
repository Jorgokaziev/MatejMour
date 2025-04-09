
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Task, Priority } from '@/types/task';
import { useToast } from '@/hooks/use-toast';

interface TaskFormProps {
  onAddTask: (task: Task) => void;
  editingTask?: Task | null;
  onCancelEdit?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, editingTask, onCancelEdit }) => {
  const { toast } = useToast();
  const [title, setTitle] = useState(editingTask ? editingTask.title : '');
  const [description, setDescription] = useState(editingTask ? editingTask.description : '');
  const [priority, setPriority] = useState<Priority>(editingTask ? editingTask.priority : 'medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Task title cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const newTask: Task = {
      id: editingTask ? editingTask.id : crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      completed: editingTask ? editingTask.completed : false,
      createdAt: editingTask ? editingTask.createdAt : new Date().toISOString(),
      priority,
    };

    onAddTask(newTask);
    toast({
      title: editingTask ? "Task Updated" : "Task Added",
      description: editingTask ? "Your task has been updated successfully" : "Your new task has been added",
    });

    if (!editingTask) {
      setTitle('');
      setDescription('');
      setPriority('medium');
    } else if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-sm border border-taskflow-yellow/50">
      <h2 className="text-xl font-semibold text-taskflow-gray">
        {editingTask ? 'Edit Task' : 'Add New Task'}
      </h2>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-taskflow-yellow/70 focus-visible:ring-taskflow-orange"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Task description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border-taskflow-yellow/70 focus-visible:ring-taskflow-orange"
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <Label>Priority</Label>
        <RadioGroup 
          value={priority} 
          onValueChange={(value) => setPriority(value as Priority)}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="low" id="low" className="text-taskflow-teal border-taskflow-teal" />
            <Label htmlFor="low" className="text-taskflow-teal">Low</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" className="text-taskflow-yellow border-taskflow-yellow" />
            <Label htmlFor="medium" className="text-taskflow-yellow">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="high" id="high" className="text-taskflow-sienna border-taskflow-sienna" />
            <Label htmlFor="high" className="text-taskflow-sienna">High</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="flex gap-2 pt-2">
        <Button type="submit" className="bg-taskflow-orange hover:bg-taskflow-sienna text-white">
          {editingTask ? 'Update Task' : 'Add Task'}
        </Button>
        {editingTask && onCancelEdit && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancelEdit}
            className="border-taskflow-yellow text-taskflow-gray hover:bg-taskflow-yellow/10"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
