import React from 'react';
import { Link } from 'react-router-dom';
import { PostType } from '../../api/posts';

type PostListProps = {
  posts: PostType[];
};

function PostList({ posts }: PostListProps) {
  return (
    <div>
      {posts.map((post) => (
        <Link to={`/post/${post.id}`} key={post.id}>
          {post.title}
        </Link>
      ))}
    </div>
  );
}

export default PostList;
