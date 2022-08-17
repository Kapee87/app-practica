const fs = require('fs')

const listaCompleta = async (req, res) => {
    try {
        const dispoData = await fs.promises.readFile('./db/disponibles.json', 'utf-8');
        let dispoJson = JSON.parse(dispoData);
        res.status(200).json(dispoJson);

    }
    catch {
        res.status(400).send('No se pudo hallar el listado de instrumentos');
    }
}

const listaDisponibles = async (req, res) => {
    try {
        const dispoData = await fs.promises.readFile('./db/disponibles.json', 'utf-8');
        
        let dispoJson = JSON.parse(dispoData);
        dispoJson = dispoJson.filter((instrumento) => instrumento.instrument.disponible === true);
        res.status(200).json(dispoJson);

    }
    catch {
        res.status(400).send('No se pudo hallar el listado de instrumentos');
    }
}

const agregarInstrumento = async (req, res) => {
    try {
        const data = await fs.promises.readFile('./db/disponibles.json', 'utf-8');
        let dataJson = JSON.parse(data);
        let instru = {
            id: dataJson.length + 1,
            instrumento: req.body.instrumento,
            marcaModelo: req.body.marcaModelo,
            disponible: true,
        }
        dataJson.push({ instrument: instru });
        let instruJson = JSON.stringify(dataJson, null, 2);
        await fs.promises.writeFile(`./db/disponibles.json`, instruJson);
        res.status(200).send("Instrumento agregado");
    } catch (error) {
        res.status(400).send("no se puedo guardar el instrumento")
    }
}

const editarInstrumento = async (req, res) => {
    try {
        const data = await fs.promises.readFile('./db/disponibles.json', 'utf-8');
        let dataJson = JSON.parse(data);
        const id = req.params.id;
        const posicion = id - 1
        const instrumentoActualizado = {
            id: id,
            instrumento: req.body.instrumento,
            marcaModelo: req.body.marcaModelo,
            disponible: req.body.disponible 
        };

        dataJson[posicion] = { instrument: instrumentoActualizado }

        let instruJson = JSON.stringify(dataJson, null, 2)

        await fs.promises.writeFile(`./db/disponibles.json`, instruJson);
        res.status(200).send("El instrumento se editó correctamente ");
        // res.status(200).send("Instrumento editado");
    } catch {
        res.status(400).send('no se pudo editar el instrumento');
    }
}

const borrarInstrumento = async (req, res) => {
    try {

        const data = await fs.promises.readFile('./db/disponibles.json', 'utf-8');
        let dataJson = JSON.parse(data);
        await fs.promises.unlink('./db/disponibles.json')
        let dataClear = dataJson.filter((instrumento) => instrumento.instrument.id != req.params.id);
        let instrumentJson = JSON.stringify(dataClear, null, 2)
        await fs.promises.writeFile(`./db/disponibles.json`, instrumentJson);
        res.status(200).send("instrumento borrado")
        
    } catch {
        res.status(400).send('no se pudo borrar el instrumento');
    }
}

const borrarTodo = async (req, res) => {
    try {
        //busca el archivo para leerlo - recordemos que lo ira a buscar a la direccion que le pasamos 
        const data = await fs.promises.readFile('./db/disponibles.json', 'utf-8');
        //parseo de informacion a un formato mas manejable por el lenguaje
        let dataJson = JSON.parse(data);
        //reescribimos la informacon del array lleno diciendole que ahora es un array basio
        dataJson = []
        //lo volvemos a pasar a formato json
        let productJson = JSON.stringify(dataJson, null, 2)
        //guardamos el nuevo archivo en formato basio
        await fs.promises.writeFile(`./db/disponibles.json`, productJson);
        //devolvemos un resultado
        res.status(200).send("Los instrumentos fueron borrados")
    } catch {
        res.status(400).send('no se pudieron borrar todos los instrumentos');
    }
}


module.exports = { listaCompleta,listaDisponibles, agregarInstrumento, editarInstrumento, borrarTodo, borrarInstrumento };