import { AxiosError } from 'axios';
import React, { ChangeEvent, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { RouteComponentProps, withRouter } from 'react-router';
import { createPost, modifyPost, PostType } from '../api/posts';
import { saveS3Image, saveS3Thumbnail } from '../api/write';
import styles from '../css/Write.module.css';
import WriteLoadingPage from '../pages/WriteLoadingPage';

type WriteProps = RouteComponentProps & {
  nickname: string;
  data: PostType | null;
};

function Write(props: WriteProps) {
  const { history, match, nickname, data } = props;

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(data ? data.title : '');
  const [thumbnail, setThumbnail] = useState(data ? data.thumbnail : '');
  const [content, setContent] = useState(data ? data.content : '');

  const QuillRef = useRef<ReactQuill>();

  const imageHandler = () => {
    const input = document.createElement('input');
    const formData = new FormData();

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files;

      if (file !== null) {
        formData.append('images', file[0]);

        try {
          setLoading(true);
          const imgUrl = await saveS3Image(formData);

          const range = QuillRef.current?.getEditor().getSelection()?.index;
          if (range !== null && range !== undefined) {
            let quill = QuillRef.current?.getEditor();

            quill?.setSelection(range, 1);

            quill?.clipboard.dangerouslyPasteHTML(range, `<img src=${imgUrl}>`);
          }

          setLoading(false);

          return { ...imgUrl, success: true };
        } catch (error) {
          const err = error as AxiosError;
          return { ...err.response, success: false };
        }
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ color: [] }],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
            { align: [] },
          ],
          ['link', 'image'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  // textarea의 title값 변경
  const titleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setTitle(value);
  };

  // input의 file 객체를 가져오기 위한 Ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // input tyle="file"의 display를 none으로 해놓고 썸네일 버튼 클릭 시 input클릭
  const clickTunmbnail = () => {
    if (fileInputRef.current !== null) fileInputRef.current.click();
  };

  // 썸네일 파일을 server로 보내고 S3에 저장 후 이미지URL 리턴받은 후 thubnail 상태 바꿔주기
  const selectThumbnail = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);

    if (e.target.files !== null) {
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append('thumbnail', file);

      const imgUrl = await saveS3Thumbnail(formData);

      setThumbnail(imgUrl);
      setLoading(false);
    }
  };

  // 추가 클릭 시 server로 요청
  // 완료 후 post 페이지로 이동
  const insertPostHandler = async () => {
    const post = {
      nickname,
      thumbnail,
      title,
      content,
    };

    await createPost(post);

    history.push('/post');
  };

  const modifyPostHandler = async () => {
    if (data) {
      const post = {
        id: data.id,
        thumbnail,
        title,
        content,
      };

      await modifyPost(post);
      history.push(`/post/${data.id}`);
    }
  };

  const insertOrModifyHandler = () => {
    const address = match.path;

    if (address === '/post/modify/:id') {
      modifyPostHandler();
    } else {
      insertPostHandler();
    }
  };

  return (
    <div className={styles.writeContainer}>
      <div className={styles.titleArea}>
        <textarea
          placeholder="프로젝트 이름을 작성해주세요."
          value={title}
          onChange={titleChange}
        />
      </div>

      {loading && <WriteLoadingPage />}

      <div className={styles.writeArea}>
        <ReactQuill
          ref={(element) => {
            if (element !== null) QuillRef.current = element;
          }}
          className={styles.reactQuill}
          value={content}
          onChange={setContent}
          modules={modules}
          theme="snow"
          placeholder="내용을 입력해주세요."
        />
      </div>
      <div className={styles.buttonArea}>
        <input
          type="file"
          className={styles.fileInput}
          accept="img/*"
          ref={fileInputRef}
          onChange={selectThumbnail}
        />
        <button className={styles.thumbnailBtn} onClick={clickTunmbnail}>
          썸네일
        </button>
        <button className={styles.insertBtn} onClick={insertOrModifyHandler}>
          추가
        </button>
      </div>
    </div>
  );
}

export default withRouter(Write);
