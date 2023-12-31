import { useState } from 'react';
import { router } from '@inertiajs/react';
import Library from '@/Components/Library';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EditionButtons from '@/Components/EditionButtons';
import EditLibraryModal from '@/Components/Modals/EditLibraryModal';
import type { PageProps } from '@/types';
import type { LibraryType } from '@/types/LibraryType';

type LibrariesProps = {
  auth: PageProps['auth'];
  libraries: LibraryType[];
};

const Libraries = ({ auth, libraries }: LibrariesProps) => {
  const [showEditLibraryModal, setShowEditLibraryModal] =
    useState<boolean>(false);
  const [editedLibrary, setEditedLibrary] = useState<Partial<LibraryType>>({
    edition_id: 0,
    notes: '',
    started_at: '',
    finished_at: '',
  });

  const onDelete = (id: number) => {
    router.delete(route('dashboard.libraries.destroy', id), {
      preserveScroll: true,
    });
  };

  const onEdit = (library: LibraryType) => {
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
      {showEditLibraryModal && (
        <EditLibraryModal
          setShow={setShowEditLibraryModal}
          library={editedLibrary}
        />
      )}
      <div className="relative max-w-7xl mx-auto sm:px-6 lg:px-8">
        {libraries && libraries.length > 0 ? (
          libraries.map((library: LibraryType) => (
            <div
              className="relative bg-white overflow-hidden shadow rounded-lg my-4"
              key={library.id}
            >
              <div className={'mt-14 md:mt-0'}>
                <EditionButtons
                  onDelete={() => onDelete(library.id)}
                  onEdit={() => onEdit(library)}
                />
              </div>
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
