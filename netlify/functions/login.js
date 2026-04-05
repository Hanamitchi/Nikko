exports.handler = async (event) => {
  const { username, password } = JSON.parse(event.body);

  const USERNAME = process.env.USERNAME;
  const PASSWORD = process.env.PASSWORD;

  if (username === USERNAME && password === PASSWORD) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Login successful" }),
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({ message: "Invalid credentials" }),
  };
};