const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    // ruta get
    it("Obteniendo statusCode y recibiendo array", async () => {
        const { statusCode, body } = await request(server).get("/cafes").send()
        expect(statusCode).toBe(200)
        expect(Array.isArray(body)).toBe(true)
        expect(body.length).toBeGreaterThanOrEqual(1)
    })

    // ruta delete
    it("Obteniendo codigo 404 al eliminaar un cafe que no existe", async () => {
        const token = "adjsadflkasdjfjasdñfkadf"
        const id = "11111111111111111111111111111111111"
        const { statusCode } = await request(server).delete(`/cafes/${id}`).set("Authorization", token).send()
        expect(statusCode).toBe(404)
    })

    // ruta post
    it("Agregando un nuevo cafe y devolviendo codigo 201", async () => {
        const nuevoCafe = {
            id: 1010010, // id que no exisita, de lo contrario envía el codigo 400
            nombre: "nuevo cafe"
        }
        const { statusCode, body } = await request(server).post("/cafes").send(nuevoCafe)
        expect(statusCode).toBe(201)
        expect(body).toContainEqual(nuevoCafe)
    })

    // ruta put
    it("Probando que devuelva statusCode 400 si envio un id diferente por parametro y por body", async () => {
        const cafeEditado1 = {
            id: 1,
            nombre: "cafe editado 1"
        }
        const id = 10
        const { statusCode } = await request(server).put(`/cafes/${id}`).send(cafeEditado1)
        expect(statusCode).toBe(400)
    })

    // probando test adicionales, no son requerimiento del desafio
    it("Probando que devuelva statusCode 404 si envio un id que no esta en la lista", async () => {
        const cafeEditado2 = {
            id: 5,
            nombre: "cafe editado 2"
        }
        const id = 5
        const { statusCode } = await request(server).put(`/cafes/${id}`).send(cafeEditado2)
        expect(statusCode).toBe(404)
    })

    it("Probando que se edite y devuelva el objeto dentro del body", async () => {
        const cafeEditado3 = {
            id: 4,
            nombre: "cafe editado 3"
        }
        const id = 4
        const { body } = await request(server).put(`/cafes/${id}`).send(cafeEditado3)
        expect(body).toContainEqual(cafeEditado3)
    })
});

