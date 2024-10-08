import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";

interface CollapseProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const Collapse = ({ children, isOpen }: CollapseProps) => {


  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <LazyMotion features={domAnimation}>
          <m.div
            style={{ overflow: "hidden" }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {children}
          </m.div>
        </LazyMotion>
      )}
     
    </AnimatePresence>
  );
};

export default Collapse;
