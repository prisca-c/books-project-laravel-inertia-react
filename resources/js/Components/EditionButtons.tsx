import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPen } from '@fortawesome/free-solid-svg-icons';

type EditionButtonsProps = {
  onDelete: () => void;
  onEdit: () => void;
};

const EditionButtons = ({ onDelete, onEdit }: EditionButtonsProps) => {
  return (
    <div className={'flex justify-end items-center gap-4 mt-4 px-2'}>
      <div className={'flex justify-center items-center'}>
        <button
          className={'text-red-500 hover:text-red-700 hover:bg-red-100 px-2'}
          onClick={() => onDelete()}
        >
          <FontAwesomeIcon icon={faClose} /> Delete
        </button>
      </div>

      <div className={'flex justify-center items-center'}>
        <button
          className={'text-blue-500 hover:text-blue-700 hover:bg-blue-100 px-2'}
          onClick={() => onEdit()}
        >
          <FontAwesomeIcon icon={faPen} /> Edit
        </button>
      </div>
    </div>
  );
};

export default EditionButtons;
