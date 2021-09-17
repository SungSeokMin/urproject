import React, { useState } from 'react';
import { PostType } from '../../api/posts';
import styles from '../../css/Post.module.css';
import { GiHeartPlus, GiHeartMinus } from 'react-icons/gi';
import { UserState } from '../../modules/user';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

type PostProps = RouteComponentProps & {
  post: PostType;
  loginUserInfo: UserState;
  requestRemovePost: (id: number) => void;
};

function Post({ post, loginUserInfo, requestRemovePost, history }: PostProps) {
  const { id, nickname, title, content, like } = post;

  const [bool, setBool] = useState(false);

  const clickLikeIcon = () => {
    setBool(true);
  };

  const clickUnLikeIcon = () => {
    setBool(false);
  };

  const removePostHandler = () => {
    requestRemovePost(id);

    history.push('/post');
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.titleAria}>
        <span>{title}</span>
      </div>
      <div className={styles.nicknameAndLike}>
        <div className={styles.nicknameAria}>
          <span>{nickname}</span>
        </div>
        {loginUserInfo.isLogin && (
          <div className={styles.likeAria}>
            {bool ? (
              <GiHeartMinus
                className={styles.unLikeIcon}
                onClick={clickUnLikeIcon}
              />
            ) : (
              <GiHeartPlus
                className={styles.likeIcon}
                onClick={clickLikeIcon}
              />
            )}

            <span className={styles.likeNumber}>{like}</span>
          </div>
        )}
      </div>
      <div className={styles.underLine} />
      <div className={styles.modifyAndDeleteAria}>
        {loginUserInfo.nickname === nickname && (
          <>
            <Link to={`modify/${id}`}>
              <button className={styles.modifyBtn}>수정</button>
            </Link>
            <button className={styles.deleteBtn} onClick={removePostHandler}>
              삭제
            </button>
          </>
        )}
      </div>
      <div className={styles.contentAria}>
        <span dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}

export default Post;
