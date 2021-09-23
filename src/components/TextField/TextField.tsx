import React, { useState } from 'react';
import style from './TextField.module.scss';

type TextFieldProps = {
  placeholder: string;
  rows: number;
  defaultValue?: string;
  onChange?: (text: string) => boolean | string;
  tall?: boolean;
};

const TextField: React.FunctionComponent<TextFieldProps> = (props: TextFieldProps) => {
  const { defaultValue, placeholder, onChange, rows, tall } = props;

  const [validationError, setValidationError] = useState<boolean | string>(false);

  return (
    <div className={`${style.textField} ${tall ? style.tall : ''}`}>
      <textarea
        defaultValue={defaultValue}
        maxLength={10000}
        rows={rows}
        placeholder={placeholder}
        onChange={e => onChange && setValidationError(onChange(e.target.value))}
        autoFocus={true}
        onFocus={function (e) {
          const val = e.target.value;
          e.target.value = '';
          e.target.value = val;
        }}
      />
      {validationError && <small className={style.validationError}>{validationError}</small>}
    </div>
  );
};

export default TextField;
