import Response from "utils/response";

export default class Controller {
  static async get(_, res, next) {
    try {
      const data = {
        name: "Victor Aiyeola",
        github: "@aiyeola",
        email: "aiyeolavictor@gmail.com",
        mobile: "08182891282",
        twitter: "@victor_aiyeola"
      };

      return Response.Success(res, "My Rule-Validation API", data);
    } catch (error) {
      return next(error);
    }
  }

  static async post(req, res, next) {
    try {
      
      return Response.Success(res, "You have post successfully");
    } catch (error) {
      return next(error);
    }
  }
}
