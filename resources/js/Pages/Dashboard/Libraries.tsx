import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import Library from '@/Components/Library';
import EditionButtons from '@/Components/EditionButtons';
import type { PageProps } from '@/types';
import type { LibraryType } from '@/types/LibraryType';

type LibrariesProps = {
  auth: PageProps['auth'];
  libraries: LibraryType[];
};

const Libraries = ({ auth, libraries }: LibrariesProps) => {
  const [showEditLibraryModal, setShowEditLibraryModal] = useState(false);
  const [editedLibrary, setEditedLibrary] = useState<LibraryType | null>(null);

  const onDelete = (id: number) => {
    router.delete(route('dashboard.libraries.destroy', id), {
      preserveScroll: true,
    });
  };

  const onEdit = (library: LibraryType | null) => {
    setEditedLibrary(library);
    setShowEditLibraryModal(true);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          My Library
        </h2>
      }
    >
      <div className="relative max-w-7xl mx-auto sm:px-6 lg:px-8">
        {libraries && libraries.length > 0 ? (
          libraries.map((library: LibraryType) => (
            <div
              className="relative bg-white overflow-hidden shadow rounded-lg my-4"
              key={library.id}
            >
              <EditionButtons
                onDelete={() => onDelete(library.id)}
                onEdit={() => onEdit(library)}
              />
              <Library library={library} />
            </div>
          ))
        ) : (
          <div className="bg-white overflow-hidden shadow rounded-lg my-4">
            <div className="px-4 py-5 sm:p-6">
              <p className="text-center text-gray-500">
                You don't have any book's edition in your library yet.
              </p>
            </div>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
};

export default Libraries;
