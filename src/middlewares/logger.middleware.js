export const loggerMiddleware = (req, res, next) => {
  const { method, url, body } = req;
  const timestamp = new Date().toISOString();

  const logMessage = `[${timestamp}] ${method} ${url} ${body && Object.keys(body).length ? JSON.stringify(body) : ""}\n`;

  console.log(logMessage.trim());

  next();
};
