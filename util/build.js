const fs = require('fs-extra');
const childProcess = require('child_process');


try {
    // Remove current build
    fs.removeSync('./dist/');
    // Copy front-end files
    fs.copySync('./src/public', './dist/public');
    fs.copySync('./src/views', './dist/views');
    //Copy data.json
    fs.copySync('./src/data', './dist/data')
    // Transpile the typescript files
    childProcess.exec('tsc --build tsconfig.prod.json');
} catch (err) {
    console.log(err);
}
