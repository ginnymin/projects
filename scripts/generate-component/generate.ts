import fs from 'fs';
import path from 'path';

import prompts, { PromptType } from 'prompts';

import packageJson from '../../package.json';

const init = async () => {
  const questions = [
    {
      type: 'select' as PromptType,
      name: 'appName',
      message: 'Which app/package is this for?',
      choices: packageJson.workspaces.map((i) => ({ title: i, value: i })),
    },
    {
      type: 'text' as PromptType,
      name: 'componentName',
      message: 'What would you like to call your component? (PascalCase)',
    },
  ];

  const { appName, componentName } = await prompts(questions);

  const componentDir = path.resolve(
    __dirname,
    `../../${appName}/src/components/${componentName}`
  );

  // Create the component directory if it doesn't exist
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }

  const templateDir = path.resolve(__dirname, './template');
  const templates = fs.readdirSync(templateDir);

  templates.forEach((file) => {
    fs.writeFileSync(
      `${componentDir}/${file.replaceAll('ComponentName', `${componentName}`)}`,
      fs
        .readFileSync(path.resolve(templateDir, file))
        .toString()
        .replaceAll('ComponentName', `${componentName}`)
    );
  });
};

void init();
