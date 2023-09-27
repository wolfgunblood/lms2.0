import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

type Props = {}
const backgroundVariants = cva(
    "rounded-full flex items-center justify-center",
    {
        variants: {
            variant: {
                default: "bg-sky-100",
                success: "bg-emerald-100",
            },
            size: {
                default: "p-2",
                sm: "p-1",
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }
);

const IconVariants = cva(
    "",
    {
        variants: {
            variant: {
                default: "text-sky-700",
                success: "text-emerald-700"
            }, size: {
                default: "w-8 h-8",
                sm: "w-5 h-5"
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        }
    }
)

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof IconVariants>;

interface IconBadgeProps extends BackgroundVariantsProps, IconVariantsProps {
    icon: LucideIcon;
};
const IconBadge = ({
    icon:Icon,
    variant,
    size
}: IconBadgeProps) => {
    return (
        <div className={cn(backgroundVariants({variant,size}))}>
            <Icon className={cn(IconVariants({variant,size}))}/>
        </div>
    )
}

export default IconBadge