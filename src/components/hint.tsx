// Example Hint component (using Radix UI Tooltip as base)
import * as Tooltip from '@radix-ui/react-tooltip';

export const Hint = ({
   label,
   children,
   asChild = false,
}: {
   label: string;
   children: React.ReactNode;
   asChild?: boolean;
}) => (
   <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
         <Tooltip.Trigger asChild={asChild}>{children}</Tooltip.Trigger>
         <Tooltip.Content
            sideOffset={8}
            className="bg-white text-black px-2 py-1 rounded-lg shadow-md text-xs font-medium z-50"
         >
            {label}
         </Tooltip.Content>
      </Tooltip.Root>
   </Tooltip.Provider>
);
