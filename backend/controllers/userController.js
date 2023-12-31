const {
  createUserService,
  loginUserService,
  createToken,
  deleteUserService,
  getLogedUserService,
} = require("../services/userServices");

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, password, email,role } = req.body;

    const user = await createUserService({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      role
    });

    if (user) {
      // if (!("err" in user)) {
        // const newToken = createToken(user);
        // res.cookie("accessToken", newToken.newAccessToken, {
        //   maxAge: 60 * 60 * 1000,
        //   httpOnly: true,
        // });
        // res.cookie("refreshToken", newToken.newRefreshToken, {
        //   maxAge: 60 * 60 * 24 * 1000,
        //   httpOnly: true,
        // });
        // res.cookie("logedUser", newToken.dataStoredInToken, {
        //   maxAge: 60 * 60 * 1000,
        // });

        // console.log("acctoken", newToken.newAccessToken);
        // console.log("refrhtoken", newToken.newRefreshToken);

        res.status(200);
        res.json(user);
        return;
      //}
    }
  } catch (err) {
    console.log("Register User Error", err);
    res.status(400);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const email = req.body.email;
    console.log('email', email)
    const results = await deleteUserService(email);
    res.status(200);
    res.json(results);
  } catch (err) {
    console.log("Delete Student Error ", err);
    res.status(400);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { password, email } = req.body;

    const user = await loginUserService({
      email: email.toLowerCase(),
      password,
    });

    if (user) {
      if (!("err" in user)) {
        const newToken = createToken(user);
        res.cookie("accessToken", newToken.newAccessToken, {
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
        });
        res.cookie("refreshToken", newToken.newRefreshToken, {
          maxAge: 60 * 60 * 24 * 1000,
          httpOnly: true,
        });
        console.log("acctoken", newToken.newAccessToken);
        console.log("refrhtoken", newToken.newRefreshToken);

        res.status(200);
        res.json(user);
        return;
      }
    }
  } catch (err) {
    console.log("Login User Error", err);
    res.status(400).send(err.toString());
  }
};

exports.logoutUser = (req, res) => {
  try {
    res.cookie("accessToken", "", {
      maxAge: -1,
      httpOnly: true,
    });
    res.cookie("refreshToken", "", {
      maxAge: -1,
      httpOnly: true,
    });
    res.status(200).json({
      status: "Successfully logged out",
    });
  } catch (err) {
    console.log("Logout User Error ", err);
    res.status(400).send(err.toString());
  }
};

exports.getLogedUser =async(req,res)=>{
  try{
   
      const userToken = req.cookies.accessToken;
      console.log('res', {res})
      console.log("token", userToken)
      const user = await getLogedUserService(userToken);
      res.status(200);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  
}
