const request = require("supertest");
const app = require("../src/app");
const dbHandlers = require("../test/dbHandler");
const Song = require("../src/models/song.model");
const mongoose = require("mongoose");
const User = require("../src/models/user.model");
const createJWTToken = require("../src/config/jwt");

describe("songs", () => {
  let token;

  beforeAll(async () => {
    await dbHandlers.connect();

    const user = new User({ username: "username", password: "password" });
    await user.save();
    token = createJWTToken(user.username);
  });

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

  it("GET /:id should respond with correct song given valid id", async () => {
    const song = await Song.findOne({ name: "song 1" });

    const response = await request(app).get(`/songs/${song.id}`).expect(200);
    expect(response.body.name).toEqual("song 1");
  });

  it("PUT /:id should modify correct song successfully if authorised and given valid id", async () => {
    const song = await Song.findOne({ name: "song 1" });
    const response = await request(app)
      .put(`/songs/${song.id}`)
      .send({ name: "song 1 edited" })
      .set("Cookie", `token=${token}`)
      .expect(200);

    expect(response.body.name).toEqual("song 1 edited");
  });

  it("PUT /:id should throw error if unauthorised", async () => {
    const song = await Song.findOne({ name: "song 1" });
    const response = await request(app)
      .put(`/songs/${song.id}`)
      .send({ name: "song 1 edited" });

    expect(response.status).toBe(401);
  });

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

  it("DELETE /:id should delete correct song successfully if authorised and given valid id", async () => {
    const song = await Song.findOne({ name: "song 1" });
    const response = await request(app)
      .delete(`/songs/${song.id}`)
      .set("Cookie", `token=${token}`)
      .expect(200);

    expect(response.body.name).toEqual("song 1");
  });

  it("DELETE /:id should throw error if authorised", async () => {
    const song = await Song.findOne({ name: "song 1" });
    const response = await request(app).delete(`/songs/${song.id}`);

    expect(response.status).toBe(401);
  });
});
