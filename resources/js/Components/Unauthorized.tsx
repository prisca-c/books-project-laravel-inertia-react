const Unauthorized = () => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 text-gray-900">
            Sorry, you are not authorized to view this page.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
