import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: any;
};

/** subscriptionにおいてデータの作成、更新及び削除を識別するために使用する。 */
export enum Crud {
  /** データが作成されたときに指定する */
  Created = 'CREATED',
  /** データが削除されたときに指定する */
  Deleted = 'DELETED',
  /** データが更新されたときに指定する */
  Updated = 'UPDATED'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** 投稿を新規作成 */
  postCreate?: Maybe<PostCreatePayload>;
  /** 渡されたidの投稿を削除する */
  postDelete?: Maybe<PostDeletePayload>;
  /** 投稿を更新する */
  postUpdate?: Maybe<PostUpdatePayload>;
};


export type MutationPostCreateArgs = {
  input: PostCreateInput;
};


export type MutationPostDeleteArgs = {
  input: PostDeleteInput;
};


export type MutationPostUpdateArgs = {
  input: PostUpdateInput;
};

export type Post = {
  __typename?: 'Post';
  /** 著者 */
  author: Scalars['String'];
  /** 作成日 */
  createdAt: Scalars['ISO8601DateTime'];
  /** ID */
  id: Scalars['ID'];
  /** タイトル */
  title: Scalars['String'];
  /** 更新日 */
  updatedAt: Scalars['ISO8601DateTime'];
};

/** Autogenerated input type of PostCreate */
export type PostCreateInput = {
  author: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

/** Autogenerated return type of PostCreate */
export type PostCreatePayload = {
  __typename?: 'PostCreatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  post: Post;
};

/** Autogenerated input type of PostDelete */
export type PostDeleteInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of PostDelete */
export type PostDeletePayload = {
  __typename?: 'PostDeletePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  post: Post;
};

/** Autogenerated input type of PostUpdate */
export type PostUpdateInput = {
  author: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  title: Scalars['String'];
};

/** Autogenerated return type of PostUpdate */
export type PostUpdatePayload = {
  __typename?: 'PostUpdatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  post: Post;
};

/** Autogenerated return type of PostWasPublished */
export type PostWasPublishedPayload = {
  __typename?: 'PostWasPublishedPayload';
  mutation: Crud;
  post: Post;
};

export type Query = {
  __typename?: 'Query';
  /** 投稿を全て取得する */
  posts?: Maybe<Array<Post>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  postWasPublished: PostWasPublishedPayload;
};

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  author: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', postCreate?: { __typename?: 'PostCreatePayload', post: { __typename?: 'Post', id: string, title: string, author: string } } | null };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['ID'];
  title: Scalars['String'];
  author: Scalars['String'];
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', postUpdate?: { __typename?: 'PostUpdatePayload', post: { __typename?: 'Post', id: string, title: string, author: string } } | null };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', postDelete?: { __typename?: 'PostDeletePayload', post: { __typename?: 'Post', id: string } } | null };

export type AllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPostsQuery = { __typename?: 'Query', posts?: Array<{ __typename?: 'Post', id: string, title: string, author: string }> | null };

export type PostWasPublishedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PostWasPublishedSubscription = { __typename?: 'Subscription', postWasPublished: { __typename?: 'PostWasPublishedPayload', mutation: Crud, post: { __typename?: 'Post', id: string, title: string, author: string } } };


export const CreatePostDocument = gql`
    mutation createPost($title: String!, $author: String!) {
  postCreate(input: {title: $title, author: $author}) {
    post {
      id
      title
      author
    }
  }
}
    `;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreatePostMutation({
 *   variables: {
 *     title: // value for 'title'
 *     author: // value for 'author'
 *   },
 * });
 */
export function useCreatePostMutation(options: VueApolloComposable.UseMutationOptions<CreatePostMutation, CreatePostMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreatePostMutation, CreatePostMutationVariables>>) {
  return VueApolloComposable.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
}
export type CreatePostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreatePostMutation, CreatePostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation updatePost($id: ID!, $title: String!, $author: String!) {
  postUpdate(input: {id: $id, title: $title, author: $author}) {
    post {
      id
      title
      author
    }
  }
}
    `;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdatePostMutation({
 *   variables: {
 *     id: // value for 'id'
 *     title: // value for 'title'
 *     author: // value for 'author'
 *   },
 * });
 */
export function useUpdatePostMutation(options: VueApolloComposable.UseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>>) {
  return VueApolloComposable.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
}
export type UpdatePostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdatePostMutation, UpdatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation deletePost($id: ID!) {
  postDelete(input: {id: $id}) {
    post {
      id
    }
  }
}
    `;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeletePostMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(options: VueApolloComposable.UseMutationOptions<DeletePostMutation, DeletePostMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeletePostMutation, DeletePostMutationVariables>>) {
  return VueApolloComposable.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
}
export type DeletePostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeletePostMutation, DeletePostMutationVariables>;
export const AllPostsDocument = gql`
    query allPosts {
  posts {
    id
    title
    author
  }
}
    `;

/**
 * __useAllPostsQuery__
 *
 * To run a query within a Vue component, call `useAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPostsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useAllPostsQuery();
 */
export function useAllPostsQuery(options: VueApolloComposable.UseQueryOptions<AllPostsQuery, AllPostsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<AllPostsQuery, AllPostsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<AllPostsQuery, AllPostsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, {}, options);
}
export function useAllPostsLazyQuery(options: VueApolloComposable.UseQueryOptions<AllPostsQuery, AllPostsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<AllPostsQuery, AllPostsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<AllPostsQuery, AllPostsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, {}, options);
}
export type AllPostsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<AllPostsQuery, AllPostsQueryVariables>;
export const PostWasPublishedDocument = gql`
    subscription postWasPublished {
  postWasPublished {
    post {
      id
      title
      author
    }
    mutation
  }
}
    `;

/**
 * __usePostWasPublishedSubscription__
 *
 * To run a query within a Vue component, call `usePostWasPublishedSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePostWasPublishedSubscription` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the subscription, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/subscription.html#options;
 *
 * @example
 * const { result, loading, error } = usePostWasPublishedSubscription();
 */
export function usePostWasPublishedSubscription(options: VueApolloComposable.UseSubscriptionOptions<PostWasPublishedSubscription, PostWasPublishedSubscriptionVariables> | VueCompositionApi.Ref<VueApolloComposable.UseSubscriptionOptions<PostWasPublishedSubscription, PostWasPublishedSubscriptionVariables>> | ReactiveFunction<VueApolloComposable.UseSubscriptionOptions<PostWasPublishedSubscription, PostWasPublishedSubscriptionVariables>> = {}) {
  return VueApolloComposable.useSubscription<PostWasPublishedSubscription, PostWasPublishedSubscriptionVariables>(PostWasPublishedDocument, {}, options);
}
export type PostWasPublishedSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<PostWasPublishedSubscription, PostWasPublishedSubscriptionVariables>;