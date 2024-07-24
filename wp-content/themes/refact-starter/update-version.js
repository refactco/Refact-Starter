const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Specify the root directory where your block folders are located
const rootDirectory = 'acf-blocks';
// Specify the root directory where your SCSS files are located
const scssRootDirectory = 'src/styles';

// Specify the file path for functions.php
const functionsPhpPath = 'functions.php';
// Specify the file path for the memory file
const memoryFilePath = 'lastModifiedMemory.json';

// Function to update the version in a block.json file if index.scss is modified
function updateVersionInBlockJsonIfModified(blockPath) {
  const blockJsonPath = path.join(blockPath, 'block.json');
  const indexScssPath = path.join(blockPath, 'index.scss');
  const indexAssetPhpPath = path.join(blockPath, 'index.asset.php');
  const lastModifiedFilePath = path.join(blockPath, 'lastModified.txt');

  try {
    // Get the modification time of the index.scss file
    const indexScssStats = fs.statSync(indexScssPath);
    const indexScssLastModified = indexScssStats.mtime;

    // Read the stored modification time from the lastModified.txt file
    const storedLastModified = readLastModifiedFromFile(lastModifiedFilePath);

    // Log for debugging
    console.log('Block:', blockPath);
    console.log('Current:', indexScssLastModified);
    console.log('Stored:', storedLastModified);

    // Compare modification times
    if (!storedLastModified || indexScssLastModified > new Date(storedLastModified)) {
      // index.scss is modified or it's the first run, update the version

      // Update block.json
      updateBlockJsonVersion(blockJsonPath);

      // Update index.asset.php
      updateIndexAssetPhpVersion(indexAssetPhpPath);

      // Store the new modification time in lastModified.txt
      updateLastModifiedFile(lastModifiedFilePath, indexScssLastModified);

      console.log('Versions updated successfully for', blockPath);
    } else {
      console.log('No modification to index.scss in', blockPath);
    }
  } catch (error) {
    console.error('Error updating versions for', blockPath, error.message);
  }
}

// Function to update the version in a block.json file
function updateBlockJsonVersion(blockJsonPath) {
  try {
    const blockJsonContent = fs.readFileSync(blockJsonPath, 'utf-8');
    const blockJson = JSON.parse(blockJsonContent);

    // Get the previous version from block.json
    const previousVersion = blockJson.version || '1.0.0';

    // Update the version based on the previous version
    const newVersion = calculateNewVersion(previousVersion);

    // Update the version in the block.json object
    blockJson.version = newVersion;

    // Write the updated content back to block.json
    fs.writeFileSync(blockJsonPath, JSON.stringify(blockJson, null, 2), 'utf-8');

    console.log('Version updated successfully for', blockJsonPath);
  } catch (error) {
    console.error('Error updating version for', blockJsonPath, error.message);
  }
}

// Function to update the version in an index.asset.php file
function updateIndexAssetPhpVersion(indexAssetPhpPath) {
  try {
    // Read the content of the index.asset.php file
    let indexAssetPhpContent = fs.readFileSync(indexAssetPhpPath, 'utf-8');

    // Use regular expressions to find and update the version
    const versionRegex = /'version'\s*=>\s*'([^']*)'/;
    indexAssetPhpContent = indexAssetPhpContent.replace(versionRegex, (match, previousVersion) => {
      // Update the version based on the previous version
      const newVersion = calculateNewVersion(previousVersion);
      return `'version' => '${newVersion}'`;
    });

    // Write the updated content back to index.asset.php
    fs.writeFileSync(indexAssetPhpPath, indexAssetPhpContent, 'utf-8');

    console.log('Version updated successfully for', indexAssetPhpPath);
  } catch (error) {
    console.error('Error updating version for', indexAssetPhpPath, error.message);
  }
}

// Function to read the stored modification time from a file
function readLastModifiedFromFile(lastModifiedFilePath) {
  try {
    // Read the stored modification time from the specified file
    return fs.readFileSync(lastModifiedFilePath, 'utf-8').trim();
  } catch (error) {
    // Handle the case where the file or modification time is not available
    return null;
  }
}

// Function to update the stored modification time in a file
function updateLastModifiedFile(lastModifiedFilePath, newLastModified) {
  try {
    // Update the stored modification time in the specified file
    fs.writeFileSync(lastModifiedFilePath, newLastModified.toISOString(), 'utf-8');
  } catch (error) {
    // Handle the case where the file cannot be updated
    console.error('Error updating modification time:', error.message);
  }
}

// Function to calculate the new version in the format 1.x.x
function calculateNewVersion(previousVersion) {
  // Parse the previous version into an array of integers
  const versionParts = previousVersion.split('.').map(part => parseInt(part, 10));

  // Increment the last digit of the version
  versionParts[2] += 1;

  // Join the version parts back into a string
  const newVersion = versionParts.join('.');

  return newVersion;
}

// Function to read the stored modification time from memory
function readLastModifiedFromMemory(memoryKey) {
  try {
    // Read the stored modification time from the memory file
    const memoryData = fs.readFileSync(memoryFilePath, 'utf-8');
    const memoryObject = JSON.parse(memoryData);
    return memoryObject[memoryKey] || null;
  } catch (error) {
    // Handle the case where the memory file or data is not available
    return null;
  }
}

// Function to update the stored modification time in memory
function updateLastModifiedInMemory(memoryKey, newLastModified) {
  try {
    // Read the current memory data or create an empty object
    const memoryData = fs.existsSync(memoryFilePath)
      ? fs.readFileSync(memoryFilePath, 'utf-8')
      : '{}';

    const memoryObject = JSON.parse(memoryData);

    // Update the stored modification time in the memory object
    memoryObject[memoryKey] = newLastModified;

    // Write the updated memory object back to the memory file
    fs.writeFileSync(memoryFilePath, JSON.stringify(memoryObject, null, 2), 'utf-8');
  } catch (error) {
    // Handle the case where the memory file cannot be updated
    console.error('Error updating modification time in memory:', error.message);
  }
}

// Get a list of directories in the root directory
const blockDirectories = fs.readdirSync(rootDirectory, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// Update versions in block.json and index.asset.php for each block if index.scss is modified
blockDirectories.forEach(blockDir => {
  const blockPath = path.join(rootDirectory, blockDir);
  updateVersionInBlockJsonIfModified(blockPath);
});


// Function to update the version in functions.php if SCSS files are modified
function updateThemeVersionInFunctionsPhpIfModified() {
  try {
    // Get a list of SCSS files in the specified directory and its subdirectories
    const scssFiles = glob.sync(`${scssRootDirectory}/**/*.scss`);

    // Get the modification time of each SCSS file
    const lastModifiedTimes = scssFiles.map(scssFile => {
      const stats = fs.statSync(scssFile);
      return stats.mtime;
    });

    // Get the stored modification time from the previous run
    const storedLastModified = readLastModifiedFromMemory('themeVersion');

    // Compare modification times
    if (!storedLastModified || Math.max(...lastModifiedTimes) > storedLastModified) {
      // SCSS files are modified or it's the first run, update the theme version
      const functionsPhpContent = fs.readFileSync(functionsPhpPath, 'utf-8');

      // Use regular expressions to find and update the THEME_VERSION
      const versionRegex = /define\( 'THEME_VERSION', '([^']*)' \);/;
      const updatedFunctionsPhpContent = functionsPhpContent.replace(versionRegex, (match, previousVersion) => {
        // Update the version based on the previous version
        const newVersion = calculateNewVersion(previousVersion);
        return `define( 'THEME_VERSION', '${newVersion}' );`;
      });

      // Write the updated content back to functions.php
      fs.writeFileSync(functionsPhpPath, updatedFunctionsPhpContent, 'utf-8');

      // Store the new modification time in memory
      updateLastModifiedInMemory('themeVersion', Math.max(...lastModifiedTimes));

      console.log('Version updated successfully for', functionsPhpPath);
    }
  } catch (error) {
    console.error('Error updating version for', functionsPhpPath, error.message);
  }
}

// Run the function to update the theme version in functions.php if SCSS files are modified
updateThemeVersionInFunctionsPhpIfModified();

console.log('All versions checked successfully!');
