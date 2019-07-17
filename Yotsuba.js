const { Coordinator, Shell } = require('yotsuba');
const coordinator = new Coordinator();
const shell = new Shell();

const { writeFileSync } = require('fs');
const { execSync } = require('child_process');
const { resolve } = require('path');

coordinator
    .register(() => {
        const rm = shell.execSync('rm', ['-fr', 'dist']);
        if (!rm) return false;
        return true;
    })
    .register(() => {
        const commit = execSync('git rev-parse HEAD').toString().trim();
        writeFileSync(resolve(__dirname, 'lib', 'utility', 'hash.ts'), `export default '${commit}';`);
        return true;
    })
    .register(() => {
        const tsc = shell.execSync('tsc');
        if (!tsc) return false;
        return true;
    })
    .run();