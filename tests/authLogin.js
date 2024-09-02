
import mongoose from 'mongoose';
import app from "../app.js";
import request from "supertest";
import { User } from '../models/user.js';

const { MONGO_URI, PORT = 3000} = process.env;

describe('test register route', () => {
    let server = null;

    beforeAll(async () => {
        await mongoose.connect(MONGO_URI);
        server = app.listen(PORT);
    });

    afterAll(async () => {
        await mongoose.connection.close();
        server.close();
    });

    afterEach(async () => {
        await User.deleteMany({});
    });

    test("test register with correct data", async () => {
        const registerData = {
            "password": "12345",
            "email": "test@exemple.com"
        };
        const res = await request(app).post("/api/users/register").send(registerData);
        console.log(res.body);
        expect(res.statusCode).toBe(201);
        expect(res.body.user.subscription).toBe('starter');
        expect(res.body.user.email).toBe(registerData.email);

        const user = await User.findOne({ email: registerData.email });
        expect(user.subscription).toBe('starter')
    });   
});