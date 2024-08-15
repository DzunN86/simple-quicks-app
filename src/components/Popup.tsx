import { AnimatePresence, motion } from "framer-motion";

interface PopupProps {
  isOpen: boolean;
  children?: React.ReactNode;
}

export default function Popup({ isOpen,children }: PopupProps) {
  const dropIn = {
    hidden: {
      height: 0,
      width: 0,
      opacity: 0,
    },
    visible: {
      height: 737,
      width: 734,
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      height: 0,
      width: 0,
      opacity: 0,
    },
  };

  if (!isOpen) {
    return null;
  }
  return (
    <AnimatePresence>
    {isOpen && (
      <motion.div className="fixed bottom-[110px] right-[34px] flex items-center">
        <motion.div className="relative h-[737px] w-[734px] bg-white rounded-md overflow-hidden" variants={dropIn} initial="hidden" animate="visible" exit="exit">
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
  )
}
