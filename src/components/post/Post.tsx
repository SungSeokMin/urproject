import React, { useState } from 'react';
import { PostType } from '../../api/posts';
import styles from '../../css/Post.module.css';
import { FiLink } from 'react-icons/fi';
import { UserState } from '../../modules/user';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { CopyToClipboard } from 'react-copy-to-clipboard';

type PostProps = RouteComponentProps & {
  post: PostType;
  loginUserInfo: UserState;
  requestRemovePost: (id: number) => void;
};

function Post({ post, loginUserInfo, requestRemovePost, history }: PostProps) {
  const [showMessage, setShowMessage] = useState(false);

  const { id, nickname, title, content } = post;
  const CurrentURL = window.location.href;

  const removePostHandler = () => {
    requestRemovePost(id);

    history.push('/post');
  };

  const copyLinkHandler = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
  };

  return (
    <div className={styles.postContainer}>
      {showMessage && <div className={styles.copyMessage}>복사 완료 !</div>}
      <div className={styles.titleAria}>
        <CopyToClipboard text={CurrentURL}>
          <FiLink className={styles.linkIcon} onClick={copyLinkHandler} />
        </CopyToClipboard>
        <span>{title}</span>
      </div>
      <div className={styles.nicknameAndLike}>
        <div className={styles.nicknameAria}>
          <span>{nickname}</span>
        </div>
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
