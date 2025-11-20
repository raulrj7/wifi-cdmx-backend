import { authService } from "./auth.service";

export const authResolvers = {
  Mutation: {
    login: async (_: any, { email, password }: any) => {
      return authService.login(email, password);
    },
  },
};
