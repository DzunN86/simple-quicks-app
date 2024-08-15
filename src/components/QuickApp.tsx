import InboxIcon from "@/components/Icon/InboxIcon";
import TaskIcon from "@/components/Icon/TaskIcon";
import InboxContainer from "@/components/InboxContainer";
import Popup from "@/components/Popup";
import QuickButton from "@/components/QuickButton";
import QuickButtonActive from "@/components/QuickButtonActive";
import TasksList from "@/components/TasksList";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";

const quickActions = [
  {
    icon: <TaskIcon className="fill-indicator-pastel" />,
    label: "task",
  },
  {
    icon: <InboxIcon className="fill-indicator-purple" />,
    label: "inbox",
  },
];

export default function QuickApp() {
  const container = {
    hidden: {
      translateX: 25,
      opacity: 0,
    },
    show: {
      translateX: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { translateX: 25, opacity: 0 },
    show: { translateX: 0, opacity: 1 },
  };

  const [isFabEnabled, setIsFabEnabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"inbox" | "task" | null>(null);

  const reset = useCallback(() => {
    setIsFabEnabled((prevState) => !prevState);
    setIsOpen((prevState) => !prevState);
    setMode(null);
  }, []);

  const onSelectMode = useCallback((mode: "inbox" | "task") => {
    setMode(mode);
    setIsOpen(true);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-[#333333] font-lato text-primary-gray">
      <Popup isOpen={isOpen}>
        {mode === "inbox" && <InboxContainer />}
        {mode === "task" && <TasksList />}
      </Popup>
      <div className="fixed bottom-[27px] right-[34px] flex items-center">
        {/* FAB button */}

        {/* FAB button list */}
        {!mode && <QuickButton key={1} onClick={() => setIsFabEnabled((prevState) => !prevState)} />}
        {mode === "inbox" && (
          <QuickButtonActive onClick={reset} className="bg-indicator-purple">
            <InboxIcon className="fill-white" />
          </QuickButtonActive>
        )}
        {mode === "task" && (
          <QuickButtonActive onClick={reset} className="bg-indicator-pastel">
            <TaskIcon className="fill-white" />
          </QuickButtonActive>
        )}
        <AnimatePresence mode="popLayout">
          {!isFabEnabled && (
            <motion.ul variants={container} initial="hidden" animate="show" exit="hidden" className="absolute right-full mr-6 flex  items-center gap-6">
              {quickActions
                .filter((action) => action.label !== mode)
                .map((action, idx) => (
                  <motion.li
                    variants={itemVariants}
                    layout
                    className="h-[60px] w-[60px] rounded-full bg-[#f2f2f2] flex items-center justify-center"
                    role="button"
                    onClick={() => onSelectMode(action.label as "inbox" | "task")}
                    key={idx}
                  >
                    {action.icon}
                  </motion.li>
                ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
