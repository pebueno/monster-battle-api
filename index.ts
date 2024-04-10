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
app.post('/battle', (req: Request, res: Response) => {
  const { monster1Id, monster2Id } = req.body;
  const playerMonster = monsters.find(monster => monster.id === monster1Id);
  const computerMonster = monsters.find(monster => monster.id === monster2Id);

  // Check if player's monster exists
  if (!playerMonster) {
    return res.status(400).json({ error: 'Invalid player monster ID' });
  }

  // Check if computer's monster exists
  if (!computerMonster) {
    return res.status(400).json({ error: 'Invalid computer monster ID' });
  }

  // Calculate the battle outcome based on monster stats
  const playerTotalStats = playerMonster.attack + playerMonster.defense + playerMonster.hp + playerMonster.speed;
  const computerTotalStats = computerMonster.attack + computerMonster.defense + computerMonster.hp + computerMonster.speed;

  let winner;
  let tie = false;

  if (playerTotalStats > computerTotalStats) {
    winner = playerMonster;
  } else if (playerTotalStats < computerTotalStats) {
    winner = computerMonster;
  } else {
    tie = true;
  }

  // Construct the battle result object
  const battleResult = { winner, tie };

  // Send the battle result
  res.json(battleResult);
});

// Run server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
