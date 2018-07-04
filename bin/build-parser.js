let fileToTest = process.argv[process.argv.length - 1];

const supportedExtensions = [
  'ts',
  'js'
];

function parseFile (fileName) {
  return fileName
    .replace('test', 'dist/test')
    .replace('src', 'dist/src')
    .replace('.ts', '.js');
}

const isSupported = supportedExtensions.some(ext => fileToTest.endsWith(ext));

if (!isSupported) {
  throw new Error('Unsupported file extension');
}

const exec = process.argv.indexOf('--exec');

if (exec > -1) {
  require(parseFile(process.argv[exec + 1]));
  return;
}

if (!fileToTest.endsWith('.js')) {
  process.argv[process.argv.length - 1] = parseFile(fileToTest)
}