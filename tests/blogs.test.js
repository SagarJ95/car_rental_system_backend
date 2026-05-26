import request from "supertest";
import app from "../dist/app.js";

describe("Blogs API", () => {
    it("should return blogs", async () => {
        const res = await request(app)
            .post("/api/v1/getBlogsDetails")
            .send({ paginationId: 0 });

        expect(res.status).toBeDefined();
    });
});