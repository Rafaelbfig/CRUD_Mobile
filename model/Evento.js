const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Evento = new Schema(
  {
    participante: {
      type: String,
    },
    local: {
      type: String,
    },
    cronograma: {
      type: String,
    },
  },
  {
    collection: "Evento",
  }
);

module.exports = mongoose.model("Evento", Evento);
