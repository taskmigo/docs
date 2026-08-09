import { Tooltip } from '@base-ui/react/tooltip';
import { CodeXml } from 'lucide-react';

interface FieldTypeProps {
  supportsExpression?: boolean;
  children: React.ReactNode;
}

export function FieldType({ supportsExpression = false, children }: FieldTypeProps) {
  if (supportsExpression) {
    return (
      <span className="flex gap-2 items-center">
        {children}
        {supportsExpression && <ExpressionSupport />}
      </span>
    )
  }

  return children;
}

function ExpressionTag() {
  return (
    <span className="not-prose inline-flex items-center rounded-md bg-green-500/10 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-green-500/20 ring-inset dark:text-green-400 dark:ring-green-500/30">
      <CodeXml size={16} aria-hidden="true" />
    </span>
  )
}

function ExpressionSupport() {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger aria-label="Supports Expression" render={<ExpressionTag />}>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner align='center'>
            <Tooltip.Popup className={"bg-fd-background p-2 text-xs"}>
              <Tooltip.Arrow />
              Supports Expression
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
