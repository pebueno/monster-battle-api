import express, { Request, Response } from 'express';
import cors from 'cors';
import monsterData from './monsters.json';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

interface Monster {
  id: string;
  name: string;
  attack: number;
  defense: number;
  hp: number;
  speed: number;
  type: string;
  imageUrl: string;
}

const monsters: Monster[] = monsterData as Monster[];

// Endpoint to get all monsters
app.get('/monsters', (req: Request, res: Response) => {
  res.json(monsters);
});

// Endpoint to start battle (mocked)
// Endpoint to start battle (mocked)
app.post('/battle', (req: Request, res: Response) => {
  // Mock battle logic
  const { monster1Id, monster2Id } = req.body;
  const monster1 = monsters.find(monster => monster.id === monster1Id);
  const monster2 = monsters.find(monster => monster.id === monster2Id);
  
  // Check if both monsters exist
  if (!monster1 || !monster2) {
    return res.status(400).json({ error: 'Invalid monster IDs' });
  }

  // Determine the winner
  let winner;
  if (Math.random() < 0.5) {
    winner = monster1;
  } else {
    winner = monster2;
  }

  // Check for tie
  const tie = monster1.id === monster2.id;

  // Construct the battle result object
  const battleResult = { winner, tie };

  // Send the battle result
  res.json(battleResult);
});

// Run server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
