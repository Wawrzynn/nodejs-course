const routes = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Home Page</title></head>");
    res.write("<body><h1>Welcome!</h1></body>");
    res.write(
      "<body><form action='/create-user' method='POST'><input type='text' name='create-user'><button type='submit'>Create user</button></input></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const user = parsedBody.split("=")[1];
      console.log(user);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }

  if (url === "/users") {
    res.write("<html>");
    res.write("<head><title>Users Page</title></head>");
    res.write(
      "<body><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul></body>"
    );
    res.write("</html>");
    res.end();
  }

  res.write("<html>");
  res.write("<head><title>Page Not Found</title></head>");
  res.write("<body><h1>Page Not Found</h1></body>");
  res.write("</html>");
  return res.end();
};

module.exports = routes;
