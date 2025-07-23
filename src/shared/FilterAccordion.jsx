import { useState } from 'react';
import { SlArrowRight } from "react-icons/sl";
const FilterAccordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-[#C9C9C9] font-PlayfairDisplay border-dashed">
            <button
                className="w-full py-3 flex justify-between items-center focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-semibold">{title}</span>
                <span className={`transition-transform duration-500 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
                <SlArrowRight />
                </span>
            </button>
            <div className={`accordion-content transition-max-height duration-300 ease-in-out ${isOpen ? 'open' : 'closed'}`}>
                <div className="p-3">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default FilterAccordion;
