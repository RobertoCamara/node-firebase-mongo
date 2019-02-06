var express = require('express'); //import express 
var firebase = require('./firebaseConfig');
var mongo = require("./mongodb");
var sleep = require('system-sleep');

var app = express();

app.delete('/medicamentos/removeAll', (req, res) => {
  firebase.ref('medicamentos').set(null)
  res.send(res.statusCode + ' -> Todos medicamentos foram removidos')
})

//to handle HTTP get request
app.get('/', function (req, res) {
  console.log("Get Request");
  //  const _id = firebase.ref().child('medicamentos').push().key;
});

app.put('/', function (req, res) {
    console.log("HTTP Put Request");
    res.send("HTTP PUT Request");
  });
  
app.get('/medicamentos/carga', function (req, res) {
    console.log("HTTP POST Request");

    var medicamentos_mongo = mongo.Mongoose.model('medicamentos', mongo.MedicamentoSchema);
    
    //const medicamentos_empresa = []

    medicamentos_mongo.find({PrincipioAtivo:'ACARBOSE'})
    .lean()
    .then((records) => {
      records.forEach(function(record) {
        const id = mongo.Mongoose.Types.ObjectId(record._id).toHexString()
         const medicamentos = {}
           medicamentos['medicamentos/'+ record.cnpj + '/' + id] = {
             id: id,
             cnpj: record.cnpj,
             laboratorio: record.Laboratorio
           }
          //medicamentos_empresa.push(medicamentos)
           firebase.ref().update(medicamentos, (error)=> {
               if (error) {
                  console.error.bind(console, `Data could not be updated. ${error}`);
               } 
               else {
                  console.log("Data updated successfully.");
           }})
           
          console.log(medicamentos)
          sleep(1000)

         })
     })
     .then(res => {
       console.log('Processo finalizado.')
      //  medicamentos_empresa.forEach((item) => {
      //    console.log(item)
      //  })
     })
     .catch(error => {
          console.error.bind(console, `Error ${error}`)
     });

    res.send("HTTP POST Request");  
    
});
  
app.delete('/', function (req, res) {
    console.log("HTTP DELETE Request");
    res.send("HTTP DELETE Request");
});


var server = app.listen(8090, function () {

  var host = server.address().address;
  var port = server.address().port;
  var h = host === "::" ? "localhost" : host

  console.log(`server listening at http://${h}:${port}`);
});