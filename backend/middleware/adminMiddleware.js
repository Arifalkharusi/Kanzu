import expressAsyncHandler from "express-async-handler";

const authAdmin = (role) => {
  return expressAsyncHandler(async (req, res, next) => {
    if (req.user?.role !== role) {
      res.status(401);
      throw new Error("Not Authorised");
    }

    next();
  });
};

export default authAdmin;
