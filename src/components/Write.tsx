import { AxiosError } from 'axios';
import React, { ChangeEvent, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { RouteComponentProps } from 'react-router';
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
  console.log('18', data);
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

  // textarea??? title??? ??????
  const titleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setTitle(value);
  };

  // input??? file ????????? ???????????? ?????? Ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // input tyle="file"??? display??? none?????? ????????? ????????? ?????? ?????? ??? input??????
  const clickTunmbnail = () => {
    if (fileInputRef.current !== null) fileInputRef.current.click();
  };

  // ????????? ????????? server??? ????????? S3??? ?????? ??? ?????????URL ???????????? ??? thubnail ?????? ????????????
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

  // ?????? ?????? ??? server??? ??????
  // ?????? ??? post ???????????? ??????
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
          placeholder="???????????? ????????? ??????????????????."
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
          placeholder="????????? ??????????????????."
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
          ?????????
        </button>
        <button className={styles.insertBtn} onClick={insertOrModifyHandler}>
          ??????
        </button>
      </div>
    </div>
  );
}

export default Write;
