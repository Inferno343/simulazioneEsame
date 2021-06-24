import fastify from 'fastify'
import * as mongodb from 'fastify-mongodb'
import * as swagger from 'fastify-swagger'
import { ObjectId } from 'mongodb'

const app = fastify({
    logger: true,
    ignoreTrailingSlash: true
})

app.register(mongodb.default, {
    forceClose: true,
    url: 'mongodb+srv://admin:aPs13SlOoKX6pItB@itsdb.ggdmy.mongodb.net/simulazioneEsame'
})

app.register(swagger.default, {
    routePrefix: '/documentation',
    swagger: {
        info: {
            title: 'Simulazione esame',
            description: "Backend per la simulazione esame",
            version: "1.0.0"
        },
        host: "localhost:3000",
        schemes: ['https'],
        consumes: ['application/json'],
        produces: ['application/json']
    },
    exposeRoute: true
})

app.get("/impianti", (req, reply) => {

    const db = app.mongo.db;
    const collection = db.collection("impianti")

    collection.find({}).toArray(function(err, data) {
        reply.send(data)
    })

    return
})

app.get("/impianti/:_id", (req:any, reply) => {
    let id = new ObjectId(req.params._id)

    const db = app.mongo.db;
    const collection = db.collection('impianti')

    collection.findOne({
        _id: id
    }, function(err, result) {
        return reply.send(result)
    })
})

app.listen(3000)