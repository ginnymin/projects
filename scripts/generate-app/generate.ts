import fs from 'fs';
import path from 'path';

import prompts, { PromptType } from 'prompts';

const init = async () => {
  const questions = [
    {
      type: 'text' as PromptType,
      name: 'appName',
      message: 'What would you like to call your app? (kebab-case)',
    },
  ];

  const { appName } = await prompts(questions);

  const appDir = path.resolve(__dirname, `../../apps/${appName}`);

  // Create the component directory if it doesn't exist
  if (!fs.existsSync(appDir)) {
    fs.mkdirSync(appDir, { recursive: true });
  }

  const templateDir = path.resolve(__dirname, './template');
  const templates = fs.readdirSync(templateDir, {
    recursive: true,
    withFileTypes: true,
  });

  templates.forEach((file) => {
    const fullPath = `${file.parentPath}/${file.name}`;
    const relativePath = fullPath.replace(templateDir, '');
    const newPath = appDir + relativePath;

    if (file.isDirectory()) {
      if (!fs.existsSync(newPath)) {
        fs.mkdirSync(newPath, { recursive: true });
      }
    } else {
      fs.writeFileSync(
        newPath,
        fs
          .readFileSync(
            path.resolve(templateDir, relativePath.replace('/', ''))
          )
          .toString()
      );
    }
  });
};

void init();
