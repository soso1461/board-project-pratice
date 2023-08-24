import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import "./style.css";

//          interface: Input 상자 컴포넌트 Props          //
interface Props {
  label: string;
  type: "text" | "password";
  error: boolean;
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  icon?: string; //아이콘은 필수가 아니기 때문에 선택자 '?'로 지정
  errorMessage?: string; //에러가 안 뜰 때가 있기 때문에 선택자 '?'로 지정
  onButtonClick?: () => void; //버튼이 없을 수도 있기 때문에 "
}

//          component: Input 상자 컴포넌트          //
export default function InputBox(props: Props) {

  //          state: Properties         //
  const { label, type, error, placeholder, value, icon, errorMessage } = props;
  const { setValue, onButtonClick } = props;

  //            event handler: input 값 변경 이벤트 처리         //
  const onInputValueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
  }


  //          render: Input 상자 렌더링         //
  return (
    <div className='inputbox'>
      <div className='inputbox-label'>{label}</div>
      <div
        className={ error ? "inputbox-container-error" : "inputbox-container" }>
        <input
          className='input'
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onInputValueChangeHandler}
        />
        {onButtonClick !== undefined && (
          <div className='icon-button' onClick={onButtonClick}>
            {icon !== undefined && <div className={icon}></div>}
          </div>
        )}
      </div>
      <div className='inputbox-message'>{errorMessage}</div>
    </div>
  );
}
