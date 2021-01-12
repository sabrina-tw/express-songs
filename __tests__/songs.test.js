const request = require("supertest");
const app = require("../src/app");
const dbHandlers = require("../test/dbHandler");
const Song = require("../src/models/song.model");

describe("songs", () => {
  beforeAll(async () => await dbHandlers.connect());

  beforeEach(async () => {
    const songsData = [
      {
        name: "song 1",
        artist: "artist 1",
      },
      {
        name: "song 2",
        artist: "artist 2",
      },
    ];
    await Song.create(songsData);
  });
  afterEach(async () => await dbHandlers.clearDatabase());
  afterAll(async () => await dbHandlers.closeDatabase());

  it("GET should respond with all songs", async () => {
    const expectedSongsData = [
      {
        name: "song 1",
        artist: "artist 1",
      },
      {
        name: "song 2",
        artist: "artist 2",
      },
    ];

    const response = await request(app).get("/songs").expect(200);
    expect(response.body).toMatchObject(expectedSongsData);
  });
});
