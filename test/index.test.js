const { signup } = require("../app/controllers/auth.controller");
const sinon = require("sinon");

const flushPromises = () => new Promise(setImmediate);

describe("Authorization Controller Testing", () => {
    describe("Save a user to the postgresql database", () => {
        afterEach(() => {
            sinon.restore();
        });
        it("should successfully add a user to the database", async () => {
            // const user = {
            //     firstname: "John",
            //     lastname: "Doe",
            //     username: "johndoe",
            //     email: "johndoe@gmail.com",
            //     homeaddress: "1234 Main Street",
            //     phone: "1234567890",
            //     password: "password"
            // }
            // expect(res.statusCode).toEqual(200);
            // expect(res.body).toHaveProperty("message", "User registered successfully!");
        });
        it("should return a json message if a field is empty", async () => {

        });
        it("it should return User registered successfully when using the signup function from auth controller", async () => {
        });
    })
})