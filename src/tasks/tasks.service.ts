import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.status-enum';
import { v4 as uuid } from 'uuid';
import { CreateTasksDto } from './dto/create-task-dto';
import { NotFoundError } from 'rxjs';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}
   
    createTask(createtaskdto: CreateTasksDto): Promise<Task> {
        return this.taskRepository.createTask(createtaskdto);
    }

    async getTaskById(id:number): Promise<Task>{
        const found = this.taskRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with id "${id}" Not found`)
        }
        return found;
    }

    async deleteTaskById(id: number): Promise<void>{
        const removeTask = this.taskRepository.delete(id);
        if ((await removeTask).affected === 0) {
            throw new NotFoundException(`Task by id "${id}" not found`);
        }
    }

        async updateTask(id:number, status: TaskStatus): Promise<Task>{
            const task = this.getTaskById(id);
            (await task).status = status;
            await this.taskRepository.save(await task);
            return task;
        }

        async getTasks(filtereddto: GetTasksFilterDto): Promise<Task[]>{
            return this.taskRepository.getTasksList(filtereddto);
        }

     // private tasks: Task[] = [];

    //  getAllTask(): Task[]{
    //      return this.tasks;
    //  }

    //  createTask(createtaskdto: CreateTasksDto): Task {
    //     const {title, description} = createtaskdto;
    //     const task: Task = {
    //     id: uuid(),
    //     title: title,
    //     description: description,
    //     status: TaskStatus.OPEN,
    //    }
    //    this.tasks.push(task);
    //    return task;
    // }

    // getTaskById(id:string): Task{
    //     const found = this.tasks.find((task) => task.id === id);

    //     if(!found){
    //         throw new NotFoundException(`Task Not found`);
    //     }
    //     return found;
    // }
    // deleteTaskById(id: string): void{
    //     this.tasks = this.tasks.filter((task) => task.id !== id)
    // }

    // updateTask(id:string, status: TaskStatus){
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}
