let express = require('express');
let cors = require('cors');
let sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

let app = express();
let port = 3000;
app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: 'database.sqlite',
    driver: sqlite3.Database,
  });
})();

async function fetchAllGames() {
  let query = 'SELECT * FROM games';
  let resoponse = await db.all(query, []);
  return resoponse;
}

async function fetchByGameId(gameID) {
  let query = 'SELECT * FROM games WHERE id=?';
  let resoponse = await db.all(query, [gameID]);
  return resoponse;
}

async function fetchByGenre(genre) {
  let query = 'SELECT * FROM games WHERE genre=?';
  let response = await db.all(query, [genre]);
  return response;
}

async function fetchByPlatform(platform) {
  let query = 'SELECT * FROM games WHERE platform=?';
  let response = await db.all(query, [platform]);
  return response;
}

async function sortByRating() {
  let query = 'SELECT * FROM games ORDER BY rating DESC';
  let response = await db.all(query, []);
  return response;
}
async function sortPlayersByRating() {
  let query = 'SELECT * FROM players ORDER BY rating DESC';
  let response = await db.all(query, []);
  return response;
}

async function fetchAllTournaments() {
  let query = 'SELECT * FROM tournaments';
  let response = await db.all(query, []);
  return response;
}

async function fetchTournamentById(id) {
  let query = 'SELECT * FROM tournaments WHERE id=?';
  let response = await db.all(query, [id]);
  return response;
}

async function fetchTournamentByGameId(gameId) {
  let query = 'SELECT * FROM tournaments WHERE gameId=?';
  let response = await db.all(query, [gameId]);
  return response;
}

async function fetchTournamentByPool() {
  let query = 'SELECT * FROM tournaments ORDER BY prizePool DESC';
  let response = await db.all(query, []);
  return response;
}

async function fetchAllPlayers() {
  let query = 'SELECT * FROM players';
  let response = await db.all(query, []);
  return response;
}

async function fetchPlayersByPlatform(platform) {
  let query = 'SELECT * FROM players WHERE platform=?';
  let response = await db.all(query, [platform]);
  return response;
}

async function fetchPlayersById(id) {
  let query = 'SELECT * FROM players WHERE id=?';
  let response = await db.all(query, [id]);
  return response;
}

app.get('/games', async (req, res) => {
  let result = await fetchAllGames();
  res.status(200).json({ games: result });
});

app.get('/games/details/:gameId', async (req, res) => {
  let gameId = parseInt(req.params.gameId);
  let result = await fetchByGameId(gameId);
  res.status(200).json({ games: result });
});

app.get('/games/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  let result = await fetchByGenre(genre);
  res.status(200).json({ games: result });
});

app.get('/players', async (req, res) => {
  let result = await fetchAllPlayers();
  res.status(200).json({ players: result });
});

app.get('/games/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  let result = await fetchByPlatform(platform);
  res.status(200).json({ games: result });
});

app.get('/players/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  let result = await fetchPlayersByPlatform(platform);
  res.status(200).json({ players: result });
});

app.get('/games/sort-by-rating', async (req, res) => {
  let result = await sortByRating();
  res.status(200).json({ games: result });
});

app.get('/players/sort-by-rating', async (req, res) => {
  let result = await sortPlayersByRating();
  res.status(200).json({ players: result });
});

app.get('/tournaments', async (req, res) => {
  let result = await fetchAllTournaments();
  res.status(200).json({ tournaments: result });
});

app.get('/tournaments/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  let result = await fetchTournamentById(id);
  res.status(200).json({ tournaments: result });
});

app.get('/players/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  let result = await fetchPlayersById(id);
  res.status(200).json({ tournaments: result });
});

app.get('/tournaments/game/:id', async (req, res) => {
  let gameId = parseInt(req.params.id);
  let result = await fetchTournamentByGameId(gameId);
  res.status(200).json({ tournaments: result });
});

app.get('/tournaments/sort-by-prize-pool', async (req, res) => {
  let result = await fetchTournamentByPool();
  res.status(200).json({ tournaments: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
