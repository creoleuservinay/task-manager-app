import { Controller, Get, Post, Body, Req, Param, ConsoleLogger, Delete, Patch, ParseIntPipe, Query } from '@nestjs/common';
import { query } from 'express';
import { CreateTasksDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { updateTaskStatusDto } from './dto/update-task-status.dto';
import { Task, TaskStatus } from './task.status-enum';
import { TasksService } from './tasks.service';
//import { Request } from 'express';

@Controller('tasks')
export class TasksController {
    constructor(private taskservice: TasksService) { }

    
    @Post()
    createTask(@Body() createtaskdto: CreateTasksDto
    ): Promise<Task> {
       return this.taskservice.createTask(createtaskdto);
    }
    
    
    
    @Get('/:id')
    GetTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task>{
        console.log(id);
        return this.taskservice.getTaskById(id);
    }
    
    @Delete('/:id')
    DeleteTaskById(@Param('id') id: number): Promise<void>{
        return this.taskservice.deleteTaskById(id);
        
    }

    @Patch('/:id/status')
    updateTask(
        @Param('id') id: number,
        @Body() updateTaskStatusDto: updateTaskStatusDto
    ): Promise<Task>{
        const {status} = updateTaskStatusDto;

        return this.taskservice.updateTask(id, status);
    }
 
    @Get()
    getTasks(@Query() filtereddto: GetTasksFilterDto): Promise<Task[]>{
        return this.taskservice.getTasks(filtereddto);
    }

    // @Post()
    // createTask(@Body() createtaskdto: CreateTasksDto
    // ): Task {
    //    return this.taskservice.createTask(createtaskdto);
    // }
    
    // @Get()
    // getAllTasks(): Task[] {
    //     return this.taskservice.getAllTask();
    // }
    
    // @Get('/:id')
    // GetTaskById(@Param('id') id: string): Task{
    //     console.log(id);
    //     return this.taskservice.getTaskById(id);
    // }
    
    // @Delete('/:id')
    // DeleteTaskById(@Param('id', ParseIntPipe) id: string): void{
        //     console.log(id);
    //     return this.taskservice.deleteTaskById(id);
    // }
    
    // @Patch('/:id/status')
    // updateTask(
    //     @Param('id') id: string,
    //     @Body() updateTaskStatusDto: updateTaskStatusDto
    // ): Task{
    //     const {status} = updateTaskStatusDto;

    //     return this.taskservice.updateTask(id, status);
    // }

}
