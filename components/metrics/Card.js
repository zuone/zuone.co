import { Children } from "react";
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

import UseAnimations from 'react-useanimations';
import activity from 'react-useanimations/lib/activity';
import github from 'react-useanimations/lib/github';

export default function MetricCard({ header, link, metric, isCurrency, animation, children }) {
  return (
    <div className="metric-card border border-gray-200 dark:border-gray-800 rounded p-4 max-w-72 w-full">
      <a
        aria-label={header}
        target="_blank"
        rel="noopener noreferrer"
        href={link}
      >
        <div className="flex items-center text-gray-700 dark:text-gray-300 space-x-1">
          {animation == 'activity' ? (
            <UseAnimations
              animation={activity}
              size={20}
              loop={true}
              strokeColor="currentColor"
              className="mr-1 -mt-0.5"
            />
          ) : null}
          {animation == 'github' ? (
            <UseAnimations
              animation={github}
              size={20}
              loop={true}
              strokeColor="currentColor"
              className="mr-1 -mt-0.5"
            />
          ) : null}
          <span>{header}</span>
          {/* {link ? <ArrowTopRightIcon /> : null} */}
        </div>
      </a>
      <p className="mt-2 text-2xl font-bold spacing-sm text-gray-900 dark:text-gray-100">
        {/* {metric > 0 && isCurrency && '$'} */}
        {metric > 0 ? metric.toLocaleString() : null}
        {metric <= 0 && children ? '-' : null}
        {children ? children : null}
      </p>
    </div>
  );
}
