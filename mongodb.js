var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.1.248:27017/MedicamentosDB', { useNewUrlParser: true });

var medicamentoSchema = new mongoose.Schema({
    cnpj: String,
    Laboratorio: String
}, { collection: 'medicamentos' }
);
 
module.exports = { Mongoose: mongoose, MedicamentoSchema: medicamentoSchema }

//module.exports = { Mongoose: mongoose }