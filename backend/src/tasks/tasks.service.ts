import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User, Status } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll(user: User) {
    return this.prisma.task.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(createTaskDto: CreateTaskDto, user: User) {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        user: { connect: { id: user.id } },
      },
    });
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, user: User) {
    const task = await this.findOne(id);
    if (task.userId !== user.id) {
      throw new ForbiddenException(
        'Você não tem permissão para editar esta tarefa',
      );
    }
    return this.prisma.task.update({
      where: { id },
      data: { ...updateTaskDto },
    });
  }

  async remove(id: number, user: User) {
    const task = await this.findOne(id);
    if (task.userId !== user.id) {
      throw new ForbiddenException(
        'Você não tem permissão para excluir esta tarefa',
      );
    }
    await this.prisma.task.delete({ where: { id } });
  }

  async markAsComplete(id: number, user: User) {
    const task = await this.findOne(id);
    if (task.userId !== user.id) {
      throw new ForbiddenException(
        'Você não tem permissão para alterar esta tarefa',
      );
    }
    return this.prisma.task.update({
      where: { id },
      data: { status: Status.CONCLUIDA },
    });
  }
}
