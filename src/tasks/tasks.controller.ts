import { Controller, Get, Post, Body, Req, Param, ConsoleLogger, Delete, Patch, ParseIntPipe } from '@nestjs/common';
import { CreateClassDto } from './dto/create-task-dto';
import { updateTaskStatusDto } from './dto/update-task-status.dto';
import { Task, TaskStatus } from './task.status-enum';
import { TasksService } from './tasks.service';
//import { Request } from 'express';

@Controller('tasks')
export class TasksController {
    constructor(private taskservice: TasksService) { }

    
    @Post()
    createTask(@Body() createtaskdto: CreateClassDto
    ): Task {
       return this.taskservice.createTask(createtaskdto);
    }
    
    @Get()
    getAllTasks(): Task[] {
        return this.taskservice.getAllTask();
    }
    
    @Get('/:id')
    GetTaskById(@Param('id') id: string): Task{
        console.log(id);
        return this.taskservice.getTaskById(id);
    }

    @Delete('/:id')
    DeleteTaskById(@Param('id', ParseIntPipe) id: string): void{
        console.log(id);
        return this.taskservice.deleteTaskById(id);
    }
    
    @Patch('/:id/status')
    updateTask(
        @Param('id') id: string,
        @Body() updateTaskStatusDto: updateTaskStatusDto
    ): Task{
        const {status} = updateTaskStatusDto;

        return this.taskservice.updateTask(id, status);
    }

}
