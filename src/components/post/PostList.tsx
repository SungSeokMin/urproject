import React from 'react';
import { Link } from 'react-router-dom';
import { PostType } from '../../api/posts';
import styles from '../../css/PostList.module.css';
import { FaHeartbeat } from 'react-icons/fa';

type PostListProps = {
  posts: PostType[];
  isLogin: boolean;
};

function PostList({ isLogin, posts }: PostListProps) {
  return (
    <>
      <div className={styles.writeBtn}>
        {isLogin && (
          <Link to="/write" className={styles.createPost}>
            글 작성
          </Link>
        )}
      </div>
      <div className={styles.postListConatiner}>
        {posts.map((post) => (
          <Link to={`/post/${post.id}`} key={post.id}>
            <div className={styles.postContainer}>
              <div className={styles.imgAria}>
                {post.thumbnail ? (
                  <img src={post.thumbnail} alt="썸네일" />
                ) : (
                  <img
                    src="https://urproject-image.s3.amazonaws.com/whiteBackground.png"
                    alt="썸네일"
                  />
                )}
              </div>
              <div className={styles.titleAria}>
                <h3>
                  {post.title.length > 15
                    ? `${post.title.slice(0, 15)}...`
                    : post.title}
                </h3>
              </div>
              <div className={styles.nicknameAndLike}>
                <div className={styles.nickname}>{post.nickname}</div>
                <div className={styles.like}>
                  <FaHeartbeat className={styles.likeIcon} />
                  <span>{post.like}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default PostList;
