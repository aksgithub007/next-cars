import jwt from "jsonwebtoken";
export async function validateToken(request) {
  const token = request.cookies.get("token").value;
  console.log(token, "from validate function");
  //Token is not present
  if (!token) {
    throw new Error("Token is not found");
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken._id;
  return userId;
}
