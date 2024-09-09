import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { InputTaskUpdateDto } from './input.task-update.dto';

@Injectable()
export class TaskService {
  constructor(private _taskRepository: Repository<TaskEntity>) {}

  async saveTask(taskDto: any) {
    const task = new TaskEntity(taskDto);
    task.interval = 10;
    await this._taskRepository.save(task);
    return task;
  }

  async updateTask(input: InputTaskUpdateDto, task: TaskEntity) {
    if (input.status === 'in_progress' && task.status !== 'created') {
      throw new BadRequestException();
    }
    if (input.status === 'done' && task.status != 'in_progress') {
      throw new BadRequestException();
    }
    task.title = input.title;
    task.description = input.description ? input.description : null;
    task.value = input.value ? input.value : 1;
    await this.saveTask(task);
  }

  async getAllTasks(): Promise<TaskEntity[]> {
    return this._taskRepository.find();
  }

  async getUserTasks(userId: string): Promise<TaskEntity[]> {
    return this._taskRepository.find({ where: { userId: { id: userId } } });
  }

  async getTaskById(id: string) {
    return this._taskRepository.findOne({
      where: {
        id,
      },
    });
  }
}
