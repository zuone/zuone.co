import Link from 'next/link';
import Image from 'next/image';
import ExternalLink from '@/components/ExternalLink';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

const SimpleItem = ({
  href,
  date,
  title,
  description,
  imgSrc,
  score,
  tagGreen,
  tagBlue,
  tagPink,
  tagPurple,
  tagYellow,
  thumbnailsUrl,
  site,
  type,
  className
}) => (
  <div className="flex gap-8 items-center">
    {thumbnailsUrl ? (
      <div className="w-24 h-36 relative flex-shrink-0">
        <Image
          src={thumbnailsUrl}
          alt="avatar"
          layout="fill"
          className="rounded-xl object-cover"
        />
      </div>
    ) : imgSrc ? (
      <div className="w-16 h-16 relative flex-shrink-0">
        <Image
          src={imgSrc}
          alt="avatar"
          layout="fill"
          className="rounded-xl object-cover"
        />
      </div>
    ) : null}

    <div className="space-y-1">
      <div className="space-y-1 mb-2">
        <h2 className="font-medium text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
          <ExternalLink href={href}>{title}</ExternalLink>
        </h2>
        <div className="prose text-gray-500 max-w-none dark:text-gray-500">
          {description}
        </div>
      </div>
      {tagGreen ? (
        <span className="prose font-mono rounded px-3 py-0.5 text-sm font-medium leading-5 tracking-wide dark:text-green-500 dark:border-green-400 text-green-600 bg-green-500 bg-opacity-5 dark:bg-opacity-20">
          {tagGreen}
        </span>
      ) : null}
      {tagBlue ? (
        <span className="prose font-mono rounded px-3 py-0.5 text-sm font-medium leading-5 tracking-wide dark:text-blue-400 dark:border-blue-400 text-blue-600 bg-blue-500 bg-opacity-5 dark:bg-opacity-20">
          {tagBlue}
        </span>
      ) : null}
      {tagPurple ? (
        <span className="prose font-mono rounded px-3 py-0.5 text-sm font-medium leading-5 tracking-wide dark:text-purple-400 dark:border-purple-400 text-purple-600 bg-purple-500 bg-opacity-5 dark:bg-opacity-20">
          {tagPurple}
        </span>
      ) : null}
      {tagPink ? (
        <span className="prose font-mono rounded px-3 py-0.5 text-sm font-medium leading-5 tracking-wide dark:text-pink-400 dark:border-pink-400 text-pink-600 bg-pink-500 bg-opacity-5 dark:bg-opacity-20">
          {tagPink}
        </span>
      ) : null}
      {tagYellow ? (
        <span className="prose font-mono rounded px-3 py-0.5 text-sm font-medium leading-5 tracking-wide dark:text-yellow-500 dark:border-yellow-400 text-yellow-600 bg-yellow-500 bg-opacity-5 dark:bg-opacity-20">
          {tagYellow}
        </span>
      ) : null}
    </div>
  </div>
);

export default SimpleItem;
