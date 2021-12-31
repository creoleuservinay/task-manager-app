import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateClassDto } from './dto/create-task-dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

     getAllTask(): Task[]{
         return this.tasks;
     }

     createTask(createtaskdto: CreateClassDto): Task {
        const {title, description} = createtaskdto;
        const task: Task = {
        id: uuid(),
        title: title,
        description: description,
        status: TaskStatus.OPEN,
       }
       this.tasks.push(task);
       return task;
    }

    getTaskById(id:string): Task{
        const found = this.tasks.find((task) => task.id === id);

        if(!found){
            throw new NotFoundException(`Task Not found`);
        }
        return found;
    }
    deleteTaskById(id: string): void{
        this.tasks = this.tasks.filter((task) => task.id !== id)
    }

    updateTask(id:string, status: TaskStatus){
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
