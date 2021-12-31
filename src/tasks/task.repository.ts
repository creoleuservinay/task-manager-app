import { EntityRepository, Repository } from "typeorm";
import { CreateClassDto } from "./dto/create-task-dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./task.status-enum";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
    
    async getTasksList(filtereddto: GetTasksFilterDto): Promise<Task[]>{
        const {status} = filtereddto;
        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', {status});
        }

        // if (search) {
        //     // query.andWhere(
        //     //     'task.title LIKE :search', {search: `%${search}%`}
        //     // );
        // }
        
       const tasks = await query.getMany();
        return tasks;
    }

    async createTask(createtaskdto: CreateClassDto): Promise<Task>{
        const {title, description} = createtaskdto;
        const task = this.create({
            title,
            description,
            status: TaskStatus .OPEN
        });
        await this.save(task);
        return task;
    }
}