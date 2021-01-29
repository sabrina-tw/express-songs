const request = require("supertest");
const app = require("../src/app");
const dbHandlers = require("../test/dbHandler");
const Song = require("../src/models/song.model");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

describe("songs", () => {
  beforeAll(async () => await dbHandlers.connect());

  beforeEach(async () => {
    const songsData = [
      {
        _id: new ObjectId(),
        name: "song 1",
        artist: "artist 1",
      },
      {
        _id: new ObjectId(),
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

  xit("GET /:id should respond with correct song given valid id", async () => {});

  xit("PUT /:id should modify correct song successfully given valid id", async () => {});

  it("POST should create new song if model is valid", async () => {
    const newSong = {
      name: "test song",
      artist: "test artist",
    };

    const response = await request(app)
      .post("/songs")
      .send(newSong)
      .expect(201);

    expect(response.body).toMatchObject(newSong);
  });

  it("POST should throw error if model has invalid fields", async () => {
    const newSong = {
      name: "test song",
      artist: "",
    };

    const response = await request(app).post("/songs").send(newSong);

    expect(response.status).toEqual(500);
  });

  xit("DELETE /:id should delete correct song successfully given valid id", async () => {});
});
