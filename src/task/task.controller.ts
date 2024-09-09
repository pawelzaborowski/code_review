import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { InputTaskUpdateDto } from './input.task-update.dto';

@Controller()
export class TaskController {
  constructor(private service: TaskService) {}

  @Post()
  async createTask(@Body() taskDto: any, @Req() req) {
    taskDto.userId = req.user.id;
    const task = await this.service.saveTask(taskDto);
    return task;
  }

  @Put('/:id')
  async updateTask(@Body() input: InputTaskUpdateDto, @Param() id: string) {
    const task = await this.service.getTaskById(id);
    await this.service.updateTask(input, task);
  }

  @Get()
  async getAllTasks() {
    return this.service.getAllTasks();
  }

  @Get('user')
  async getUserTasks(@Req() req) {
    return this.service.getUserTasks(req.user.id);
  }
}
