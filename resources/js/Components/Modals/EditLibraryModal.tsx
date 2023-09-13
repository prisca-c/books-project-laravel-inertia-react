import React, { useEffect } from 'react';
import useFormLibrary from '@/Hooks/useFormLibrary';
import InputError from '@/Components/InputError';
import FormButtons from '@/Components/FormButtons';
import type { LibraryType } from '@/types/LibraryType';

type EditLibraryModalProps = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  library: Partial<LibraryType>;
};

const EditLibraryModal = ({ setShow, library }: EditLibraryModalProps) => {
  const { data, setData, processing, errors, reset, put } = useFormLibrary();

  useEffect(() => {
    setData({
      user_id: library?.user_id || 0,
      edition_id: library?.edition_id || 0,
      notes: library?.notes || '',
      started_at: library?.started_at || '',
      finished_at: library?.finished_at || '',
    });
  }, [library]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(route('dashboard.libraries.update', library.id), {
      preserveScroll: true,
      onSuccess: () => {
        setShow(false);
      },
    });
  };

  return (
    <div className="fixed z-10 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className={'relative w-[90vw] md:w-[70vw] bg-white p-4 rounded-lg'}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-center">Edit Book</h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Notes</label>
            <textarea
              id="title"
              className="border border-gray-300 p-2"
              value={data.notes}
              onChange={(e) => setData('notes', e.target.value)}
            />
            <InputError message={errors.notes} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="started_at">Started at</label>
            <input
              type="date"
              id="started_at"
              className="border border-gray-300 p-2"
              value={data.started_at}
              onChange={(e) => setData('started_at', e.target.value)}
            />
            <InputError message={errors.started_at} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="finished_at">Finished at</label>
            <input
              type="date"
              id="finished_at"
              className="border border-gray-300 p-2"
              value={data.finished_at}
              onChange={(e) => setData('finished_at', e.target.value)}
            />
            <InputError message={errors.finished_at} />
          </div>

          <FormButtons setShow={setShow} reset={reset} disabled={processing} />
        </div>
      </form>
    </div>
  );
};

export default EditLibraryModal;
