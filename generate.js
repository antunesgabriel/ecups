require('dotenv/config');
const { hash } = require('bcryptjs');
const inquirer = require('inquirer');

async function key(password) {
  const salt = Number(process.env.CONF_PASS_SALT);
  const key = await hash(password, salt);
  return key;
}

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Digite a key: ',
  },
];

inquirer.prompt(questions).then(answers => {
  key(answers.name).then(key =>
    console.log(`Adcione esta KEY em CONF_KEY no .env: ${key}`),
  );
});
