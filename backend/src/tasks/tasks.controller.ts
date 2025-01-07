// tasks/tasks.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as tarefas do usuário autenticado' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tarefas retornada com sucesso.',
  })
  getAll(@Request() req) {
    return this.tasksService.findAll(req.user);
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova tarefa' })
  @ApiResponse({
    status: 201,
    description: 'Tarefa criada com sucesso.',
  })
  async create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.tasksService.create(createTaskDto, req.user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Editar uma tarefa existente' })
  @ApiResponse({
    status: 200,
    description: 'Tarefa atualizada com sucesso.',
  })
  @ApiResponse({
    status: 403,
    description: 'Sem permissão para editar esta tarefa.',
  })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req,
  ) {
    return this.tasksService.update(id, updateTaskDto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir uma tarefa' })
  @ApiResponse({ status: 200, description: 'Tarefa excluída com sucesso.' })
  @ApiResponse({
    status: 403,
    description: 'Sem permissão para excluir esta tarefa.',
  })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.' })
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.tasksService.remove(id, req.user);
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: 'Marcar uma tarefa como concluída' })
  @ApiResponse({
    status: 200,
    description: 'Tarefa marcada como concluída.',
  })
  @ApiResponse({
    status: 403,
    description: 'Sem permissão para alterar esta tarefa.',
  })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.' })
  markAsComplete(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.tasksService.markAsComplete(id, req.user);
  }
}
