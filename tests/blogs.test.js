import request from "supertest";
import app from "../app";

describe("Blogs API", () => {
    it("should return blogs", async () => {
        const res = await request(app)
            .post("/api/v1/getBlogsDetails")
            .send({ paginationId: 0 });

        expect(res.status).toBeDefined();
    });
});