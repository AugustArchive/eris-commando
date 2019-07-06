const { Coordinator, Shell } = require('yotsuba');
const coordinator = new Coordinator();
const shell = new Shell();

coordinator
    .register({
        name: 'build',
        run: () => {
            const tsc = shell.execSync('tsc');
            if (!tsc) return false;
            return true;
        }
    })
    .run();