const hostname = 'localhost';

export const hasDevServerPortEnvVar = () => {
  let port = Number.parseInt(process.env.NEXT_DEV_SERVER_PORT as string);

  if (process.env.UI_TEST_DEV_SERVER_MODE == 'build') {
    port = Number.parseInt(process.env.UI_TEST_HTTP_SERVER_PORT as string);
  }

  if (typeof port !== 'number' && !isNaN(port) && !Number.isInteger(port)) {
    return false;
  }

  return true;
};

export const getDevServerDetails = () => {
  let port = Number.parseInt(process.env.NEXT_DEV_SERVER_PORT as string);

  if (process.env.UI_TEST_DEV_SERVER_MODE == 'build') {
    port = Number.parseInt(process.env.UI_TEST_HTTP_SERVER_PORT as string);
  }

  if (typeof port !== 'number' && !isNaN(port) && !Number.isInteger(port)) {
    console.error(
      `👹 Oops! Expected the environment variable NEXT_DEV_SERVER_PORT to have a valid port number but got ${port}, which type is ${typeof port}`,
    );
    process.exit(1);
  }

  return {
    hostname,
    port,
    url: `http://${hostname}:${port}`,
  };
};
