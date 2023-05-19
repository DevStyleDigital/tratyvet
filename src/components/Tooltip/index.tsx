import * as TooltipRdx from '@radix-ui/react-tooltip';

interface TooltipProps {
  content: string;
  side?: 'top' | 'left' | 'bottom' | 'right';
}

export const Tooltip: BTypes.FC<TooltipProps> = ({
  children,
  content,
  side = 'right',
}) => {
  return (
    <TooltipRdx.Provider disableHoverableContent delayDuration={200}>
      <TooltipRdx.Root>
        <TooltipRdx.Trigger>{children}</TooltipRdx.Trigger>
        <TooltipRdx.Portal>
          <TooltipRdx.Content
            side={side}
            className="rounded-md z-50 bg-white text-xs text-primary-900 shadow-left px-4 py-2"
            sideOffset={15}
          >
            {content}
            <TooltipRdx.Arrow className="fill-primary" />
          </TooltipRdx.Content>
        </TooltipRdx.Portal>
      </TooltipRdx.Root>
    </TooltipRdx.Provider>
  );
};
