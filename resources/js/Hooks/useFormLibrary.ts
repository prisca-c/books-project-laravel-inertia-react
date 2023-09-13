import { useForm } from '@inertiajs/react';
import { LibraryType } from '@/types/LibraryType';

const useFormLibrary = () => {
  const { data, setData, post, put, processing, errors, reset } = useForm(<
    Partial<LibraryType>
  >{
    notes: '',
    started_at: '',
    finished_at: '',
  });

  return {
    data,
    setData,
    post,
    put,
    processing,
    errors,
    reset,
  };
};

export default useFormLibrary;
