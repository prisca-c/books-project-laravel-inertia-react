import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

type FormButtonsProps = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
  reset: () => void;
};

const FormButtons = ({ setShow, disabled, reset }: FormButtonsProps) => {
  return (
    <>
      <div className="flex flex-col gap-2 mt-8">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          type="submit"
          disabled={disabled}
        >
          Submit
        </button>

        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
          type="button"
          onClick={() => reset()}
          disabled={disabled}
        >
          Reset
        </button>
      </div>
      <button
        className="absolute top-4 right-4 text-red-500 hover:text-red-700 hover:bg-red-100 px-2"
        type="button"
        onClick={() => setShow(false)}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
    </>
  );
};

export default FormButtons;
