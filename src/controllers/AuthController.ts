import { Request, Response } from "express";
import { prisma } from "../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";


class AuthController {
  async autehnticate(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({ 
        where: {
          email
        }
      });
      if (!user) {
        return res.status(401).json({message: "Invalid credentials"});
      }
      
      const validPassword = await compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = sign({ id: user.id, }, "secret", { expiresIn: "1m" });
      return res.status(200).json({ user: {id : user.id, name: user.name, email: user.email}, token });
        
        
    } catch (error) {
      console.error("Error authenticating user", error);
      return res.status(500).json({ message: "Error authenticating user" });
      
    }

  }
}