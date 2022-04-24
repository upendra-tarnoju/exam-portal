import { MutationSignupArgs } from "../../generated/graphql";
import User, { UserAccountStatus, UserType } from '../../models/user';

const userResolvers = {
  Query: {},
  Mutation: {
    signup: async(_parent: any, { input }: MutationSignupArgs) => {
      try {
        await User.create({
          ...input,
          type: UserType.SUB_ADMIN,
          accountStatus: UserAccountStatus.PENDING,
        });

        return {
          code: 200,
          message: 'User created successfully',
        };
      }
      catch(err: any) {
        if(err && err.code === 11000) {
          return {
            code: 200,
            message: 'Email ID already existed',
          };
        }
        throw err;
      }
    }
  }
};

export default userResolvers;
