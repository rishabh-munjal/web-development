const fs = require('fs').promises;
const path = require('path');

const directoryPath = 'C:\\Users\\Rishabh\\Desktop\\WEB DEV\\Javascript\\BasicProjects\\ClearTheClutter';

async function listfiles() {
  try {
    const files = await fs.readdir(directoryPath);

    for (let key in files) {
      const file = files[key];
      const ext = path.extname(file);

      if (ext === '.js' || !ext) continue;

      const extDirectoryPath = path.join(directoryPath, ext);

      try {
        await fs.access(extDirectoryPath);
      } catch {
        await fs.mkdir(extDirectoryPath);
      }

      const oldFilePath = path.join(directoryPath, file);
      const newFilePath = path.join(extDirectoryPath, file);

      await fs.rename(oldFilePath, newFilePath);
    }
  } catch (err) {
    console.error('Error processing files:', err);
  }
}

listfiles();
