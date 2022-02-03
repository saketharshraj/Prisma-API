import express, { Request, Response} from 'express'
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const prisma = new PrismaClient();  
// now you can use this prisma client to make queries


app.post("/", async(req:Request, res:Response) => {
  const {username, password} = req.body;
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });
  res.json(user);
})

app.post("/create-users", async(req:Request, res:Response) => {
  const { usersList } = req.body;
  const users = await prisma.user.createMany({
    data: usersList,
  });
  res.json(users);
})

app.get("/", async(req:Request, res:Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/user/:id", async(req:Request, res:Response) => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(user);
})

app.put("/",async (req:Request, res:Response) => {
  const {id, username} = req.body;
  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      username: username,
    }
  })
  res.json(updatedUser);
})

app.delete("/:id",async (req:Request, res:Response) => {
  const id = req.params.id;
  const deletedUser = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  })
  res.json(deletedUser);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});