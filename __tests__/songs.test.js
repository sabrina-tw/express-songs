const request = require("supertest");
const app = require("../app");

describe("songs", () => {
  describe("POST /songs", () => {
    it("should add a new song and return the new song object", async () => {
      const newSong = { name: "Pink Moon", artist: "Nick Drake" };
      const expectedSong = { id: 3, name: "Pink Moon", artist: "Nick Drake" };

      const response = await request(app)
        .post("/songs")
        .send(newSong)
        .expect(201);

      expect(response.status).toEqual(201);
      expect(response.body).toEqual(expectedSong);
    });

    it("should throw error if fields are invalid", async () => {
      const newSong = { name: "", artist: "Nick Drake" };

      const response = await request(app).post("/songs").send(newSong);

      expect(response.status).toEqual(400);
    });
  });

  describe("GET /song/:id", () => {
    it("should get correct song given id", async () => {
      const expectedSong = { name: "Pink Moon", artist: "Nick Drake" };

      const { body: actualSong } = await request(app)
        .get("/songs/3")
        .expect(200);

      expect(actualSong).toMatchObject(expectedSong);
    });
  });

  const agent = request.agent(app);

  describe("PUT /song/:id", () => {
    it("should modify correct song successfully given id", async () => {
      const modifiedSong = { name: "Pink Moon edited", artist: "Nick Drake" };

      const response = await agent
        .put("/songs/3")
        .send(modifiedSong)
        .expect(200);

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(modifiedSong);
    });

    it("should throw error if fields are invalid", async () => {
      const modifiedSong = { name: "", artist: "Nick Drake" };

      const response = await request(app).post("/songs").send(modifiedSong);

      expect(response.status).toEqual(400);
    });
  });

  describe("DELETE /song/:id", () => {
    it("should delete correct song successfully given id", async () => {
      const songToDelete = { name: "Pink Moon edited", artist: "Nick Drake" };

      const response = await agent.delete("/songs/3").expect(200);

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(songToDelete);
    });
  });
});
