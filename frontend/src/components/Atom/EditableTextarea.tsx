import React, { useEffect, useRef, useState } from 'react';
import { FaHeart } from 'react-icons/fa';

interface EditableTextareaProps {
  initContent?: string;
  deleteProcess: () => void;
  saveProcess: (content: string) => void;
  align: 'center' | 'left' | 'right';
  maxChars: number;
  inputHeight: string;
}

const EditableTextarea: React.FC<EditableTextareaProps> = ({
  initContent,
  saveProcess,
  deleteProcess,
  align,
  maxChars,
  inputHeight
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initContent || "");
  const [charCount, setCharCount] = useState(initContent ? initContent.length : 0);
  const editRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && editRef.current) {
      const textarea = editRef.current;
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
  }, [isEditing]);

  function handleSave() {
    setIsEditing(false);
    saveProcess(content);
    // api call
  }

  function handleDelete() {
    deleteProcess();
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const inputContent = e.target.value;
    if (inputContent.length <= maxChars) {
      setContent(inputContent);
      setCharCount(inputContent.length);
    }
  }

  return (
    <div>
      <div className="relative overflow-auto">
        {isEditing ? (
          <>
            <textarea
              ref={editRef}
              className={`w-full p-1 text-gray-700 bg-gray-100 text-${align} rounded-md h-${inputHeight}`}
              value={content}
              onChange={handleChange}
              maxLength={maxChars}
            />
            <div className="absolute bottom-2 right-2 text-sm text-gray-400">
              {charCount}/{maxChars}
            </div>
          </>
        ) : (
          content === "" ? <div className={`m-4 text-${align}`}>작성한 글이 없습니다</div> :
          <p className={`p-1 text-${align} max-h-${inputHeight}`} dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} />
        )}
      </div>
      <hr className="mt-2 mb-2" />
      <div className="flex justify-between">
        <div className="flex items-center">
          <FaHeart className="text-red-500 mr-1" />
          <p>0</p>
        </div>
        <div>
          {isEditing ? (
            <button
              className="bg-blue-500 text-white rounded px-2 py-1"
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <>
              <button
                className="bg-yellow-500 text-white rounded px-2 py-1 mr-2"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white rounded px-2 py-1"
                onClick={handleDelete}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditableTextarea;
