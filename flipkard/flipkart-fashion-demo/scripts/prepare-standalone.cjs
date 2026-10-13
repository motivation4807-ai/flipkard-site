const fs = require('node:fs/promises');
const path = require('node:path');

const root = process.cwd();
const standalone = path.join(root, '.next', 'standalone');

async function copyIfPresent(source, destination) {
  try {
    await fs.access(source);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.cp(source, destination, { recursive: true, force: true });
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

Promise.all([
  copyIfPresent(path.join(root, 'public'), path.join(standalone, 'public')),
  copyIfPresent(path.join(root, '.next', 'static'), path.join(standalone, '.next', 'static')),
]).then(() => {
  console.log('Prepared standalone server with public and Next static assets.');
}).catch((error) => {
  console.error('Failed to prepare standalone output:', error);
  process.exitCode = 1;
});
