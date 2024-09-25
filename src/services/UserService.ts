import { User } from "@prisma/client";
import { prisma } from "../prisma";
import { hash } from "bcryptjs";

class UserService {
  async createUser(name: string, email: string, password: string) {
    try {
      const userAlreadyExists = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (userAlreadyExists) {
        throw new Error("User already exists");
      }
      const hasPassword = await hash(password, 10);
      const user =  await prisma.user.create({
        data: {
          name,
          email,
          password: hasPassword,
        }, select: {
          id: true,
          name: true,
          email: true,
          password: false,
          createdAt: true,
          updatedAt: true,
        }
      });
      return user;
    } catch (error) {
      console.error('Error creating user', error);
      throw new Error("Error creating user");
    }
  }

  async getAll() {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          password: false,
          createdAt: true,
          updatedAt: true,
        }
      });
      return users;
    } catch (error) {
      console.error('Error getting all users', error);
      throw new Error("Error getting all users");
    }
  }

  async getById(id: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id
        },
      });
      return user;
    } catch (error) {
      console.error('Error getting user by id', error);
      throw new Error("Error getting user by id");
    }
  }
    async delete (id: string) {
      try {
        const user = await prisma.user.delete({
          where: {
            id
          }
        });
        return user;
      } catch (error) {
        console.error('Error deleting user', error);
        throw new Error("Error deleting user");
      }
    }
  
    async update (id: string, name: string, email: string, password: string) {
      try {
        const hasPassword = await hash(password, 10);
        const user = await prisma.user.update({
          where: {
            id
          },
          data: {
            name,
            email,
            password: hasPassword
          }, select: {
            id: true,
            name: true,
            email: true,
            password: false,
            createdAt: true,
            updatedAt: true,
            
          }
        });
        return user;
      } catch (error) {
        console.error('Error updating user', error);
        throw new Error("Error updating user");
      }
    }

}




export default UserService;