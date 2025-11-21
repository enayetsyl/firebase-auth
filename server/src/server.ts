import app from './app';
import config from './config';

async function main() {
  try {
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
