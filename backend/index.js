"use strict";
exports.__esModule = true;
var fastify_1 = require("fastify");
var mongodb = require("fastify-mongodb");
var swagger = require("fastify-swagger");
var mongodb_1 = require("mongodb");
var app = fastify_1["default"]({
    logger: true,
    ignoreTrailingSlash: true
});
app.register(mongodb["default"], {
    forceClose: true,
    url: 'mongodb+srv://admin:aPs13SlOoKX6pItB@itsdb.ggdmy.mongodb.net/simulazioneEsame'
});
app.register(swagger["default"], {
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
});
app.get("/impianti", function (req, reply) {
    var db = app.mongo.db;
    var collection = db.collection("impianti");
    collection.find({}).toArray(function (err, data) {
        reply.send(data);
    });
    return;
});
app.get("/impianti/:_id", function (req, reply) {
    var id = new mongodb_1.ObjectId(req.params._id);
    var db = app.mongo.db;
    var collection = db.collection('impianti');
    collection.findOne({
        _id: id
    }, function (err, result) {
        return reply.send(result);
    });
});
app.listen(3000);
