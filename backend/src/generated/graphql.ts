import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  EmailAddress: any;
  NonNegativeInt: any;
};

export type College = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type LoginCredentials = {
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
};

export type LoginResponse = LoginSuccessResponse | ResponseError;

export type LoginSuccessResponse = {
  __typename?: 'LoginSuccessResponse';
  lastLogin: Scalars['String'];
  token: Scalars['String'];
  userType: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signup: Status;
};


export type MutationSignupArgs = {
  input: SignupUserInput;
};

export type Query = {
  __typename?: 'Query';
  login: LoginResponse;
};


export type QueryLoginArgs = {
  input?: InputMaybe<LoginCredentials>;
};

export type ResponseError = {
  __typename?: 'ResponseError';
  error: Status;
};

export type SignupUserInput = {
  email: Scalars['EmailAddress'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type Status = {
  __typename?: 'Status';
  code: Scalars['NonNegativeInt'];
  message: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  College: College;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  LoginCredentials: LoginCredentials;
  LoginResponse: ResolversTypes['LoginSuccessResponse'] | ResolversTypes['ResponseError'];
  LoginSuccessResponse: ResolverTypeWrapper<LoginSuccessResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  NonNegativeInt: ResolverTypeWrapper<Scalars['NonNegativeInt']>;
  Query: ResolverTypeWrapper<{}>;
  ResponseError: ResolverTypeWrapper<ResponseError>;
  SignupUserInput: SignupUserInput;
  Status: ResolverTypeWrapper<Status>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  College: College;
  EmailAddress: Scalars['EmailAddress'];
  ID: Scalars['ID'];
  LoginCredentials: LoginCredentials;
  LoginResponse: ResolversParentTypes['LoginSuccessResponse'] | ResolversParentTypes['ResponseError'];
  LoginSuccessResponse: LoginSuccessResponse;
  Mutation: {};
  NonNegativeInt: Scalars['NonNegativeInt'];
  Query: {};
  ResponseError: ResponseError;
  SignupUserInput: SignupUserInput;
  Status: Status;
  String: Scalars['String'];
};

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export type LoginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = {
  __resolveType: TypeResolveFn<'LoginSuccessResponse' | 'ResponseError', ParentType, ContextType>;
};

export type LoginSuccessResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginSuccessResponse'] = ResolversParentTypes['LoginSuccessResponse']> = {
  lastLogin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  signup?: Resolver<ResolversTypes['Status'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'input'>>;
};

export interface NonNegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeInt'], any> {
  name: 'NonNegativeInt';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  login?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, Partial<QueryLoginArgs>>;
};

export type ResponseErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResponseError'] = ResolversParentTypes['ResponseError']> = {
  error?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['Status'] = ResolversParentTypes['Status']> = {
  code?: Resolver<ResolversTypes['NonNegativeInt'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  EmailAddress?: GraphQLScalarType;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  LoginSuccessResponse?: LoginSuccessResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NonNegativeInt?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  ResponseError?: ResponseErrorResolvers<ContextType>;
  Status?: StatusResolvers<ContextType>;
};

