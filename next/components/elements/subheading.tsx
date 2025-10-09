import { MotionProps } from 'framer-motion';
import React from 'react';
import Balancer from 'react-wrap-balancer';

import { cn } from '@/lib/utils';

export const Subheading = ({
  className,
  as: Tag = 'h2',
  children,
  ...props
}: {
  className?: string;
  as?: any;
  children: any;
  props?: React.HTMLAttributes<HTMLHeadingElement>;
} & MotionProps &
  React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <Tag
      className={cn(
        'text-sm md:text-base  max-w-4xl text-left my-4 mx-auto',
        'text-muted text-center font-normal',
        className
      )}
    >
      <Balancer>
        {children.map(
          (
            part: {
              type: string;
              children: { text: string; type?: string }[];
            },
            index: number
          ) => {
            return (
              <div key={`hero-${index}`}>
                {part.children.map((segment: any, segIndex) => {
                  if (segment.italic) {
                    return <em key={segIndex}>{segment.text}</em>;
                  }
                  if (segment.bold) {
                    return <strong key={segIndex}>{segment.text}</strong>;
                  }
                  return <span key={segIndex}>{segment.text}</span>;
                })}
              </div>
            );
          }
        )}
      </Balancer>
    </Tag>
  );
};
