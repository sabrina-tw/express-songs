const request = require("supertest");
const app = require("../app");

describe("movies", () => {
  const agent = request.agent(app);

  it("POST /movies should return a new movie object", async () => {
    const newMovie = { movieName: "Lion King" };
    const expectedMovie = { id: 1, movieName: "Lion King" };

    const response = await agent.post("/movies").send(newMovie).expect(201);

    expect(response.status).toEqual(201);
    expect(response.body).toEqual(expectedMovie);
  });

  it("GET /movies should return an array containing one movie", async () => {
    const expectedMovie = { id: 1, movieName: "Lion King" };

    const response = await agent.get("/movies").expect(200);

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(1);
    expect(response.body).toEqual([expectedMovie]);
  });

  it("GET /movies/:id should return the movie with id", async () => {
    const expectedMovie = { id: 1, movieName: "Lion King" };

    const response = await agent.get("/movies/1").expect(200);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expectedMovie);
  });

  it("PUT /movies/:id should return the updated movie", async () => {
    const editedMovie = { id: 1, movieName: "Lion Kong" };

    const response = await agent.put("/movies/1").send(editedMovie).expect(200);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(editedMovie);
  });

  it("DELETE /movies/:id should return the deleted movie", async () => {
    const movieToDelete = { id: 1, movieName: "Lion Kong" };

    const response = await agent.delete("/movies/1").expect(200);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(movieToDelete);
  });

  it("GET /movies should return an empty array", async () => {
    const response = await agent.get("/movies").expect(200);

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(0);
    expect(response.body).toEqual([]);
  });
});
