import React from 'react';

type AccordionProps = {
  title: string;
  children: React.ReactNode;
};

export const Accordion = ({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const contentClass = isOpen ? 'accordion__content--visible' : '';

  return (
    <>
      <style>
        {`
        .container__accordion {
          width: 100%;
          max-width: 500px;
        }
        .accordion__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .accordion__content {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: all 0.3s ease-in-out;
        }

        .accordion__content--visible {
          padding: 1rem;
          overflow: auto;
          opacity: 1;
          max-height: 250px;
        }
      `}
      </style>
      <div className="relative container__accordion w-auto">
        <div
          className="block z-10 border border-gray-300 rounded-lg p-4 cursor-pointer accordion__header hover:bg-gray-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h1 className="text-lg font-bold mx-auto">{title}</h1>
        </div>
        <div
          className={`border border-gray-300 rounded-lg accordion__content ${contentClass}`}
        >
          {children}
          <button
            className={
              (isOpen ? 'absolute' : 'hidden') +
              ' bottom-0 right-0 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'
            }
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Accordion;
