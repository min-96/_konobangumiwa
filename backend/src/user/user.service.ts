import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PrismaClient, User } from '@prisma/client';
import axios from 'axios';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}

  async createUser(data: { displayName: string; email: string , googleId: string}): Promise<User> {
    try {
      return await this.prisma.user.create({ data });
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new Error(`이미 등록된 ${data.email} 존재합니다`);
      } else {
        throw error;
      }
    }
  }

  async findAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async updateUser(userId : number ,data: {
    displayName?: string;
    introduction?: string;
    pictureUrl?: string;
  }): Promise<User> {
    const selectUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!selectUser) {
      throw new NotFoundException(`해당하는 ${userId} 가 없습니다.`);
    }

    try {
      return this.prisma.user.update({ where: { id: userId }, data });
    } catch (error) {
      throw new Error(
        `Error deleting user with id ${userId}: ${error.message}`,
      );
    }
  }

  async deleteUser(id: number): Promise<User> {
    const selectUser = await this.prisma.user.findUnique({ where: { id } });
    if (!selectUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new Error(`Error deleting user with id ${id}: ${error.message}`);
    }
  }

}
