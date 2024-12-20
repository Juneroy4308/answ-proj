import {VariantProps, cva} from "class-variance-authority";
import {classNames} from "utils/classNames.ts";

import React from "react";

const labelVariants = cva("block", {
    variants: {
        variant: {
            default: "text-black",
            primary: "text-white cursor-pointer",
        },
        size: {
            default: "text-xs font-semibold",
            normal: "text-[14px]",
            sm: "text-xs font-normal",
            bold: "text-[14px] font-bold",
            bigBold: "text-base font-bold",
            boldmobile: "text-2xl text-white font-bold",
            superbold: "text-6xl text-white font-bold",
            superBoldBlack: "text-xl text-black font-bold",

        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelVariants> {
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({className, variant, size, ...props}, ref) => (
    <label ref={ref} className={classNames(labelVariants({variant, size}), className)} {...props} />
));
export default Label;
