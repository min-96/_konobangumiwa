import React, { useEffect, useRef, useState } from 'react';

interface EditableInputProps {
  initContent: string;
  saveProcess: (content: string) => void;
  isEditable: boolean;
}

const EditableInput: React.FC<EditableInputProps> = ({ initContent, saveProcess, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initContent);
  const [isInputValid, setIsInputValid] = useState(true);
  const editRef = useRef<HTMLInputElement>(null);

  const handleToggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsInputValid(e.target.value.length > 0);
  };

  const handleSave = () => {
    if (value.length > 0) {
      saveProcess(value);
      setIsEditing(false);
    } else {
      setIsInputValid(false);
    }
  };
  
  useEffect(() => {
    if (isEditing && editRef.current) {
      const textarea = editRef.current;
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
  }, [isEditing]);

  return (
    <div>
      {isEditing ? (
        <div className="flex flex-col text-center">
          <input
            className={`text-xl text-center rounded-md ${!isInputValid ? 'border-red-600 border-2' : ''}`}
            type="text"
            value={value}
            onChange={handleInputChange}
            onBlur={handleSave}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSave() }}
            ref={editRef}
          />
          {!isInputValid && (
            <small className="text-red-500"> (한글자 이상 입력하세요)</small>
          )}
        </div>
      ) : (
        <div onClick={isEditable ? handleToggleEditing : ()=>{}} className="text-center">
          <p className="text-xl font-bold">{value}</p>
          {
            isEditable &&
            <small className="text-gray-500"> (클릭하면 수정이 가능합니다)</small>
          }
        </div>
      )}
    </div>
  );
};

export default EditableInput;
