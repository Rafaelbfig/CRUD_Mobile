const express = require("express");
const app = express();
const EventoRoutes = express.Router();

let Evento = require("../model/Evento");

// api to add Evento
EventoRoutes.route("/add").post(function (req, res) {
  let Evento = new Evento(req.body);
  Evento.save()
    .then((Evento) => {
      res
        .status(200)
        .json({ status: "success", mssg: "Evento added successfully" });
    })
    .catch((err) => {
      res
        .status(409)
        .send({ status: "failure", mssg: "unable to save to database" });
    });
});

// api to get Evento
EventoRoutes.route("/").get(function (req, res) {
  Evento.find(function (err, Evento) {
    if (err) {
      res.status(400).send({ status: "failure", mssg: "Something went wrong" });
    } else {
      res.status(200).json({ status: "success", Evento: Evento });
    }
  });
});

// api to get Evento
EventoRoutes.route("/Evento/:id").get(function (req, res) {
  let id = req.params.id;
  Evento.findById(id, function (err, Evento) {
    if (err) {
      res.status(400).send({ status: "failure", mssg: "Something went wrong" });
    } else {
      res.status(200).json({ status: "success", Evento: Evento });
    }
  });
});

// api to update route
EventoRoutes.route("/update/:id").put(function (req, res) {
  Evento.findById(req.params.id, function (err, Evento) {
    if (!Evento) {
      res.status(400).send({ status: "failure", mssg: "Unable to find data" });
    } else {
      Evento.participante = req.body.participante;
      Evento.local = req.body.local;
      Evento.cronograma = req.body.cronograma;

      Evento.save().then((Evento) => {
        res.status(200).json({ status: "success", mssg: "Update complete" });
      });
    }
  });
});

// api for delete
EventoRoutes.route("/delete/:id").delete(function (req, res) {
  Evento.findByIdAndRemove({ _id: req.params.id }, function (err) {
    if (err) {
      res.status(400).send({ status: "failure", mssg: "Something went wrong" });
    } else {
      res.status(200).json({ status: "success", mssg: "Delete successfully" });
    }
  });
});

module.exports = EventoRoutes;
