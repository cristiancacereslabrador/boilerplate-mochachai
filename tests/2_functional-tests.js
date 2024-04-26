const chai = require("chai");
const assert = chai.assert;

const server = require("../server");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

// Suite de pruebas de integración con chai-http
suite("Functional Tests", function () {
  this.timeout(5000);

  suite("Integration tests with chai-http", function () {
    // Prueba #1
    test("Test GET /hello with no name", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/hello")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello Guest");
          done();
        });
    });

    // Prueba #2
    test("Test GET /hello with your name", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/hello?name=CristianVianey")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello CristianVianey");
          done();
        });
    });

    // Prueba #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .keepOpen()
        .put("/travellers")
        .send({ surname: "Colombo" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(res.body.name, "Cristoforo");
          assert.equal(res.body.surname, "Colombo");
          done();
        });
    });

    // Prueba #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .keepOpen()
        .put("/travellers")
        .send({ surname: "da Verrazzano" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(res.body.name, "Giovanni");
          assert.equal(res.body.surname, "da Verrazzano");
          done();
        });
    });
  });
});

const Browser = require("zombie");
// Configuración del sitio para Zombie.js
Browser.site = "http://127.0.0.1:3000";
// Browser.site =
//   "https://redesigned-space-invention-xg6xgq7xgqfvr-3000.app.github.dev/";
// Suite de pruebas funcionales con Zombie.js
suite("Functional Tests with Zombie.js", function () {
  const browser = new Browser();

  // Configuración de la visita a la página antes de las pruebas
  suiteSetup(function (done) {
    return browser.visit("/", done);
  });

  // Prueba #5
  test('submit "surname" : "Colombo" - write your e2e test...', function (done) {
    // Llenar el formulario y enviarlo
    browser.fill("surname", "Colombo").pressButton("submit", function () {
      // Asegurar que la prueba es exitosa
      browser.assert.success();
      browser.assert.text("span#name", "Cristoforo");
      browser.assert.text("span#surname", "Colombo");
      browser.assert.element("span#dates", 1);
      done(); // Es una prueba asíncrona, así que llamamos a 'done()'
    });
  });

  // Prueba #6 (actualmente falla porque tiene assert.fail())
  test('submit "surname" : "Vespucci" - write your e2e test...', function (done) {
    // Comentar o eliminar la línea assert.fail() para habilitar la prueba
    // assert.fail();
    browser.fill("surname", "Vespucci").pressButton("submit", function () {
      // Asegurar que la prueba es exitosa
      browser.assert.success();
      browser.assert.text("span#name", "Amerigo");
      browser.assert.text("span#surname", "Vespucci");
      browser.assert.element("span#dates", 1);
      done();
    });
  });
});
